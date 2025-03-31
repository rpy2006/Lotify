// music.js
const songs = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        cover: "https://i.scdn.co/image/ab67616d00001e02b1c4b76e23414c9f20242268",
        file: "music/SpotiDownloader.com - Blinding Lights - The Weeknd.mp3"
    },
    {
        id: 2,
        title: "Seetadevi Navvyla",
        artist: "Arjit Singh",
        cover: "https://i.scdn.co/image/ab67616d00001e02e6f407c7f3a0ec98845e4431",
        file: "/music/SpotiDownloader.com - Aa Seetadevi Navvula - Arijit Singh.mp3"
    },
   
    {
        id: 3,
        title: "Janiye",
        artist: "Vishal Mishra",
        cover:"https://iili.io/3uv3Puj.png" ,
        file: "/music/SpotiDownloader.com - Janiye (from the Netflix Film _Chor Nikal Ke Bhaga_) - Vishal Mishra.mp3"
    },
    {
        id:  4,
        title: "Fast",
        artist: "Juice wrld",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/JuiceWRLD-Live a lie.mp3"
    },
    {
        id: 5,
        title: "Agar Tum Sath Ho",
        artist: "Arjit Singh",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/spotidownloader.com - Agar Tum Saath Ho (From _Tamasha_) - Alka Yagnik.mp3"
    },
    {
        id: 6,
        title: "All The Stars",
        artist:'Kendrick Lamar',
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - All The Stars (with SZA) - Kendrick Lamar.mp3"
    },
   
    {
        id: 7,
        title: "Brooklyn Baby",
        artist: "Lana Del Rey",
        cover:"https://iili.io/3uv3Puj.png" ,
        file: "/music/SpotiDownloader.com - Brooklyn Baby - Lana Del Rey.mp3"
    },
    {
        id:  8,
        title: "Choo Lo",
        artist: "The Local Train",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/spotidownloader.com - Choo Lo - The Local Train.mp3"
    },
    {
        id: 9,
        title: "Criminal",
        artist: "Britney Spears",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - Criminal - Britney Spears.mp3"
    },
    {
        id: 10,
        title: "Espresso",
       artist: "Sabrina Carpenter",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - Espresso - Sabrina Carpenter.mp3"
    },
   
    {
        id: 11,
        title: "Hate Me",
        artist: "Ellie Goulding",
        cover:"https://iili.io/3uv3Puj.png" ,
        file: "/music/SpotiDownloader.com - Hate Me - Ellie Goulding.mp3"
    },
    {
        id:  12,
        title: "Husn",
        artist: "Anuv Jain",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/spotidownloader.com - Husn - Anuv Jain.mp3"
    },
    {
        id: 13,
        title: "Ik kudi",
        artist: "Arpit Bala",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - Ik Kudi - wolf.cryman.mp3"
    },
    {
        id: 14,
        title: "Kaise Hua",
        artist: "Vishal Mishra",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/spotidownloader.com - Kaise Hua (From _Kabir Singh_) - Vishal Mishra.mp3"
    },
    {
        id:  15,
        title: "Khatta Flow",
        artist: "Seedhe Maut",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/spotidownloader.com - Khatta Flow - Seedhe Maut.mp3"
    }, 
    {
        id: 16,
        title: "Kinni Kinni",
        artist: "Diljit Dosanjh",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - Kinni Kinni - Diljit Dosanjh.mp3"
    },
    {
        id: 17,
        title: "La La La",
        artist: "Naughty Boy",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - La La La - Naughty Boy.mp3"
    },
   
    {
        id: 18,
        title: "Live Your Life",
        artist: "T.I",
        cover:"https://iili.io/3uv3Puj.png" ,
        file: "/music/SpotiDownloader.com - Live Your Life - T.I..mp3"
    },
    {
        id:  19,
        title: "Mast Magan",
        artist: "Arijit Singh",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/spotidownloader.com - Mast Magan (From _2 States_) - Arijit Singh.mp3"
    },
    {
        id: 20,
        title: "Nadaan Parinde",
        artist: "A.R.Rahman",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - Nadaan Parinde - A.R. Rahman.mp3"
    },
    {
        id: 21,
        title: "Namastute",
        artist: "Seedhe Maut",
        cover:"https://iili.io/3uv3Puj.png" ,
        file: "/music/spotidownloader.com - Namastute - Seedhe Maut.mp3"
    },
    {
        id:  22,
        title: "One of The Girls",
        artist: "JENNIE, Lily Rose",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - One Of The Girls (with JENNIE, Lily Rose Depp) - The Weeknd.mp3"
    },
    {
        id: 23,
        title: "Yellow",
        artist: "Coldplay",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - Yellow - Coldplay.mp3"
    },
    {
        id: 24,
        title: "Yaariyaan",
        artist: "Mohan Kannan_Pritam",
        cover:"https://iili.io/3uv3Puj.png" ,
        file: "/music/SpotifyMate.com - Yaariyaan - Male Vocals - Mohan Kannan_ Pritam.mp3"
    },
    {
        id:  25,
        title: "Perfect",
        artist: "Ed Sheeran",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - Perfect - Ed Sheeran.mp3"
    },
    {
        id: 26,
        title: "Say Yes To Heaven",
        artist: "Lana Del Rey",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - Say Yes To Heaven - Lana Del Rey.mp3"
    },
    {
        id: 27,
        title: "Sunflower",
        artist: "Post Malone",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - Sunflower - Spider-Man_ Into the Spider-Verse - Post Malone.mp3"
    },
    {
        id: 28,
        title: "Sweater Weather",
        artist: "The Neighborhood",
        cover:"/image/anime.png" ,
        file: "/music/SpotiDownloader.com - Sweater Weather - The Neighbourhood.mp3"
    },
    {
        id:  29,
        title: "Timeless",
        artist: "Weeknd",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - Timeless (feat. Playboi Carti) - The Weeknd.mp3"
    }, 
    {
        id: 30,
        title: "Young and Beautiful",
        artist: "Lana Del Rey",
        cover: "/image /anime.png",
        file: "/music/SpotiDownloader.com - Young And Beautiful - Lana Del Rey.mp3",
    },
    {
        id: 31,
        title: "Abhi Kuch Dino Se",
        artist: "Pritam",
        cover: "/image /anime.png",
        file: "/music/SpotifyMate.com - Abhi Kuch Dino Se - Pritam.mp3"
    },
    {
        id: 32,
        title: "Aura",
        artist: "Shubh",
       cover:"https://iili.io/3uv3Puj.png",
        file: "/music/SpotifyMate.com - Aura - Shubh.mp3"
    },
    {
        id:  33,
        title: "Baller",
        artist: "Shubh",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotifyMate.com - Baller - Shubh.mp3"
    },
    {
        id: 34,
        title: "Be Intehaan",
        artist: "Atif Aslam",
        cover: "/image /anime.png",
        file: "/music/SpotifyMate.com - Be Intehaan - Atif Aslam.mp3"
    },
    {
        id: 35,
        title: "Daayre",
        artist: "Pritam",
        cover: "/image /anime.png",
        file: "/music/SpotifyMate.com - Daayre - Pritam.mp3"
    },
    {
        id: 36,
        title: "Dior",
        artist: "Shubh",
        cover:"https://iili.io/3uv3Puj.png" ,
        file: "/music/SpotifyMate.com - Dior - Shubh.mp3"
    },
    {
        id:  37,
        title: "Elevated",
        artist: "Shubh",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotifyMate.com - Elevated - Shubh.mp3"
    },
    {
        id: 38,
        title: "Finding Her",
        artist: "Kushagra",
        cover: "/image /anime.png",
        file: "/music/SpotifyMate.com - Finding Her - Kushagra.mp3"
    },
    {
        id: 39,
        title: " I wanna Be Your Slave",
        artist: "Måneskin",
        cover: "/image /anime.png",
        file: "/music/SpotifyMate.com - I WANNA BE YOUR SLAVE - Måneskin.mp3"
    },
    {
        id: 40,
        title: "Kalank",
        artist: "Pritam",
        cover:"https://iili.io/3uv3Puj.png" ,
        file: "/music/SpotifyMate.com - Kalank - Title Track - Pritam.mp3",
    },
    {
        id:  41,
        title: "Lalkara",
        artist: "Diljit Dosanjh",
        cover: "/image /anime.png",
        file: "/music/SpotifyMate.com - Lalkara - Diljit Dosanjh.mp3"
    },
    {
        id: 42,
        title: "Lover",
        artist: "Diljit Dosanjh",
        cover: "/image /anime.png",
        file: "/music/SpotifyMate.com - Lover - Diljit Dosanjh.mp3"
    },
    {
        id: 43,
        title: "MVP",
        artist: "Diljit Dosanjh",
        cover: "/image /anime.png",
        file: "/music/SpotifyMate.com - MVP - Shubh.mp3"
    },
    {
        id: 44,
        title: "Paaro",
        artist: "Aditya Rikhari",
        cover:"https://iili.io/3uv3Puj.png" ,
        file: "/music/SpotifyMate.com - Paaro - Aditya Rikhari.mp3"
    },
    {
        id:  45,
        title: "Phir Sa Ud Chala",
        artist: "Mohit Chauhan",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotifyMate.com - Phir Se Ud Chala - Mohit Chauhan.mp3"
    }, 
    {
        id: 46,
        title: "True Stories",
        artist: "AP Dhillon",
        cover: "/image /anime.png",
        file: "/music/SpotifyMate.com - True Stories - AP Dhillon.mp3"
    },
    {
        id: 47,
        title: "We Rollin",
        artist: "Shubh",
        cover: "/image /anime.png",
        file: "/music/SpotifyMate.com - We Rollin - Shubh.mp3"
    },
    {
        id: 48,
        title: "Wo Noor",
        artist: "AP Dhillon",
        cover:"https://iili.io/3uv3Puj.png" ,
        file: "/music/SpotifyMate.com - Wo Noor - AP Dhillon.mp3"
    },
    {
        id:  49,
        title: "Counting Stars",
        artist: "OneRepublic",
        cover: "/image /anime.png",
        file: "/music/SpotiDownloader.com - Counting Stars - OneRepublic.mp3"
    },
    {
        id: 50,
        title: "Die With A Smile",
        artist: "Lady Gaga",
        cover: "https://i.scdn.co/image/ab67616d00001e02b1c4b76e23414c9f20242268",
        file: "/music/SpotiDownloader.com - Die With A Smile - Lady Gaga.mp3"
    },
    {
        id: 51,
        title: "Heat Waves",
        artist: "Glass Animals",
        cover: "https://i.scdn.co/image/ab67616d00001e02e6f407c7f3a0ec98845e4431",
        file: "/music/SpotiDownloader.com - Heat Waves - Glass Animals.mp3"
    },
    {
        id: 52,
        title: "HIGHEST IN THE ROOM",
        artist: "Travis Scott",
        cover:"https://iili.io/3uv3Puj.png" ,
        file: "/music/SpotiDownloader.com - HIGHEST IN THE ROOM - Travis Scott.mp3"
    },
    {
        id:  53,
        title: "I Think They Call This Love",
        artist: "Matthew ifield",
        cover: "https://iili.io/3uv3Puj.png",
        file: "/music/SpotiDownloader.com - I Think They Call This Love - Cover - Matthew Ifield.mp3"
    },
    {
        id: 54,
        title: "I Wanna Be Yours",
        artist: "Arctic Monkeys",
        cover: "https://i.scdn.co/image/ab67616d00001e02b1c4b76e23414c9f20242268",
        file: "/music/SpotiDownloader.com - I Wanna Be Yours - Arctic Monkeys.mp3"
    },
   
];