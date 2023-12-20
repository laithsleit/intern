import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerForm = ({ player, setShowModal, addPlayer, updatePlayer }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
  });

  useEffect(() => {
    if (player) {
      setFormData({
        name: player.name || '',
        email: player.email || '',
        password: '',  // Set a default value for the password, or you can exclude it from formData if not needed
        image: player.image || '',
      });
    }
  }, [player]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setFormData((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
  };

  const handleEditClick = async () => {
    try {
      if (player && player.user_id) {
        const response = await axios.get(`http://localhost:8000/api/users/${player.user_id}`);
        const userData = response.data;
        setFormData({
          name: userData.name,
          email: userData.email,
          password: '',  // Set a default value for the password, or you can exclude it from formData if not needed
          image: userData.image,
        });
      } else {
        console.error('User ID is undefined or null');
      }
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (player && player.user_id) {
        const { password, ...updateData } = formData;

        const response = await axios.put(`http://localhost:8000/api/users/${player.user_id}`, updateData);
        updatePlayer(player.user_id, response.data);
        window.location.reload();
      } else {
        console.error('User ID is undefined or null');
      }

      setShowModal(false);
    } catch (error) {
      console.error('Error updating/adding player:', error);

      if (error.response && error.response.status === 404) {
        console.error('User not found:', error);
      }
    }
  };

  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-start pt-10">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => setShowModal(false)}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414L11.414 11l3.293 3.293a1 1 0 01-1.414 1.414L10 12.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 11 5.293 7.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>
        <form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" onSubmit={handleSubmit}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">{player ? 'Edit Player' : 'Add New Player'}</h3>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {/* <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required={player ? false : true}
            />
          </div> */}
          {/* <div>
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
            <input
              type="text"
              name="image"
              id="image"
              onChange={handleImageChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="w-20 h-20 rounded-full mt-2" />
            )}
          </div> */}
          <button
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {player ? 'Update User' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerForm;