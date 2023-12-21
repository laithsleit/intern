import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userPr from '../../img/aaaaa.png'
export default function PostAdded() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [allComments, setAllComments] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    fetchPosts();
    fetchAllComments();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const postsWithComments = await Promise.all(
        data.posts.map(async (post) => {
          const commentsResponse = await fetch(`http://localhost:8000/api/comments?post_id=${post.post_id}`);
          if (!commentsResponse.ok) {
            throw new Error('Network response was not ok');
          }
          const commentsData = await commentsResponse.json();
          return { ...post, comments: commentsData.comments };
        })
      );

      setPosts(postsWithComments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Error fetching posts. Please try again later.');
      setLoading(false);
    }
  };

  const fetchAllComments = async () => {
    try {
      const commentsResponse = await fetch('http://localhost:8000/api/comments');
      if (!commentsResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const commentsData = await commentsResponse.json();

      if (commentsData && commentsData.comments) {
        setAllComments(commentsData.comments);
        console.log('All Comments:', commentsData.comments);
      } else if (Array.isArray(commentsData)) {
        setAllComments(commentsData);
        console.log('All Comments:', commentsData);
      } else {
        console.error('No comments data found in the response');
        console.error('Response status:', commentsResponse.status);
        console.error('Response body:', await commentsResponse.text());
      }
    } catch (error) {
      console.error('Error fetching all comments:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this post?");
    
    if (!shouldDelete) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const updatedPosts = posts.filter((post) => post.post_id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Error deleting post. Please try again later.');
    }
  };
  
  const handleCommentInputChange = (event, postId) => {
    setCommentInputs({
      ...commentInputs,
      [postId]: event.target.value,
    });
  };

  const handleAddComment = async (postId) => {
    const user_id = sessionStorage.getItem('user_id');
  
    try {
      const response = await fetch('http://localhost:8000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: postId,
          user_id: user_id,
          comment_text: commentInputs[postId] || '',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const newComment = await response.json();
  
      const updatedPosts = posts.map((post) => {
        if (post.post_id == postId) {
          return {
            ...post,
            comments: Array.isArray(post.comments) ? [...post.comments, newComment] : [newComment],
          };
        }
        return post;
      });
  
      setPosts(updatedPosts);
      setCommentInputs({
        ...commentInputs,
        [postId]: '',
      });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  const toggleShowComments = (postId) => {
    setShowComments({
      ...showComments,
      [postId]: !showComments[postId],
    });
  };
  const name = sessionStorage.getItem('userName')
  const handleReportPost = async (postId) => {
    const user_id = sessionStorage.getItem('user_id');
    const reportData = {
      reported_by_id: user_id,
      post_id: postId,
      reason: "Inappropriate content",
      status: "Pending",
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:8000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Report submitted successfully');
    } catch (error) {
      console.error('Error reporting post:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <>
      {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => (
        <div key={post.post_id} className="post">
          <div style={{ justifyContent: 'space-between' }} className="box-post">
            <Link style={{ cursor: 'pointer' }} to={`/Profile/${post.user_id}`}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  style={{ width: '20px' }}
                  src={userPr}
                  alt="User"
                /> 
                <h3></h3>
                <h4 style={{ color: '#000', fontWeight: '300' }}>{post.username}</h4>
              </span>
            </Link>
            <span>
              <button style={{marginRight:"20px"}} onClick={() => handleReportPost(post.post_id)}>REPORT</button>
              <button onClick={() => handleDeletePost(post.post_id)}>DELETE</button>
            </span>
          </div>
          <p>{post.content}</p>
          <img
            style={{ margin: '20px 0px', width: '100%', borderRadius: '0px' }}
            src={post.media_url}
            alt={`Post ${post.post_id}`}
          />
          <span style={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: "50px", borderTop: "1px solid #000" }}>
            <input
              className="comment-input"
              type="text"
              style={{ marginTop: "20px" }}
              placeholder="Write a comment"
              value={commentInputs[post.post_id] || ''}
              onChange={(event) => handleCommentInputChange(event, post.post_id)}
            />
            <button
              style={{ marginTop: "20px" }}
              onClick={() => handleAddComment(post.post_id)}>Add Comment</button>
          </span>
          {post.comments && post.comments.length > 0 && (
            <div>
              <h5>Comments :</h5>
              <button onClick={() => toggleShowComments(post.post_id)}>
                {showComments[post.post_id] ? 'Hide Comments' : 'Show Comments'}
              </button>
              {showComments[post.post_id] && (
                <ul>
                  {post.comments.map((comment) => (
                    <li className='lia' key={comment.comment_id}>{name} : {comment.comment_text}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
