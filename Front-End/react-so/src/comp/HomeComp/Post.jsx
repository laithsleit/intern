import React, { useState } from 'react';
import Userrr from '../../img/man.jpg';
import { Link } from 'react-router-dom';


export default function Post() {
  const [postContent, setPostContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [username , setUsername] = useState();
  
  const handleAddPost = async () => {
    function getRandomNumberBetween150And250() {
      return Math.floor(Math.random() * (250 - 150 + 1)) + 150;
    }
    const rand=  getRandomNumberBetween150And250()
    // Assume you have a function to get the user_id from the session
    const user_id = sessionStorage.getItem('user_id');

    // Prepare the data to be sent in the request
    const postData = {
      user_id:user_id ,
      content: postContent,
      media_url: `https://picsum.photos/${rand}`, // Update with your media URL or handle media file upload
    };
    console.log(user_id);
    console.log(postContent); 

    try {
      // Make the API request
      const response = await fetch('http://127.0.0.1:8000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('Post added successfully!');
        window.location.reload()
        // You can perform additional actions here if needed
      } else {
        console.error('Failed to add post:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <>
      <div className="post">
        <div className="box-post">
          <Link style={{ cursor: 'pointer' }} to="/Profile">
            <img src={Userrr} alt="user" /> <h3></h3>
          </Link>
          <label>
            <input
              style={{    width: '560px'
                ,borderRadius: '50px'}}
              type="text"
              placeholder="Add Post"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </label>
        </div>
        <div style={{display : "flex" , justifyContent:"space-between"}} className="cont">
        <span style={{width:"70%" , display:"flex" , justifyContent:"space-evenly"}}>
        
        <label className='fileIn' style={{color :"#fff", background:"royalblue"}} htmlFor="file"> <span><i className="fa-solid fa-image"></i></span> ADD IMG</label>
        <input id='file'  style={{background :"transparent" , display:"none", color:"transparent "}} type="file" onChange={(e) => setMediaFile(e.target.files[0])} />
        <label className='fileIn' style={{color :"#fff" , background:"#00A36C"}} htmlFor="file"> <span><i className="fa-solid fa-image"></i></span> ADD VEDIO</label>
        <input id='file'  style={{background :"transparent" , display:"none", color:"transparent "}} type="file" onChange={(e) => setMediaFile(e.target.files[0])} />
        </span>
        
        <button onClick={handleAddPost}>Add</button>
        </div>
      </div>
    </>
  );
}
