const musicContainer = document.getElementById('music_container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress_container');
const title = document.getElementById('mTitle');
const cover = document.getElementById('cover');


//song titles
const songs = ['산책', '그럴때마다', '달리기', '사진을보다가', '막차'];

//keep track of song
let songIndex = 0;

//lode song details into DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `assets/sounds/${song}.mp3`;
    cover.src = `assets/img/${song}.jpg`;
}

//play song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fa").classList.remove("fa-play");
    playBtn.querySelector("i.fa").classList.add("fa-pause");

    audio.play();
}

//pause song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fa").classList.add("fa-play");
    playBtn.querySelector("i.fa").classList.remove("fa-pause");

    audio.pause();
}

//prev song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);

    playSong();
}

//next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex]);

    playSong();
}

//update progress bar
function updateProgress(e) {
    const {
        duration,
        currentTime
    } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

//set Progress Bar
function setProgress(e) {
    const width = this.clienWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Event Listener
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

//Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//time&song update
audio.addEventListener('timeupdate', updateProgress);

//click on progress bar
progressContainer.addEventListener("click", setProgress);

//song Ends
audio.addEventListener("ended", nextSong);