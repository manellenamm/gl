import React, { useState } from 'react';
function Comments(props){


    //comment submission logic:

    const [comment, setComment] = useState('');
    
    const handleInputChange = (event) => {
        
        if (event.target.value.length <= 300) {
        setComment(event.target.value);
        }
    };

    const handleSubmit = () => {

        console.log('Submitted comment:', comment);
        setComment('');
    };


    //styles:

    const divStyle={
        width:'100%',
        overflow: 'hidden',
        
    
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

    



    return (
        <div style={divStyle}>   

            <h4>What do you think of our site?</h4>    
            <textarea
                placeholder="Enter your comment here!(300 characters)"
                value={comment}
                onChange={handleInputChange}
                style={textareaStyle}
            />

            <p>
                {300 - comment.length} left
            </p>

            <button
                onClick={handleSubmit}
                disabled={comment.length === 0}
                style={butStyle}
            >
        Submit
      </button>
        </div>
    )
}
export default Comments