CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    slug VARCHAR(255),
    title VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    image TEXT DEFAULT 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    read_time INTEGER DEFAULT 3,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO stories (author_id, title, content) VALUES (2, 'My Second Story', 'This is the content of the story.');
