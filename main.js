const app=()=>{
    const song=document.querySelector('.song');
    const play=document.querySelector('.play');
    const outline=document.querySelector('.moving-outline circle');
    const video=document.querySelector('.vid-container video');

    //Sounds
    const sounds=document.querySelectorAll('sound-picker button');
    //Time Display
    const timeDisplay=document.querySelector('.time-display');
    //Time Select
    const timeSelect=document.querySelectorAll('.time-select button');
    //Get The Lenght of The Outline
    const outlineLength=outline.getTotalLength();
    //Duration
    let fakeDuration=600

    outline.style.strokeDasharray=outlineLength;
    outline.style.strokeDashoffset =outlineLength;

    
    //Pick Different Sounds
    sounds.forEach(option=>{
        sound.addEventListener('click',function(){
            song.src=this.getAttribute('data-sound');
            video.src=this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    //Play Sound
    play.addEventListener('click',()=>{
        checkPlaying(song);
    });

    //Select Sound
    timeSelect.forEach(option=>{
        option.addEventListener('click',function(){
            fakeDuration=this.getAttribute('data-time');
        });
    });

    //Creat  aFunction To Specify If a Song & Video Is Playing Or Pause
    const checkPlaying=song=>{
        if (song.pause) {
            song.play();
            video.play();
            play.src="./img/pause.jpg"
        } else {
            song.play();
            video.play();
            play.src="./img/play.jpg"
         }
    }
    //We Can Animate The circle
    song.ontimeupdate=()=>{
        let currentTime=song.currentTime;
        let elapsed=fakeDuration - currentTime;
        let seconds=Math.floor(elapsed % 60);
        let minutes=Math.floor(elapsed / 60);

        //Animate The Circle
        let progress=outlineLength - (currentTime/fakeDuration) * outlineLength;
        outline.strokeDashoffset= progress;
        //Animate the text
        timeDisplay.textContent=`${minutes}:${seconds}`;

        if (currentTime>=fakeDuration) {
            song.pause();
            song,currentTime=0
             play.src="./img/pause.jpg"
             video.pause();
        }
    };
};

app()