import TravelSectionText from "./TravelSectionText"
import BookButton from "./travel_bookbutton"
import FeedbackButton from "./travel_feedbackbutton"
import SearchButton from "./travel_searchbutton"

function TravelSection(){

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
        <TravelSectionText/>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop:'100px'}}
          >
        <SearchButton/>
        <BookButton/>
        <FeedbackButton/>
        </div>
    </div>
}
export default TravelSection