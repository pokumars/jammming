import React from 'react';
import './App.css';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from'./../SearchResults/SearchResults';
import Playlist from'./../Playlist/Playlist';
import Spotify from './../../util/Spotify';

let track1 = {name: 'Senorita', artist: 'shawn Mendes', album: 'Album1', id: 101};
let track2 = {name: 'Don\'t Pretend', artist: 'Khalid', album: 'SAFE', id: 102};
let track3 = {name: 'All Love feat. Manu Laudic', artist: 'Biniyam', album: 'The Abyssinian EP', id: 103};



class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      searchResults:[track1, track2, track3],
      playlistName :'hottest Playlist 1',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  savePlaylist(){
    let trackURIs = [];
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
  }
  componentWillMount(){
    Spotify.getAccessToken();
  }

  search(term) {
    console.log(term);
    Spotify.search(term).then(results =>{
      this.setState({searchResults: results})
    });
  }

  updatePlaylistName (name){
    let orig = this.state.playlistName;
    this.setState({playlistName: name});
    console.log(`playlist name change from ${orig} to ${name}`);
  }

  addTrack(track){
    //If it is already in playlist, return. Else add it to playlist
    if(this.state.playlistTracks.find(savedTrack => track.id === savedTrack.id)){
      return;
    }else {
      this.setState({
        playlistTracks: this.state.playlistTracks.concat([track])
      });
    }
  }
  removeTrack(track){
    //If it is playlist, we want it out of there
    if(this.state.playlistTracks.find(savedTrack => track.id === savedTrack.id)){
      let arr = [...this.state.playlistTracks]; //copy of the array
      let index = arr.indexOf(track);//find array of track to remove
      if (index !== -1){
        arr.splice(index, 1);//remove it from the copy array and ste that as the new state
        this.setState({playlistTracks: arr});
      }
    }
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName}
             playlistTracks={this.state.playlistTracks}
             onRemove={this.removeTrack}
             onNameChange={this.updatePlaylistName}
             onSave={this.savePlaylist} />
          </div>
    </div>
  </div>
    );
  }
}

export default App;
