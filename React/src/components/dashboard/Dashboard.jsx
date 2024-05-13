import { useState } from "react";
import {fetchSpotifyApi} from '../../api/spotifyAPIDemo';

const Dashboard = () => {
  
  const types = [
    'album',
    'artist',
    'playlist',
    'track',
    'show',
    'episode',
    'audiobook',
  ];

  const [form, setForm] = useState({
    artist: '',
    search: '',
  });

  const [results, setResults] = useState([]);
  const [typeSelected, setTypeSelected] = useState('');


  const handleSearch = async () => {
    const params = new URLSearchParams();

    params.append(
      'q',
      encodeURIComponent(`remaster track:${form.search} artist:${form.artist}`)
    );
    params.append('type', typeSelected);

    const queryString = params.toString();
    const url = 'https://api.spotify.com/v1/search';

    const updateUrl = `${url}?${queryString}`;
    const token = `Bearer ${localStorage.getItem('token')}`;

    const response = await fetchSpotifyApi(
      updateUrl,
      'GET',
      null,
      'application/json',
      token
    );
    
    console.log(response);
    setResults(response.tracks.items);
  };



  const handlePlayMusic = async (song) => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const data = {
      uris: [song],
    };

    const id_device = "afe7346139f99a66bbab01d4b2452ea464a66093";

    const playSong = await fetchSpotifyApi(
      `https://api.spotify.com/v1/me/player/play?device_id=${id_device}`,
      'PUT',
      JSON.stringify(data),
      'application/json',
      token
    );
    console.log(playSong);
  };

  const handleChange = (e) => {
    const newValues = {
      ...form,
      [e.target.name]: e.target.value,
    };
    console.log(newValues);
    setForm(newValues);
  };

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setTypeSelected(e.target.value);
  };

  const handleGetToken = async () => {
    // stored in the previous step
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    let codeVerifier = localStorage.getItem('code_verifier');
    console.log({ codeVerifier });
    const url = 'https://accounts.spotify.com/api/token';
    const clientId = '48cc40c475f64561abc64c4291a1eb4c';
    const redirectUri = 'http://localhost:5173/';
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('token', response.access_token);
  };

  const getDeviceID = async () => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const response = await fetchSpotifyApi(
    'https://api.spotify.com/v1/me/player/devices',
    'GET',
    null,
    'application/json',
    token
  );
  console.log(response);
  return response.device.id;
};

  return (
    <div className="bg-gradient-to-t from-[#030303] to-[#282828] h-[2500px] w-screen flex items-center justify-top flex flex-col ">
      <div className="mt-20">
        <h1 className="text-white text-left text-[35px] font-bold">Spotifai</h1>
      </div>
      <div>
        <button className="text-white text-left text-[15px] "
        onClick={handleGetToken} > GET TOKEN
        </button>
      </div>
      <div>
        <button className="text-white text-left text-[15px]"
        onClick={getDeviceID} > GET ID
        </button>
      </div>
      <div className="flex justify-between w-[60%] align-middle items-center flex flex-row">
        <div>
          <p className="text-white text-left text-[14px] font-bold">Track</p>
          <input
            className="rounded-[2px] h-5 w-[160px] text-white bg-[#121212] border-[#727272] border-solid border-[1px] hover:ring-1 focus:ring-1  ring-white"
            placeholder="search"
            type="text"
            name="search"
            value={form.search}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="text-white text-left text-[14px] font-bold">Type</p>
          <select
            className="rounded-[2px] h-5 w-[160px] text-white bg-[#121212] border-[#727272] border-solid border-[1px] hover:ring-1 focus:ring-1  ring-white"
            name="types"
            onChange={handleSelectChange}
          >
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-white text-left text-[14px] font-bold">Artist</p>
 
          <input
            className="rounded-[2px] h-5 w-[160px] text-white bg-[#121212] border-[#727272] border-solid border-[1px] hover:ring-1 focus:ring-1  ring-white"
            placeholder="Artist"
            type="text"
            name="artist"
            value={form.artist}
            onChange={handleChange}
          />
        </div>
        <div className="pt-[3%] flex flex-col">
          <button
            className="bg-[#1BD760] w-[140px] rounded-[5px] text-[15px] p-1 font-bold "
            onClick={handleSearch}
          >
            Find
          </button>
        </div>
      </div>

      <div  className="flex justify-between w-[60%] align-middle items-center flex flex-col">
          {results.length >0 && (
          <div> 
            {results.map ((item,idx) => (
            <div className="bg-black text-black w-[10] h-[10] rounded-[10px] text-[15px] p-1 font-bold mt-10 ">
              <div key = {item.id} className="text-white flex justify-center items-center">
                    
                <div className="mr-5">
                  <img src = {item.album.images[0].url} width = {60} />
                </div>

                <div className="mr-5">
                 {idx + 1 + ' ' + item.name}
                </div>
                    
                <div className="mr-5">
                  <button
                      className="bg-[#1BD760] text-black w-[100px] h-[25px] rounded-[5px] text-[15px] p-1 font-bold "
                      onClick={() => handlePlayMusic(item.uri)}
                    >
                      Play
                  </button>
                </div>
                    
    

              </div>
            </div>
                ))}
          </div>
          )}
      </div>
      
    </div>
  );
};

export default Dashboard;