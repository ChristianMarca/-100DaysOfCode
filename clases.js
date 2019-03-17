import Drumm from './drumm.js';
export default class EventsHandler extends Drumm{
    constructor(){
        super();
        window.addEventListener('keydown',(event)=>{
            this.setEvent=event;
            this.onHandleEvents();
        });
        const keys= document.querySelectorAll('.key');
        keys.forEach(key=>key.addEventListener('transitionend',()=>{
            this.setEvent=event;
            this.removeTransition(key);
        }))
    }
}