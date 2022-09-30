let searchBox = document.getElementById("searchBox");
let search = document.getElementById("search");
const searchResults = document.getElementById("search-results");
let form = document.getElementById("searchForm");
let audio = document.getElementById("audio");

function buildSongs(itunesData) {
  console.log(itunesData);
  for (let term of itunesData) {
    console.log(term);
  }
}

form.addEventListener("submit", (event) => {
  console.log(searchBox.value);
  const userInput = searchBox.value;
  let itunesUrl = `https://itunes.apple.com/search?term=${userInput}`;

  event.preventDefault();

  fetch(itunesUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(function (data) {
      buildSongs(data.results);
      console.log(data.results);
      searchResults.innerHTML = "";
      if (data.results.length === 0) {
        let emptyElement = document.createElement("div");
        emptyElement.innerText = "No results found!!";
        searchResults.appendChild(emptyElement);
      }

      for (let song of data.results) {
        let songDiv = document.createElement("div");
        songDiv.classList.add("song-info");
        // Song Name
        let songEl = document.createElement("song");
        songEl.classList.add("song_name");
        songEl.innerText = `Song: ${song.trackName}`;
        songDiv.appendChild(songEl);
        // Artist name
        let artistDiv = document.createElement("div");
        artistDiv.classList.add("artist");
        artistDiv.innerText = `Artist: ${song.artistName} \b\r \b\r`;
        songDiv.appendChild(artistDiv);
        console.log(song.artistName);
        //Album name
        let albumDiv = document.createElement("div");
        albumDiv.classList.add("album");
        albumDiv.innerText = `Album: ${song.collectionName} `;
        songDiv.appendChild(albumDiv);
        //Art
        let imageEl = document.createElement("img");
        imageEl.src = song.artworkUrl100;
        imageEl.classList.add("art");
        songDiv.appendChild(imageEl);

        //Audio button
        let audioSource = document.createElement("div");
        audioSource.classList.add("audio_source");
        audioSource.innerText = `${song.previewUrl}`;
        songDiv.appendChild(audioSource);
        //Audio player
        let audioPlayer = document.createElement("audio");
        audioPlayer.controls = "controls";
        audioPlayer.src = `${song.previewUrl}`;
        songDiv.appendChild(audioPlayer);
        searchResults.appendChild(songDiv);
      }
    });
});