import React, { useState, useEffect } from 'react';
import PlayerForm from './PlayForm'; // Make sure this import path is correct
import './style.css';

function PlayerRebort() {
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

  const deletePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const editPlayer = (player) => {
    setShowModal(true);
    setEditablePlayer(player);
  };

  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-5">
        <div className="flex justify-between items-center bg-gray-100 py-4 px-6">
          <h2 className="text-2xl text-gray-800 font-bold">Users Rebort</h2>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Username</th>
              <th scope="col" className="py-3 px-6">User ID</th>
              <th scope="col" className="py-3 px-6">Commint</th>
              <th scope="col" className="py-3 px-6">Email </th>
            </tr>
          </thead>
          <tbody>
            {players.map((user) => (
              <tr key={user.user_id} className="bg-white border-b">
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.user_id}</td>
                <td className="py-4 px-6">Hellllllo World</td>

                <td className="py-4 px-6 flex space-x-1">
                 
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

export default PlayerRebort;
