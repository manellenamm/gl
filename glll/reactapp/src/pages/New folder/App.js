import SearchSection from './search section/searchSection.js';
import TravelSection from './Travel section/travelSection.js';
import LawyersSection from './main lawyers/lawyersSection.js';
import CommentsSection from './clients comments/commentsSection.js';


function App() {

    const divStyle={
      overflow:'auto',
      margin:'0px',
      padding:'0px',
      boxSizing: 'border-box',
      backgroundColor:'#9B7262',

    }
  
  return <div style={divStyle}>
  <SearchSection/>
  <TravelSection/>
  <LawyersSection/>
  <CommentsSection/>


  </div>
}

export default App;
