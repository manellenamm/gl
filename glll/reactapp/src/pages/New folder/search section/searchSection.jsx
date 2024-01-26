import Header from './header/header.jsx';
import logo192 from './images/Ellipse.png';
import SearchText from './searchText.jsx';
import SearchBar from './searchBar.jsx';


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