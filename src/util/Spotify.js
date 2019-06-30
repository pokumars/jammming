
//let accessToken =``;
let accessToken =``;
//let redirectURI ="http://localhost:3000/";
let redirectURI ="https://jammmingohe.surge.sh";
let asiakasID = '31bf72d5669b45b3b8646cdf0703f8ef';
let myHeaders = {Authorization :`Bearer ${accessToken}`};

const Spotify = {
    search: function(searchTerm){
        console.log(' in spotify.js search()');
        return fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,{
            headers:{
                Authorization :`Bearer ${accessToken}`
            }
        }
        ).then(response => {
            let res =response.json(); 
            console.log(res)
            console.log(response);
            return res;

        }).then(jsonResponse => {
            console.log(jsonResponse)
            if (jsonResponse.tracks){
                return jsonResponse.tracks.items.map(track =>{
                    return {
                        name: track.name,
                        id: track.id,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri,
                    }
                })
            }
        });
    },
    getAccessToken: function(){
        let currentURL = window.location.href;
        let time;

        if(accessToken.length > 3){//If it has access token
            console.log('It already has access token, but not in url');
            console.log(accessToken)
            return accessToken;

        }else if(currentURL.match(/access_token=([^&]*)/)){// else take from take it from url
            console.log('It already has access token in url');
            accessToken =``;
            accessToken = currentURL.match(/access_token=([^&]*)/g).join('').substring(13);
            time = Number(currentURL.match(/expires_in=([^&]*)/g).join('').substring(11));

            console.log(`token is===> ${accessToken}`);
            console.log(`time is ${time}`);
            //if it is set, it expires in due time
            window.setTimeout(() => accessToken= '', time * 1000);
            window.history.pushState('Access Token', null, '/');

        }else {//hasn't yet requested the token so request it now.
            console.log('doesnt have access token. Make request');
            let url =`https://accounts.spotify.com/authorize?client_id=${asiakasID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location= url;
        }
    },
    savePlaylist: function(playlistName, trackURIs){//(playlistName, trackURIs)
        let userID= '';
        let playlistID = '';
        let userName ="";
        //do we have a playlist name and tracks? if not,
       // dont send the empty request

       if(playlistName && trackURIs.length >1){
           //get userID, use it to post playlist name, 
            return fetch('https://api.spotify.com/v1/me',{
                headers: {
                    Authorization :`Bearer ${accessToken}`
                }
            }
            ).then(response =>{
                let res = response.json();
                return res;                
            }).then(jsonresponse =>{
                console.log(jsonresponse);
                userName =jsonresponse.display_name;
                userID=jsonresponse.id;//got user Id
                return jsonresponse;
            }).then(()=>{
                //now post the playlist name to spotify, it will return us
                // an playlist id which we can then add songs to.
                let data= {name: playlistName};
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                    method:"post",
                    headers: {
                        Authorization :`Bearer ${accessToken}`
                    },
                    body: JSON.stringify(data)

                }).then(response =>{
                    return response.json();

                }).then(jsonResponse =>{//extract playlistID from response
                    console.log(jsonResponse);
                    playlistID = jsonResponse.id;
                    console.log('playlist id '+ playlistID);
                    return jsonResponse; 
                })
            }).then(()=>{//send the actual songs to the playlist
                let data = {uris: trackURIs};
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
                    method:'post',
                    headers: {
                        Authorization :`Bearer ${accessToken}`
                    },
                    body:JSON.stringify(data)
                }).then(response => {
                    return response.json();
                }).then(jsonResponse => {
                    console.log(jsonResponse);
                    return jsonResponse;
                }).then(()=>{
                    window.alert(`${userName} now has anew playlist called ${playlistName}`);
                })
            });
                    
        }else if(playlistName && trackURIs.length <1) {
            
            window.alert("You need to have a playlist name and at least one song selected to proceed");
            return; 
        }

    }
}
export default Spotify;