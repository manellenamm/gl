import CommentsSectionText from "./commentsSectionText";
import CommentsSubmit from './commentsSubmit';
import Comments from "./comments";

function CommentsSection(){

    const divStyle={
        backgroundColor:'#9B7262',
        minHeight:'70vh',
        width:'100%',
        textAlign:'center',
        margin:'0px',
        padding:'0px',
        boxSizing: 'border-box',


    }

    return <div style={divStyle}>
        <CommentsSectionText/>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',}}
          >
        <Comments image name Comment/>
        <CommentsSubmit/>
        </div>
       
    </div>
}
export default CommentsSection