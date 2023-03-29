const clientId = "58106d755ff24a24a5590c1cd0a218f0";
const clientSecret = "494dca9c9a974be8b3d6b2f00b28d47d";
let array = [];
let images = [];
let time = [];
let aud = document.getElementById("sss");
let red = document.getElementById("red");

console.log(aud);
const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  console.log(data);
  const accessToken = data.access_token;
  console.log(accessToken);
  return accessToken;
};

// Example usage: get an access token and log it to the console
getToken()
  .then(token => console.log(token))
  .catch(error => console.error(error));

const accessToken =
  "BQA-0HJvW-Kq2HGDKk0ZuNPrMut_HRi7BWfosP2UG9E60xEVJz3AqV4jxzwmpl2DAufDYkhd3S8bmtExXF75Nq_E3TlonkKdWyWew21v1wFQ4iJTFiUB";
const artistId = "09UmIX92EUH9hAK4bxvHx6";

fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then(response => response.json())
  .then(data => localStorage.setItem("api", JSON.stringify(data.tracks)));

let arr = JSON.parse(localStorage.getItem("api"));
console.log(arr);
let j = 0;
arr.map(m => {
  // console.log(m);
  document.getElementById("div").innerHTML += `
    <div class="container1">  <img id="${j}" class="rawol"src="${
    m.album.images[0].url
  }" alt="${m.album.name.slice(0, 15)}" >
      <p ><audio id="${j}" src="${m.preview_url}"  id="audio1"  ></audio></p>
      <p>${m.album.name.slice(0, 15)}</p></div>
      
      `;
  j++;
  array.push(m.preview_url);
  images.push(m.album.images[0].url);
  time.push(m.duration_ms);
  console.log(time);
  // console.log(array);
  let spotifyImages = document.querySelectorAll("img");
  // let cn = document.getElementsByClassName("container1");
  // [...cn].map(m => {
  //   m.addEventListener("click", e => {
  //     console.log(e)
  //   })})

  [...spotifyImages].map(n => {
    n.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      let imageid = n.id;
      let red = document.getElementById("red");
      console.log(red);
      let song = document.getElementById("song");
      console.log(song);
      console.log(aud.src);
      aud.src = array[imageid];
      red.src = n.src;
      console.log(n.alt);
      song.innerHTML = n.alt;
    });
  });
});
console.log(array);
let back = document.getElementsByClassName("fa-backward")[0];
console.log(back);
let play = document.getElementsByClassName("fa-play")[0];
console.log(play);
let forward = document.getElementsByClassName("fa-forward")[0];
console.log(forward);
let repeat = document.getElementsByClassName("fa-repeat")[0];
console.log(repeat);
let shuffle = document.getElementsByClassName("fa-shuffle")[0];
console.log(shuffle);
play.addEventListener("click", e => {
  if (aud.classList.toggle("active")) {
    aud.pause();
    console.log("pause");
  } else {
    aud.play();
    console.log("play");
  }
});
back.addEventListener("click", e => {
  console.log(e.target);
  console.log(aud.src);
  console.log(array);
  aud.src = array[array.indexOf(aud.src) - 1];
  red.src = images[images.indexOf(red.src) - 1];
  console.log(aud);
  // let PrvSong = array[array.indexOf(aud.src) - 1];
  // console.log(PrvSong);
  // aud.setAttribute("src", PrvSong);
});

forward.addEventListener("click", e => {
  console.log(e.target);
  console.log(aud.src);
  aud.src = array[array.indexOf(aud.src) + 1];
  red.src = images[images.indexOf(red.src) + 1];
});

repeat.addEventListener("click", e => {
  console.log(e);
  // let time = 0;
  let data = array[array.indexOf(aud.src)];
  let timedata = time[array.indexOf(aud.src)];
  // let secondsdata = new Date().getMilliseconds(timedata);
  // console.log(secondsdata);
  console.log(timedata);
  const seconds = Math.floor(timedata / 10);
  console.log(seconds);
  console.log(data);
  if (aud.classList.contains("active")) {
    setInterval(m => {
      aud.src = array[array.indexOf(aud.src)];
      red.src = images[images.indexOf(red.src)];

      // console.log(data);
    }, seconds);
  }
});

shuffle.addEventListener("click", e => {
  aud.src = array[Math.ceil(Math.random() * array.indexOf(aud.src)) + 1];
  red.src = images[images.indexOf(red.src)];
});
