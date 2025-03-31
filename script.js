// player.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeControl = document.getElementById('volume');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const albumArt = document.getElementById('album-art');
    const playlistContainer = document.getElementById('playlist');
    const shuffleBtn = document.getElementById('shuffle');
    const repeatBtn = document.getElementById('repeat');
    
    // Player state
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeat = false;
    let originalPlaylist = [...songs];
    let shuffledPlaylist = [];
    
    // Initialize player
    function initPlayer() {
        loadSong(currentSongIndex);
        renderPlaylist();
        
        // Event listeners
        playPauseBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', handleSongEnd);
        audioPlayer.addEventListener('loadedmetadata', updateDuration);
        progressBar.addEventListener('click', seek);
        volumeControl.addEventListener('input', setVolume);
        shuffleBtn.addEventListener('click', toggleShuffle);
        repeatBtn.addEventListener('click', toggleRepeat);
    }
    
    // Load song
    function loadSong(index) {
        const song = isShuffled ? shuffledPlaylist[index] : songs[index];
        audioPlayer.src = song.file;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        albumArt.src = song.cover;
        albumArt.alt = `${song.title} by ${song.artist}`;
    }
    
    // Toggle play/pause
    function togglePlay() {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
    
    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = (isShuffled ? shuffledPlaylist : songs).length - 1;
        }
        playSong();
    }
    
    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex >= (isShuffled ? shuffledPlaylist : songs).length) {
            currentSongIndex = 0;
        }
        playSong();
    }
    
    // Play song
    function playSong() {
        loadSong(currentSongIndex);
        audioPlayer.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        highlightCurrentSong();
    }
    
    // Handle song end
    function handleSongEnd() {
        if (isRepeat) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else {
            nextSong();
        }
    }
    
    // Update progress bar
    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        
        // Update time display
        currentTimeEl.textContent = formatTime(currentTime);
    }
    
    // Update duration
    function updateDuration() {
        durationEl.textContent = formatTime(audioPlayer.duration);
    }
    
    // Seek in song
    function seek(e) {
        const seekTime = (e.offsetX / progressBar.clientWidth) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    }
    
    // Set volume
    function setVolume() {
        audioPlayer.volume = volumeControl.value;
    }
    
    // Toggle shuffle
    function toggleShuffle() {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('active', isShuffled);
        
        if (isShuffled) {
            shuffledPlaylist = [...songs].sort(() => Math.random() - 0.5);
            // Find current song in shuffled playlist
            const currentSong = songs[currentSongIndex];
            currentSongIndex = shuffledPlaylist.findIndex(song => song.id === currentSong.id);
        } else {
            // Find current song in original playlist
            const currentSong = shuffledPlaylist[currentSongIndex];
            currentSongIndex = songs.findIndex(song => song.id === currentSong.id);
        }
    }
    
    // Toggle repeat
    function toggleRepeat() {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
    }
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Render playlist
    function renderPlaylist() {
        playlistContainer.innerHTML = '';
        const playlistToRender = isShuffled ? shuffledPlaylist : songs;
        
        playlistToRender.forEach((song, index) => {
            const songElement = document.createElement('div');
            songElement.className = `playlist-song ${index === currentSongIndex ? 'active' : ''}`;
            songElement.dataset.index = index;
            songElement.innerHTML = `
                <img src="${song.cover}" alt="${song.title}" class="playlist-song-cover">
                <div class="playlist-song-info">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
            `;
            
            songElement.addEventListener('click', () => {
                currentSongIndex = index;
                playSong();
            });
            
            playlistContainer.appendChild(songElement);
        });
    }
    
    // Highlight current song in playlist
    function highlightCurrentSong() {
        const playlistSongs = document.querySelectorAll('.playlist-song');
        playlistSongs.forEach((song, index) => {
            song.classList.toggle('active', index === currentSongIndex);
        });
    }
    
    // Initialize the player
    initPlayer();
});