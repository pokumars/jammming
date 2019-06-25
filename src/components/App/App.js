import React from 'react';
import './App.css';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from'./../SearchResults/SearchResults';
import Playlist from'./../Playlist/Playlist';
import { tsConstructorType } from '@babel/types';

let track1 = {name: 'Senorita', artist: 'shawn Mendes', album: 'Album1', id: 101};
let track2 = {name: 'Don\'t Pretend', artist: 'Khalid', album: 'SAFE', id: 102};
let track3 = {name: 'All Love feat. Manu Laudic', artist: 'Biniyam', album: 'The Abyssinian EP', id: 103};



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults:[track1, track2, track3]
    };
    

  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.searchResults} />
            {/* <Playlist /> */}
          </div>
    </div>
  </div>
    );
  }
}

export default App;
