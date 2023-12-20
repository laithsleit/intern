import React, { useState, useEffect } from 'react';
import PlayerForm from './PlayerFormRebort'; // Make sure this import path is correct
import './style.css';

function PlayerTable() {
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/reports'); // Update the API endpoint
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

  const deleteReport = async (report_id) => {
    // Display an alert to confirm the deletion
    const confirmDeletion = window.confirm('Are you sure you want to delete this report?');
    
    if (confirmDeletion) {
      // If the user confirms, send a DELETE request to the API
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/reports/${report_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // If the deletion is successful, update the local state
        setPlayers(players.filter((report) => report.report_id !== report_id));
      } catch (error) {
        console.error('Error deleting report:', error);
        // Handle the error (e.g., display an error message)
      }
    }
  };
  
  const deletePost = async (post_id) => {
    // Display an alert to confirm the deletion
    const confirmDeletion = window.confirm('Are you sure you want to delete this post?');
    
    if (confirmDeletion) {
      // If the user confirms, send a DELETE request to the API
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/posts/${post_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // If the deletion is successful, update the local state
        setPlayers(players.filter((post) => post.post_id !== post_id));
      } catch (error) {
        console.error('Error deleting post:', error);
        // Handle the error (e.g., display an error message)
      }
    }
  };
  

  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-5">
        <div className="flex justify-between items-center bg-gray-100 py-4 px-6">
          <h2 className="text-2xl text-gray-800 font-bold">Reports</h2>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Report id</th>
              <th scope="col" className="py-3 px-6">Reported_by_id </th>
              <th scope="col" className="py-3 px-6">Post ID</th>
              <th scope="col" className="py-3 px-6"> Reason</th>
              <th scope="col" className="py-3 px-6">Created at </th>
              <th scope="col" className="py-3 px-6">Actions</th>
              <th scope="col" className="py-3 px-6">Post </th>

            </tr>
          </thead>
          <tbody>
            {players.map((user) => (
              <tr key={user.user_id} className="bg-white border-b">
                <td className="py-4 px-6">{user.report_id}</td>
                <td className="py-4 px-6">{user.reported_by_id}</td>
                <td className="py-4 px-6">{user.post_id}</td>
                <td className="py-4 px-6">{user.reason}</td>
                <td className="py-4 px-6">{user.created_at}</td>


                <td className="py-4 px-6 flex space-x-1">
                  <button
              onClick={() => deleteReport(user.report_id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
               >
               Reject
                </button>
                </td>
                <td>
                  
                <button
                 onClick={() => deletePost(user.post_id)}
                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                  Delete Post
                 </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <PlayerForm
          addPlayer={addPlayer}
          updatePlayer={updatePlayer}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}

export default PlayerTable;


