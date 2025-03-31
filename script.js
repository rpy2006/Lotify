// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audioPlayer = new Audio();
    const playBtn = document.querySelector('.play-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const shuffleBtn = document.querySelector('.shuffle-btn');
    const repeatBtn = document.querySelector('.repeat-btn');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const nowPlayingCover = document.querySelector('.now-playing-cover');
    const nowPlayingTitle = document.querySelector('.now-playing-title');
    const nowPlayingArtist = document.querySelector('.now-playing-artist');
    const homePlaylist = document.getElementById('home-playlist');
    const fullPlaylist = document.getElementById('full-playlist');
    const searchResults = document.getElementById('search-results');
    const searchBar = document.querySelector('.search-bar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const visualizerCanvas = document.getElementById('audioVisualizer');
    const visualizerCtx = visualizerCanvas.getContext('2d');

    // Player state
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeat = false;
    let shuffledPlaylist = [];
    let audioContext;
    let analyser;
    let dataArray;
    let animationId;

    // Initialize player
    function initPlayer() {
        renderPlaylists();
        loadSong(currentSongIndex);
        setupAudioVisualizer();
        
        // Event listeners
        playBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', handleSongEnd);
        audioPlayer.addEventListener('loadedmetadata', updateDuration);
        shuffleBtn.addEventListener('click', toggleShuffle);
        repeatBtn.addEventListener('click', toggleRepeat);
        
        // Navigation
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const sectionId = this.dataset.section + '-section';
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding section
                sections.forEach(section => section.classList.remove('active'));
                document.getElementById(sectionId).classList.add('active');
            });
        });
        
        // Search functionality
        searchBar.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            if (searchTerm.length > 0) {
                const results = songs.filter(song => 
                    song.title.toLowerCase().includes(searchTerm) || 
                    song.artist.toLowerCase().includes(searchTerm)
                );
                renderSearchResults(results);
            } else {
                searchResults.innerHTML = '';
            }
        });
    }

    // Render playlists
    function renderPlaylists() {
        // Render home playlist (could be a subset or featured songs)
        homePlaylist.innerHTML = songs.slice(0, 55).map((song, index) => `
            <div class="song-item" data-index="${index}">
                <img src="${song.cover}" class="song-cover" alt="${song.title}">
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
            </div>
        `).join('');
        
        // Render full playlist
        fullPlaylist.innerHTML = songs.map((song, index) => `
            <div class="song-item" data-index="${index}">
                <img src="${song.cover}" class="song-cover" alt="${song.title}">
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers to all song items
        document.querySelectorAll('.song-item').forEach(item => {
            item.addEventListener('click', function() {
                currentSongIndex = parseInt(this.dataset.index);
                playSong();
            });
        });
    }

    // Render search results
    function renderSearchResults(results) {
        searchResults.innerHTML = results.map(song => {
            const index = songs.findIndex(s => s.id === song.id);
            return `
                <div class="song-item" data-index="${index}">
                    <img src="${song.cover}" class="song-cover" alt="${song.title}">
                    <div class="song-info">
                        <div class="song-title">${song.title}</div>
                        <div class="song-artist">${song.artist}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add click handlers to search results
        document.querySelectorAll('#search-results .song-item').forEach(item => {
            item.addEventListener('click', function() {
                currentSongIndex = parseInt(this.dataset.index);
                playSong();
            });
        });
    }

    // Load song
    function loadSong(index) {
        const song = isShuffled ? shuffledPlaylist[index] : songs[index];
        audioPlayer.src = song.file;
        nowPlayingCover.src = song.cover;
        nowPlayingCover.alt = song.title;
        nowPlayingTitle.textContent = song.title;
        nowPlayingArtist.textContent = song.artist;
        
        // Highlight current song in all playlists
        document.querySelectorAll('.song-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const playlistIndex = isShuffled ? 
            shuffledPlaylist.findIndex(s => s.id === song.id) : index;
        
        document.querySelectorAll(`.song-item[data-index="${playlistIndex}"]`).forEach(item => {
            item.classList.add('active');
        });
    }

    // Play song
    function playSong() {
        loadSong(currentSongIndex);
        audioPlayer.play();
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        setupAudioVisualizer();
    }

    // Toggle play/pause
    function togglePlay() {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            cancelAnimationFrame(animationId);
        } else {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            setupAudioVisualizer();
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
        progressBar.style.width = `${progressPercent}%`;
        
        // Update time display
        currentTimeEl.textContent = formatTime(currentTime);
    }

    // Update duration
    function updateDuration() {
        durationEl.textContent = formatTime(audioPlayer.duration);
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

    // Audio visualizer setup
    function setupAudioVisualizer() {
        if (audioContext) {
            audioContext.close();
        }
        
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        
        const source = audioContext.createMediaElementSource(audioPlayer);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        // Start visualization
        drawVisualizer();
    }

    // Draw audio visualizer
    function drawVisualizer() {
        if (!isPlaying) return;
        
        animationId = requestAnimationFrame(drawVisualizer);
        analyser.getByteFrequencyData(dataArray);
        
        visualizerCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
        
        const barWidth = (visualizerCanvas.width / dataArray.length) * 2.5;
        let x = 0;
        
        for (let i = 0; i < dataArray.length; i++) {
            const barHeight = (dataArray[i] / 255) * visualizerCanvas.height;
            
            visualizerCtx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            visualizerCtx.fillRect(
                x, 
                visualizerCanvas.height - barHeight, 
                barWidth, 
                barHeight
            );
            
            x += barWidth + 1;
        }
    }

    // Initialize the player
    initPlayer();
});