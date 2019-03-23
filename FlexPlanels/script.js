function HandlerEvents(event){
    
}

HandlerEvents.prototype.tooglePanel=function (key){
    key.classList.toggle('open');
}

HandlerEvents.prototype.tooglePanelActive=function (event,key){
    if(event.propertyName.includes('flex')){
        key.classList.toggle('open-active');
    }
}


function Main (){
    this.panels=document.querySelectorAll('.panel');

    this.panels.forEach(panel=>panel.addEventListener('click',(event)=>{
        this.tooglePanel(panel);
    }));
    this.panels.forEach(panel=>panel.addEventListener('transitionend',(event)=>{
        this.tooglePanelActive(event,panel);
    }))
};

Main.prototype= Object.create(new HandlerEvents());
export default Main=new Main();