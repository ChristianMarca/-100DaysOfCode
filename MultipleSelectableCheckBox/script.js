export default function Main(){
    this.lastCheck=null;
    this.selectors=this.getSelectors();
    this.init()
}

Main.prototype.init=function(selectors){
    // this.init.call(this,this.selectors);
    this.handlerEvent()
}

Main.prototype.getSelectors=function(){
    return document.querySelectorAll('.inbox input[type=checkbox]');
}

Main.prototype.handlerEvent=function(){
    this.selectors.forEach(element => {
        element.addEventListener('click',this.handlerCheck.bind(this))
    });
}

Main.prototype.handlerCheck=function(event){
    let inBetween=false;
    if(event.shiftKey && event.target.checked){
        this.selectors.forEach(element=>{
            if(element==event.target || element==this.lastCheck){
                inBetween=!inBetween;
            }
            if(inBetween){
                element.checked=true;
            }
        })
    }
    this.lastCheck=event.target;
}