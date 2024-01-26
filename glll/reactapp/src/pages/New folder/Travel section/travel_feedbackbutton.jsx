import feedback from './images/feedback.png';
function FeedbackButton(){


    const divStyle={
        width:'33.33%',
        textAlign:'center',
    }

    const butStyle={
        backgroundColor:'#9B7262',
        border:'none'
    }

    const imgStyle={
        height:'100px',
        width:'100px',
        borderRadius: '50%',
        objectFit: 'cover',
    }

    const hStyle={
        color:'black',
    }

    return <div style={divStyle}>
        <button style={butStyle}>
            <img style={imgStyle} src={feedback} alt='feedback_image'/>
        </button>
        <h3 style={hStyle}>Feedback</h3>
    </div>
}
export default FeedbackButton