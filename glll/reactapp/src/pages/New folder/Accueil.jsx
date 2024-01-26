import SearchSection from './search section/searchSection.jsx';
import TravelSection from './Travel section/travelSection.jsx';
import LawyersSection from './main lawyers/lawyersSection.jsx';
import CommentsSection from './clients comments/commentsSection.jsx';


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
