import React, { useState, useEffect } from 'react';

function ClientComments({ clientId, avocatId }) {
  const [comment, setComment] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    // Fetch comments data from the server using fetchCommentaire
    fetchCommentaire();
  }, [avocatId]);

  const handleInputChange = (event) => {
    const inputComment = event.target.value;
    if (inputComment.length <= 300) {
      setComment(inputComment);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = {
        avis: comment,
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(`http://127.0.0.1:8000/api/comments/create/${avocatId}/${clientId}/`, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Comment saved successfully');
      fetchCommentaire();
      setComment('');
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const handleSelectRating = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 5) {
      setSelectedRating(value);
    }
  };

  const handleRatingSubmit = async () => {
    try {
      const ratingData = {
        note: selectedRating,
      };
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      };
  
      const response = await fetch(`http://127.0.0.1:8000/api/ratings/create/${clientId}/${avocatId}/`, requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log('Rating saved successfully');
  
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  const fetchCommentaire = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/avocat-comments/${avocatId}/`);
      const datb = await response.json();
      setCommentsData(datb);
    } catch (error) {
      console.error('Error fetching comments data:', error);
    }
  };

  const divStyle = {
    padding: '10px',
    marginTop: '10px',
    width: '100%',
    backgroundColor: '#FDECEC',
    borderRadius: '10px',
    paddingBottom: '30px',
  };

  const textareaStyle = {
    width: '35%',
    height: '50px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'none',
    overflow: 'hidden',
    display: 'inline-block',
  };

  const buttonStyle = {
    borderRadius: '4px',
    border: 'none',
    backgroundColor: comment.length === 0 ? '#ccc' : '#007bff',
    color: '#fff',
    cursor: comment.length === 0 ? 'not-allowed' : 'pointer',
    display: 'inline-block',
  };

  const commentListStyle = {
    margin: '20px',
  };

  const commentItemStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '10px',
    padding: '10px',
  };

  return (
    <div style={divStyle}>
      <div>
        <h2>Add your comment:</h2>
        <textarea
          placeholder="Enter your comment here! (300 characters)"
          value={comment}
          onChange={handleInputChange}
          style={textareaStyle}
        />
        <button
          onClick={handleSubmit}
          disabled={comment.length === 0}
          style={buttonStyle}
        >
          Submit
        </button>
      </div>
      <p>
        <label>
          Give your rating:
          <select value={selectedRating} onChange={handleSelectRating}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button type="submit" onClick={handleRatingSubmit}>
          Submit Rating
        </button>
      </p>
      <div style={commentListStyle}>
        <h2>Client Comments:</h2>
        {commentsData.map((commentData, index) => (
          <div key={index} style={commentItemStyle}>
            <p>Comment by: {commentData.client_username}</p>
            <p>{commentData.avis}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientComments;