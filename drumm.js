export default class Drumm{
    constructor(){
        this.event=null;
    };
    
    set setEvent(event){
        this.event=event;
    }

    get getEvent(){
        return this.event;
    }

    onHandleEvents(){
        this.playSound();
        this.paintKeys();
    }

    playSound(){
        const audio=document.querySelector(`audio[data-key="${this.getEvent.keyCode}"]`);
        if(!audio) return
        audio.currentTime=0
        audio.play();
    }
    paintKeys(){
        const key=document.querySelector(`.key[data-key="${this.getEvent.keyCode}"]`);
        key.classList.add('playing')
    }
    removeTransition(key){
        if(this.getEvent.propertyName != 'transform' ) return;
        key.classList.remove('playing')
    }

}
