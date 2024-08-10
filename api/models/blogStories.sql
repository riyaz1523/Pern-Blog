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


INSERT INTO stories (author_id, title, content) VALUES (12, 'Lorem Ipsum Story Test', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et suscipit turpis. Sed condimentum lacus in massa hendrerit, vitae bibendum ante eleifend. Donec tincidunt metus sed dignissim fringilla. Cras quis quam elementum, semper elit tincidunt, sodales sem. Fusce eu ante nec lorem volutpat fermentum eget nec diam. Nam porta felis vel lectus accumsan, non elementum augue tincidunt. Aenean a pharetra massa, eu condimentum nibh. Donec placerat leo erat, ut viverra dui pulvinar eu. Nulla facilisi. Cras ultrices at ligula nec aliquam. Pellentesque faucibus orci leo, et congue leo convallis tincidunt. Nam in dui lacinia, dapibus magna eget, iaculis massa. Donec in urna sed metus elementum ultricies. Vestibulum eu tristique ipsum, id accumsan tellus. In hac habitasse platea dictumst. Aliquam leo est, consequat vel ultrices ac, luctus eget dolor.

Integer in lorem odio. Sed elementum, lectus ut malesuada luctus, neque nulla accumsan magna, quis accumsan nibh lorem ut tortor. Integer sollicitudin dui non turpis congue sagittis. In sagittis nisi velit. Quisque et aliquet neque, vitae posuere purus. Quisque quis eleifend elit, accumsan viverra eros. Sed commodo arcu purus, nec iaculis est fermentum vel. Aenean suscipit, odio quis cursus blandit, risus dui congue ligula, nec fringilla ligula odio in lectus. Ut ut volutpat nibh, vel semper mi. Proin interdum est massa, at finibus tellus semper ut.

Etiam consectetur metus vel aliquet laoreet. Duis metus dui, tempus vitae orci non, facilisis imperdiet odio. Sed mollis malesuada turpis eget laoreet. Sed ut sapien dictum, feugiat tellus id, eleifend lacus. Nam sit amet ex eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse eu nunc ac felis lacinia finibus. Donec a enim diam. Quisque tempor lacus non dui gravida, eu malesuada velit blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien dolor, tempor sit amet lobortis quis, sagittis in felis. Cras arcu dui, luctus luctus convallis ac, tincidunt sed metus.

Proin pretium ex eu lectus luctus, at dapibus leo vulputate. Fusce finibus volutpat vehicula. Vestibulum bibendum iaculis dignissim. Suspendisse volutpat dolor condimentum accumsan maximus. Maecenas viverra nunc lorem, et vestibulum nisi dapibus in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed eget imperdiet nunc.

Vestibulum tempus tellus eu turpis fringilla, eget accumsan nunc aliquet. Donec commodo, velit eget condimentum porta, sapien ligula efficitur risus, quis gravida metus risus feugiat felis. Curabitur non hendrerit sapien, et feugiat quam. Quisque eget hendrerit magna. Aenean orci tortor, porttitor quis est quis, imperdiet eleifend ipsum. Duis eu porttitor velit. Nullam consectetur massa ut metus suscipit euismod. Aliquam eget purus tincidunt, luctus metus ac, ultrices ex. Quisque volutpat rutrum quam, suscipit condimentum justo egestas at. Aenean facilisis, nisl ac pretium tincidunt, augue nibh fringilla justo, quis sodales lacus felis vel libero. Vestibulum non est eu tortor porta molestie nec molestie orci. Maecenas placerat faucibus felis quis gravida. Suspendisse fringilla, metus ut scelerisque iaculis, metus risus accumsan lectus, ut vestibulum nulla dui a sapien.');
