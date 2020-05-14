import React from 'react'
import './InfoBar.css'

class InfoBar extends React.Component {
 

  render() {
    return (
      <div className="infobar">
        <p>This site is used to create playlists for your Spotify. Search songs, add it to
          the list on the right(or bottom if you are on mobile) and when you are done 
          adding songs to your list, and click "save to Spotify".</p>
      </div>
    )
  }
}

export default InfoBar
