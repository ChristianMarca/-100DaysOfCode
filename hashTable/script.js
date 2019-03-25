const HashTable= require('./hashClass.js');
const {BIGARRAY,ARRAYFORCOMPARE} = require('./constants.js');
function Main(){
    
}
Main.prototype=Object.create(new HashTable());

Main.prototype.compareWithFor=function(a,b){
    let datos = [];
    for(let i=0; i<a.length;i++){
        for(let j=0; j<b.length;j++){
            if (a[i] == b[j])
                datos.push(b[j])
        }
    }
}


Main.prototype.compareWithHashTable=function(a,b){
    let datos=[];
    let d=new HashTable()
    for (let i=0; i<a.length;i++){
        d.agregar(this.hashCode(a[i]), a[i])
    }
    for(let i=0; i<b.length;i++){
        if (d.existe(this.hashCode(b[i]))){
            datos.push(b[i])
        }
    }
}

let main=new Main();

    console.time('compareWithFor');
    main.compareWithFor(BIGARRAY,ARRAYFORCOMPARE);
    console.timeEnd('compareWithFor');
    console.time('compareWithHashTable');
    main.compareWithHashTable(BIGARRAY,ARRAYFORCOMPARE);
    console.timeEnd('compareWithHashTable');