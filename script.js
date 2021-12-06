
let songIndex=0;
let audioElemant = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");

let songs=[
    {songName:'On & On', filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:'Make Me Move', filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:'Heroes Tonight', filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:'Power', filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:'Grateful', filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:'Crash', filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName:'Work', filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName:'Namo Namo', filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    //{songName:'Yet to Add', filePath:"songs/9.mp3", coverPath:"covers/9.jpg"},
    //{songName:'Yet to Add', filePath:"songs/10.mp3", coverPath:"covers/10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
})

//audioElemant.play();

masterPlay.addEventListener("click", ()=>{
    if(audioElemant.paused || audioElemant.currentTime<=0){
        audioElemant.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
    else{
        makeAllPlays()
        audioElemant.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0;
    }
})

audioElemant.addEventListener("timeupdate", ()=>{
    progress=parseInt((audioElemant.currentTime/audioElemant.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", ()=>{
    audioElemant.currentTime = (myProgressBar.value*audioElemant.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElemant.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElemant.currentTime = 0;
        audioElemant.play();
        gif.style.opacity=1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    })
})


document.getElementById('next').addEventListener('click',()=>{
    if (songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    makeAllPlays()
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        if (element.id==String(songIndex)){
            element.classList.remove("fa-play-circle");
            element.classList.add("fa-pause-circle");
        }
    })

    audioElemant.src = `songs/${songIndex+1}.mp3`;
    audioElemant.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    audioElemant.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

document.getElementById('previous').addEventListener('click',()=>{
    if (songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    makeAllPlays()
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        if (element.id==String(songIndex)){
            element.classList.remove("fa-play-circle");
            element.classList.add("fa-pause-circle");
        }
    })
    audioElemant.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElemant.currentTime = 0;
    audioElemant.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

audioElemant.addEventListener('ended',()=>{
    if (songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    makeAllPlays()
    audioElemant.src = `songs/${songIndex+1}.mp3`;
    audioElemant.play();
    audioElemant.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;

})
