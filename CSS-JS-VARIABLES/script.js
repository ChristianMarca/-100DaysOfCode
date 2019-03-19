export default class Main{
    constructor(){
        this.selectors=this._selectors();
    }
    _selectors(){
        return document.querySelectorAll('.controls input');
    }
    handleUpdate(event){
        const suffix = event.target.dataset.sizing ||'';
        document.documentElement.style.setProperty(`--${event.target.name}`,event.target.value+suffix);
        console.log('its working',suffix,event.target.name,event.target.value)
    }
    addListeners(){
        this.selectors.forEach(input=>{
            input.addEventListener('change',(event)=>{
                this.handleUpdate(event);
            })
        });
        this.selectors.forEach(input=>{
            input.addEventListener('mousemove',(event)=>{
                this.handleUpdate(event);
            })
        })
    }
}