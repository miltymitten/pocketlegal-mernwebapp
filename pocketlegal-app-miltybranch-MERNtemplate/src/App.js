import { useState } from 'react';

import Button from 'react-bootstrap/Button';

function App() {
  const [search, setSearch] = useState("");
  const [result, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const handleSearch = async e => {
    e.preventDefault();

    if (search ==='') return;
    
    const endpoint =`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${search}`;
    
    const response = await fetch(endpoint);

    if (!response.ok){
      throw Error(response.statusText)

    }
    const json =await response.json();

    setResults(json.query.search)
    setSearchInfo(json.query.searchinfo);
  }

  //click handle here.

  return (
    <div className="App">
      <header>
        <h1>Legal Wiki Seeker</h1>

        <form className="search-box" onClick={handleSearch}> 
          
          <Button
            variant = "secondary"
            type="button" 
            placeholder="what are you looking for?"
            //value = {search}
            onChange={e=>setSearch(e.target.value)}>Milton
            </Button> 

          <input 
            type="button" 
            placeholder="what are you looking for?"
            //value = {search}
            onChange={e=>setSearch(e.target.value)}
          /> 

          <input 
            type="button" 
            placeholder="what are you looking for?"
            //value = {search}
            onChange={e=>setSearch(e.target.value)}
          /> 

        </form>
       
        {(searchInfo.totalhits)? <p>Search Result:{searchInfo.totalhits} </p>:''}
      </header>

      <div className="results">
        {result.map((result,i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`; 

          return(
            <div className="result" key={i}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML= {{__html: result.snippet}}>
              
              </p>
              <a href={url} target="_blank" rel='noreferrer'>Read More</a>
            </div>
          )
        })}
        
      </div>
    </div>

  );
}



export default App;
