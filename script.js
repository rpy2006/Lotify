
    let audioContext, analyser, source, canvas, canvasCtx, animationFrameId;
    const audio = new Audio();
    let currentTrack = 0, isPlaying = false, isShuffled = false, isRepeat = false;
    
    const elements = {
      homePlaylist: document.getElementById('home-playlist'),
      searchResults: document.getElementById('search-results'),
      fullPlaylist: document.getElementById('full-playlist'),
      nowPlayingCover: document.querySelector('.now-playing-cover'),
      nowPlayingTitle: document.querySelector('.now-playing-title'),
      nowPlayingArtist: document.querySelector('.now-playing-artist'),
      progressBar: document.querySelector('.progress-bar'),
      currentTime: document.querySelector('.current-time'),
      duration: document.querySelector('.duration'),
      playBtn: document.querySelector('.play-btn'),
      playIcon: document.getElementById('play-icon'),
      shuffleBtn: document.querySelector('.shuffle-btn'),
      repeatBtn: document.querySelector('.repeat-btn'),
      searchBar: document.querySelector('.search-bar'),
      sections: {
        home: document.getElementById('home-section'),
        search: document.getElementById('search-section'),
        playlist: document.getElementById('playlist-section')
      }
    };

    function initAudioContext() {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      canvas = document.getElementById('audioVisualizer');
      canvasCtx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function visualize() {
      if (!isPlaying) return;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = canvasCtx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1DB954');
      gradient.addColorStop(1, '#1ED760');
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
      animationFrameId = requestAnimationFrame(visualize);
    }

    function init() {
      renderPlaylists();
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', handleSongEnd);
      elements.searchBar.addEventListener('input', searchSongs);
      setupNavigation();
      setupPlayerControls();
      window.addEventListener('resize', () => {
        if (canvas) {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
        }
      });
    }

    function renderPlaylists() {
      renderPlaylist(elements.homePlaylist, songs.slice(0, 100));
      renderPlaylist(elements.fullPlaylist, songs);
    }

    function renderPlaylist(container, songs) {
      container.innerHTML = songs.map(song => `
        <div class="song-item" data-id="${song.id}">
          <img src="${song.cover}" class="song-cover" alt="Cover">
          <div class="song-info">
            <div class="song-title">${song.title}</div>
            <div class="song-artist">${song.artist}</div>
          </div>
        </div>
      `).join('');
      container.querySelectorAll('.song-item').forEach(item => {
        item.addEventListener('click', () => playSong(Number(item.dataset.id)));
      });
    }

    async function playSong(id) {
      if (!audioContext) initAudioContext();
      const index = songs.findIndex(song => song.id === id);
      currentTrack = index;
      audio.src = songs[index].file;
      try {
        await audio.play();
        if (audioContext.state === 'suspended') await audioContext.resume();
        isPlaying = true;
        elements.playIcon.classList.replace('fa-play', 'fa-pause');
        updateNowPlaying();
        cancelAnimationFrame(animationFrameId);
        visualize();
      } catch (error) {
        console.error("Playback failed:", error);
      }
    }

    function updateNowPlaying() {
      const song = songs[currentTrack];
      elements.nowPlayingCover.src = song.cover;
      elements.nowPlayingTitle.textContent = song.title;
      elements.nowPlayingArtist.textContent = song.artist;
      elements.duration.textContent = formatTime(song.duration);
      document.querySelectorAll('.song-item').forEach(item => {
        item.classList.toggle('active', Number(item.dataset.id) === song.id);
      });
    }

    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function updateProgress() {
      const progress = (audio.currentTime / audio.duration) * 100;
      elements.progressBar.style.width = `${progress}%`;
      elements.currentTime.textContent = formatTime(audio.currentTime);
    }

    function handleSongEnd() {
      isRepeat ? (audio.currentTime = 0, audio.play()) : playNext();
    }

    function playNext() {
      currentTrack = (currentTrack + 1) % songs.length;
      playSong(songs[currentTrack].id);
    }

    function playPrev() {
      currentTrack = (currentTrack - 1 + songs.length) % songs.length;
      playSong(songs[currentTrack].id);
    }

    function searchSongs() {
      const term = elements.searchBar.value.toLowerCase();
      const results = songs.filter(song =>
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term)
      );
      renderPlaylist(elements.searchResults, results);
    }

    function setupNavigation() {
      document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
          item.classList.add('active');
          Object.values(elements.sections).forEach(section => section.classList.remove('active'));
          document.getElementById(`${item.dataset.section}-section`).classList.add('active');
        });
      });
    }

    async function togglePlayback() {
      if (isPlaying) {
        audio.pause();
        elements.playIcon.classList.replace('fa-pause', 'fa-play');
        cancelAnimationFrame(animationFrameId);
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        try {
          await audio.play();
          if (audioContext.state === 'suspended') await audioContext.resume();
          elements.playIcon.classList.replace('fa-play', 'fa-pause');
          visualize();
        } catch (error) {
          console.error("Playback failed:", error);
          return;
        }
      }
      isPlaying = !isPlaying;
    }

    function setupPlayerControls() {
      elements.playBtn.addEventListener('click', togglePlayback);
      document.querySelector('.next-btn').addEventListener('click', playNext);
      document.querySelector('.prev-btn').addEventListener('click', playPrev);
      elements.shuffleBtn.addEventListener('click', () => {
        isShuffled = !isShuffled;
        elements.shuffleBtn.classList.toggle('active', isShuffled);
      });
      elements.repeatBtn.addEventListener('click', () => {
        isRepeat = !isRepeat;
        elements.repeatBtn.classList.toggle('active', isRepeat);
        audio.loop = isRepeat;
      });
      document.querySelector('.progress-container').addEventListener('click', (e) => {
        const rect = e.target.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
      });
    }

    document.addEventListener('DOMContentLoaded', init);
  
