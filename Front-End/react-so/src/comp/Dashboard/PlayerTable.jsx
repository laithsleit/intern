import React, { useState, useEffect } from 'react';
import PlayerForm from './PlayForm'; // Make sure this import path is correct
import './style.css';

function PlayerTable() {
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editablePlayer, setEditablePlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users'); // Update the API endpoint
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addPlayer = (player) => {
    setPlayers([...players, { ...player, id: players.length + 1 }]);
    setShowModal(false);
  };

  const updatePlayer = (id, updatedPlayer) => {
    setPlayers(players.map((player) => (player.id === id ? updatedPlayer : player)));
    setShowModal(false);
  };

  const deletePlayer = (user_id) => {
    // Display an alert to confirm the deletion
    const confirmDeletion = window.confirm('Are you sure you want to delete this user?');
  
    if (confirmDeletion) {
      // If the user confirms, send a DELETE request to the API
      const deleteUser = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/users/${user_id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          // If the deletion is successful, update the local state
          setPlayers(players.filter((player) => player.user_id !== user_id));
        } catch (error) {
          console.error('Error deleting user:', error);
          // Handle the error (e.g., display an error message)
        }
      };
  
      // Call the deleteUser function
      deleteUser();
    }
  };
  

  const editPlayer = (player) => {
    setShowModal(true);
    setEditablePlayer(player);
  };

  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-5">
        <div className="flex justify-between items-center bg-gray-100 py-4 px-6">
          <h2 className="text-2xl text-gray-800 font-bold">Users</h2>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
            onClick={() => { setShowModal(true); setEditablePlayer(null); }}
          >
            Create New
          </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Username</th>
              <th scope="col" className="py-3 px-6">User ID</th>
              <th scope="col" className="py-3 px-6">Role ID</th>
              <th scope="col" className="py-3 px-6">Email </th>
              <th scope="col" className="py-3 px-6">Account </th>
              <th scope="col" className="py-3 px-6">Account </th>


              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((user) => (
              <tr key={user.user_id} className="bg-white border-b">
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.user_id}</td>
                <td className="py-4 px-6">{user.role_id}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.privacy_setting}</td>
                <td className="py-4 px-6">{user.created_at}</td>


                <td className="py-4 px-6 flex space-x-1">
                  <button
                    onClick={() => editPlayer(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePlayer(user.user_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <PlayerForm
          player={editablePlayer}
          addPlayer={addPlayer}
          updatePlayer={updatePlayer}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}

export default PlayerTable;
