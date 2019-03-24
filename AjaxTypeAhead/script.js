function FilterData(){
    this.cities=[];
}

FilterData.prototype.fetchData=async function (){
    let getDataJson=await fetch(this.endpoint);
    let data=await getDataJson.json();
    this.cities.push(...data);
}

FilterData.prototype.findMatches=async function(wordToMatch){
    return this.cities.filter(place=>{
        let regex= new RegExp(wordToMatch,'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
}
FilterData.prototype.numberWithCommas=function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function Main(endpoint){
    this.endpoint = endpoint;
    this.searchInput=document.querySelector('.search');
    this.suggestions=document.querySelector('.suggestions');
}

Main.prototype= Object.create(new FilterData())

Main.prototype.init=function(){
    this.searchInput.addEventListener('change',(event)=>this.displayMatches(event));
    this.searchInput.addEventListener('keyup',(event)=>this.displayMatches(event));
    this.fetchData()
}

Main.prototype.displayMatches=function(event){
    let value=event.target.value;
    if(!value) return this.suggestions.innerHTML=`<li>Filter for a city</li>
    <li>or a state</li>`;
    const matchArray= this.findMatches(value);
    matchArray.then((matchArray) => {
        let html=matchArray.map(place=>{
            let regex= new RegExp(value,'gi');
            const cityName=place.city.replace(regex,`<span class="hl">${value}</span>`)
            const stateName=place.state.replace(regex,`<span class="hl">${value}</span>`)
            return `
                <li>
                    <span class='name'>${cityName}, ${stateName} </span>
                    <span class='population'>${this.numberWithCommas(place.population)} </span>
                </li>
                `
            }).join('');
        this.suggestions.innerHTML=html;
    }).catch((err) => {
        console.log(err)
    });
}


export default Main;

