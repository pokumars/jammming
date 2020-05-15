import React from 'react'
import './InfoBar.css'

class InfoBar extends React.Component {
 

  render() {
    return (
      <div className="infobar">
        <p>This tool is used to create playlists for your Spotify. Search, add songs to
          the list on the right(or bottom if you are on mobile) and when you are done 
          adding songs to your list, give the playlist a name and click "save to Spotify".
          <br/> The playlist should now be in your spotify account</p>
      </div>
    )
  }
}

export default InfoBar
