export default {
    actualDate: new Date(),
    seconds:0,
    minutes:0,
    hours:0,
    secondHand:document.querySelector('.second-hand'),
    minuteHand:document.querySelector('.minute-hand'),
    hourHand:document.querySelector('.hour-hand'),
    start(){
        setInterval(()=>this.setDate(),1000)
    },
    get _getSecond(){
        return this.seconds
    },
    set setSecond(seconds){
        this.seconds=seconds;
    },
    get _getMinute(){
        return this.minutes
    },
    set setMinute(minutes){
        this.minutes=minutes;
    },
    get _getHour(){
        return this.hours
    },
    set setHour(hours){
        this.hours=hours;
    },
    get getDate(){
        return this.actualDate
    },
    set _setDate(date){
        this.actualDate=date;
    },
    timeToDegrees(type,time){
        return type=='hours'?((time/12)*360)+90:((time/60)*360)+90;
    },
    setDate(){
        this._setDate=new Date();
        this.seconds=this.getDate.getSeconds();
        this.setMinute=this.getDate.getMinutes();
        this.hours=this.getDate.getHours();

        let seconds=this.timeToDegrees('seconds',this._getSecond);
        let minutes=this.timeToDegrees('minutes',this._getMinute);
        let hours=this.timeToDegrees('hours',this._getHour);

        this.updateSecondsOnClock(hours,minutes,seconds);
    },
    playTic(){
        const audio=document.getElementById('sound-clock');
        if(!audio) return
        audio.currentTime=0
        audio.play();
    }
    ,
    updateSecondsOnClock(degreesHour, degreesMunites,degreesSeconds){
        this.playTic();
        this.secondHand.style.transform=`rotate(${degreesSeconds}deg)`;
        this.minuteHand.style.transform=`rotate(${degreesMunites}deg)`;
        this.hourHand.style.transform=`rotate(${degreesHour}deg)`;
    }
}