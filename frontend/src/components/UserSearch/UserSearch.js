import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserSearch() {
  const API_URL = window.location.origin.replace('3000', '5000');

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchUsers(value);
  };

  const fetchUsers = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      setShowResults(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/users/search?query=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error('Network Response is not OK');
      }
      const data = await response.json();
      console.log(data);
      setResults(data.users || []);
      setShowResults(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search users by username"
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none"
      />

      {showResults && (
        <div className="absolute z-50 bg-white mt-1 shadow-lg rounded-lg max-h-60 overflow-y-auto w-full">
          {loading ? (
            <p className="p-4 text-center text-gray-500">Loading...</p>
          ) : results.length > 0 ? (
            results.map((user) => (
              <Link to={`/profile/${user.username}`} key={user.username}>
                <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-300">
                  <img
                    src="https://via.placeholder.com/50"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.fullname}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">No user found.</p>
          )}
        </div>
      )}
    </div>
  );
}
