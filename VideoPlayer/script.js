export default class VideoPlayer{
    constructor(){
        console.log('hola')
        this.selectors={};
        this.isPaused=true;
        this.mouseDown= false;
    }
    init(){
        this._selectors();
        this._eventListeners();
    }
    _selectors(){
        //Get out Elements
        const player = document.querySelector('.player');
        const video = player.querySelector('.viewer');
        const progress = player.querySelector('.progress');
        const progressBar = player.querySelector('.progress__filled');
        const toggle = player.querySelector('.toggle');
        const skipButtons = player.querySelectorAll('[data-skip]');
        const ranges = player.querySelectorAll('.player__slider');
        const fullScreen = player.querySelector('.full__screen');
        this.selectors={
            player,
            video,
            progress,
            progressBar,
            toggle,
            skipButtons,
            ranges,
            fullScreen
        }
    }

    togglePlay(){
        const video=this.selectors.video;
        const method= video.paused?'play':'pause';
        video[method]();
    }

    _skip(event){
        const {video}= this.selectors;
        let skipButtonValue= event.target.dataset.skip;
        video.currentTime +=parseFloat(skipButtonValue);
    }

    _updateButton(event){
        const {toggle}=this.selectors;
        this.isPaused= event.target.paused;
        const icon=this.isPaused?'►' : '❚❚';
        toggle.textContent=icon;
    }

    _handleRangeUpdate(event){
        const {video}=this.selectors;
        const target = event.target;
        video[target.name]=target.value;
    }

    _handleProgress(){
        const {progressBar,video}=this.selectors;
        const percent= (video.currentTime)/(video.duration) *100;
        progressBar.style.flexBasis=`${percent}%`;
    }

    _scrub(event){
        console.log(event)
        const {progress,video}= this.selectors;
        const scrubTime=(event.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime=scrubTime; 
    }

    _handleEventProgress(event){
        this.mouseDown&&this._scrub(event);
    }

    _handleFullScreen(event){
        const {video}= this.selectors;
        if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.mozRequestFullScreen) { /* Firefox */
            video.mozRequestFullScreen();
          } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) { /* IE/Edge */
            video.msRequestFullscreen();
          }
    }

    _eventListeners(){
        const {video,toggle,skipButtons,ranges,progress,fullScreen}=this.selectors;
        video.addEventListener('click',this.togglePlay.bind(this));
        video.addEventListener('play',this._updateButton.bind(this));
        video.addEventListener('pause',this._updateButton.bind(this));
        video.addEventListener('timeupdate',this._handleProgress.bind(this))
        toggle.addEventListener('click',this.togglePlay.bind(this));
        skipButtons.forEach(element =>element.addEventListener('click',this._skip.bind(this)));
        ranges.forEach(element =>element.addEventListener('change',this._handleRangeUpdate.bind(this)));
        ranges.forEach(element =>element.addEventListener('mousemove',this._handleRangeUpdate.bind(this)));
        progress.addEventListener('click',this._scrub.bind(this));
        progress.addEventListener('mousemove',this._handleEventProgress.bind(this));
        progress.addEventListener('mousedown',()=>this.mouseDown=true);
        progress.addEventListener('mouseup',()=>this.mouseDown=false);
        console.log(fullScreen,'as')
        fullScreen.addEventListener('click',this._handleFullScreen.bind(this));
    }
}