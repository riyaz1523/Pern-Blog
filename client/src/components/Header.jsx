import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/user/userSlice'; 

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const profilePicRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profilePicRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false); 
  }, [location]);

  const toggleDropdown = () => {
    if (!isDropdownOpen && profilePicRef.current) {
      const rect = profilePicRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX - 150,
      });
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = async () => {
    try {
      await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/signout`);
      dispatch(signOut());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <strong className="bg-gray-500 text-white rounded-full border-4 border-gray-600 flex items-center justify-center w-8 h-8 text-xl font-bold">
            B
          </strong>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
            Blog
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {currentUser ? (
            <>
              <span className='mr-6 block text-gray-700 rounded font-bold'>Hello {currentUser.username}</span>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
                ref={profilePicRef}
              >
                <span className="sr-only">Open user menu</span>
                {currentUser ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={currentUser.profile_picture}
                    alt={currentUser.username}
                  />
                ) : (
                  <span>Loading</span>
                )}
              </button>
              {isDropdownOpen && (
                <div
                  className="z-50 absolute w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg"
                  style={{
                    top: `${dropdownPosition.top}px`,
                    left: `${dropdownPosition.left}px`,
                  }}
                  ref={dropdownRef}
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm font-semibold text-gray-900">
                      {currentUser.username}
                    </span>
                    <span className="block text-sm text-gray-500 truncate">
                      {currentUser.email}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <button>
                <Link to='/signin'>
                  <span className="text-gray-600 text-sm font-bold mr-6">Sign In</span>
                </Link>
              </button>
              <button>
                <Link to='/signup'>
                  <span className="text-gray-600 text-sm font-bold">Sign Up</span>
                </Link>
              </button>
            </>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                All Posts
              </Link>
            </li>
            {currentUser &&(
              <li>
              <Link
                to="/mypost"
                className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                My Posts
              </Link>
            </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
