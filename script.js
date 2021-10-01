const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const currentTimeEle = document.getElementById("current-time");
const durationEle = document.getElementById("duration");

// make a song list
const songs = [
  {
    name: "music-1",
    songName: "Sad Day",
    artist: "Benjamin Tissot",
  },
  {
    name: "music-2",
    songName: "Emotional",
    artist: "Lesfm",
  },
  {
    name: "music-3",
    songName: "The Way Home",
    artist: "GoodBM",
  },
];

// check if music is playing
let isPlaying = false;

// song play here
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
  playBtn.setAttribute("title", "Pause Song");
  music.play();
}

// song pause here
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  playBtn.setAttribute("title", "Play Song");
  music.pause();
}

// addEventListener for Play or Pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update music player stauts
function loadSong(song) {
  title.textContent = song.songName;
  artist.textContent = song.artist;
  music.src = `/music/${song.name}.mp3`;
  image.src = `/img/${song.name}.jpg`;
}

// Current playing songs
let songIndex = 0;

// Next Song Function here
function nextSong() {
  songIndex++;
  // check songIndex number
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Previous Song Function here
function prevSong() {
  songIndex--;
  // check songIndex number
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

loadSong(songs[songIndex]);

// update progress bar and time function here
function updateProgressbar(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    const pPercent = (currentTime / duration) * 100;
    progress.style.width = `${pPercent}%`;
    // Display duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    // check seconds if less than 10
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // NaN check
    if (durationSeconds) {
      durationEle.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Display current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    // check seconds if less than 10
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEle.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// set Progress Bar function here
function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// addEventListener for change to Next Song
nextBtn.addEventListener("click", nextSong);

// addEventListener for change to Previous song
prevBtn.addEventListener("click", prevSong);

// Auto next song when song finish
music.addEventListener("ended", nextSong);

// addEventListener for progress bar
music.addEventListener("timeupdate", updateProgressbar);

// addEventListener for progress bar when click
progressContainer.addEventListener("click", setProgressBar);
