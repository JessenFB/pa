"use client";
import axios from "axios";
import { useState, useEffect } from 'react';

async function getUser() {
  try {
    const res = await axios.get('https://reqres.in/api/users');
    const users = res?.data?.data; 
    return users; 
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
}
async function deleteUser(id) {
  try {
    const res = await axios.delete(`https://reqres.in/api/users/${id}`);
    console.log("User deleted:", res.status);
    return res.status;
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

export default function Page() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const userData = await getUser();
      setUsers(userData);
      setIsLoading(false);
    }

    fetchData();
  }, []);


  const handleDelete = async (id) => {
    const status = await deleteUser(id);
    if (status === 204) { 
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">User Data</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div className="bg-white shadow-md rounded-lg overflow-hidden" key={user.id}>
                <img src={user.avatar} className="w-full h-48 object-cover" alt="Avatar" />
                <div className="p-4">
                  <h5 className="text-xl font-bold mb-2">{user.first_name} {user.last_name}</h5>
                  Email: <a className="text-gray-700" href={`mailto:${user.email}`}>{user.email}</a>

                  <div className="mt-4">
                    
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}
    </div>
  );
}