import Header from './header/header.js';
import logo192 from './images/Ellipse.png';
import SearchText from './searchText';
import SearchBar from './searchBar.js';


function SearchSection(){

    const image192=logo192;

    const divstyle={
        height:'100vh',
        backgroundColor: 'black',
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',   
        margin:'0px',
        padding:'0px',
        boxSizing: 'border-box',

      }
    
      return <div style={divstyle}>
              <Header  image={image192}/>
              <SearchText/>
              <SearchBar/>
             </div>
}

export default SearchSection