export default class Canvas{
    constructor(){
        this.canvas = document.getElementById('draw');
        this.context= this.canvas.getContext('2d');
        this.isDrawing=false;
        this.lastX=0;
        this.lastY=0;
        this.hue=0;
        this.direction=true;
    }
    draw(){
        this._resizing();
        this._configureContext('#BADA55',25);
        this._listeners();
    }
    _resizing(){
        this.canvas.width=window.innerWidth;
        this.canvas.height= window.innerHeight;
    }
    _listeners(){
        this.canvas.addEventListener('mousemove',(event)=>this._draw(event))
        this.canvas.addEventListener('mousedown',(event)=>this._actualPosition(event))
        this.canvas.addEventListener('mouseup',()=>this.isDrawing=false)
        this.canvas.addEventListener('mouseout',()=>this.isDrawing=false)
    }
    _configureContext(color='#3e3e3e',width=10){
        this.context.strokeStyle=color;
        this.context.lineJoin='round';
        this.context.lineCap='round';
        this.context.lineWidth=width;
        this.context.globalCompositeOperation='hard-light';
    }
    _draw(event){
        if(!this.isDrawing) return
        this._updateContext();
        this._setLastPosition(event.offsetX,event.offsetY)
        this._changePresentation();
    }
    
    _changePresentation(){
        // this.hue>=360?this.hue=0:this.hue++;
        this.hue>=360?this.hue=0:this.hue=Math.floor(360*Math.random());
        if(this.context.lineWidth>=50||this.context.lineWidth<=1) this.direction=!this.direction;
        this.direction?this.context.lineWidth++:this.context.lineWidth--;
    }
    
    _updateContext(){
        this.context.strokeStyle=`hsl(${this.hue},100%,50%)`;
        this.context.beginPath();
        this.context.moveTo(this.lastX,this.lastY);
        this.context.lineTo(event.offsetX,event.offsetY);
        this.context.stroke();
    }
    _actualPosition(event){
        this.isDrawing=true;
        this._setLastPosition(event.offsetX,event.offsetY);
    }
    _setLastPosition(lastX,lastY){
        [this.lastX,this.lastY]=[lastX,lastY];
    }
    
}