import React, { useState } from 'react';

function ClientComments(){


    const commentsData = [
        { comment: 'Great service!', person: 'John Doe' },
        { comment: 'Very satisfied!', person: 'Jane Smith' },
        // Add more comments as needed
      ];
      


    const [comment, setComment] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);

        
        const handleInputChange = (event) => {
            
            if (event.target.value.length <= 300) {
            setComment(event.target.value);
            }
        };

        const handleSubmit = () => {

            console.log('Submitted comment:', comment);
            setComment('');
        };


        const handleSelectRating = (e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value >= 1 && value <= 5) {
              setSelectedRating(value);
            }
          };
      
      
          const handleSubmitRating = (e) => {
            e.preventDefault();
            console.log('Submitted value:', selectedRating);
            // You can perform any action with the stored value here
          };

    const divStyle={
        padding:'10px',
        marginTop:'10px',
        width:'100%',
        backgroundColor:'#FDECEC',
        borderRadius:'10px',
        paddingBottom:'30px'
    }

    const textareaStyle={
        width: '35%',
        height: '50px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        resize: 'none',
        overflow: 'hidden',
        display: 'inline-block',
    }


    const butStyle={
        
        borderRadius: '4px',
        border: 'none',
        backgroundColor: comment.length === 0 ? '#ccc' : '#007bff',
        color: '#fff',
        cursor: comment.length === 0 ? 'not-allowed' : 'pointer',
        display: 'inline-block',
    }


    const commentListStyle = {
      margin: '20px',
    };
      
    const commentItemStyle = {
      border: '1px solid #ccc',
      borderRadius: '5px',
      margin: '10px',
      padding: '10px',
    };


   



    return(
        <div style={divStyle}>
            <div>
            <h2>Add your comment:</h2>
            <textarea
                placeholder="Enter your comment here!(300 characters)"
                value={comment}
                onChange={handleInputChange}
                style={textareaStyle}
            />

            <button
                onClick={handleSubmit}
                disabled={comment.length === 0}
                style={butStyle}
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
              <button type="submit" onClick={handleSubmitRating}>Submit</button>
              </p>

            <div style={commentListStyle}>
                <h2>Client Comments:</h2>
                {commentsData.map((commentData, index) => (
                    <div key={index} style={commentItemStyle}>
                    <p>Comment by: {commentData.person}</p>
                    <p>{commentData.comment}</p>
                    
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClientComments