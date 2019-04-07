export default function Sort(arr){
    this.arr=arr;
}

Sort.prototype.interseccion=function (prim=0,ult=(this.arr.length-1)){
    //Complejidad 
    //mejor 14n-11
    //peor 9/2n^2+13/2n-10
    //media 9/2n^2+47/4n-11
    let i,j,x;
    let a=this.arr;
    for(i=prim+1;i<=ult;i++){
        x=a[i]; j=i-1;
        while(j>=prim && x<a[j]){
            a[j+1]=a[j];
            j--;
        }
        a[j+1]=x;
    }
    return a
};

Sort.prototype._posMax=function(a,i,j){
    let pmax,k;
    pmax=i;
    for(k=i+1;k<=j;k++){
        if(a[k]>a[pmax]){
            pmax=k;
        }
    }
    return pmax
}

Sort.prototype._posMin=function(a,i,j){
    let pmin,k;
    pmin=i;
    for(k=i+1;k<=j;k++){
        if(a[k]<a[pmin]){
            pmin=k;
        }
    }
    return pmin
}

Sort.prototype._intercambia=function(a,i,j){
    let temp;
    temp=a[i];
    a[i]=a[j];
    a[j]=temp;
    return a
}

Sort.prototype.seleccion=function(prim,ult){
    //Complejidad 
    //mejor 3n^2+14n-14
    //peor 7/2n^2+27/2n-14
    //media 13/4n^2+55/4n-14
    let i;
    let a=this.arr;
    for(i=prim;i<=ult-1;i++){
        this._intercambia(a,i,this._posMin(a,i,ult));
    }
    return a
}

Sort.prototype.burbuja=function(prim,ult){
    //Complejidad 
    //mejor 7/2n^2+5/2n-3
    //peor 8n^2-2n-1
    //media 23/4n^2+1/4n-1
    let i,j;
    let a= this.arr;
    for(i=prim; i<=ult-1;i++){
        for(j=ult; j>=i+1;j--){
            if(a[j-1]>a[j]){
                this._intercambia(a,j-1,j);
            }
        }
    }
    return a
}

Sort.prototype._combinarUno=function(a,p,q,r) {
    let n1,n2;
    n1=q-p+1;
    n2=r-q;
    let L= new Array(n1);
    let R=new Array(n2);
    
    for(let k=0;k<=n1-1;k++){
        L[k]=a[p+k];
    }
    
    for(let k=0;k<=n2-1;k++){
        R[k]=a[q+k+1];
    }
    
    L[n1]=Infinity;
    R[n2]=Infinity;
    // console.log(n1,n2,'./././',L,R)
    let i=0,j=0;
    for(let k=p;k<=r;k++){
        if(L[i]<=R[j]){
            a[k]=L[i];
            i++;
        }else{
            a[k]=R[j];
            j++;
        }
    }
    return a;
}
Sort.prototype._combinar=function(a,b,p1,u1,p2,u2){
    let i1,i2;
    if((p1>u1)||(p2>u2)) return
    for(let k=p1;k<=u2;k++){
        b[k]=a[k]
    }
    i1=p1;i2=p2;
    for(let k=p1;k<=u2;k++){
        if(b[i1]<=b[i2]){
            a[k]=b[i1];
            if(i1<u1){
                i1++;
            }else{
                b[i1]=Infinity;
            }
        }else{
            a[k]=b[i2];
            if(i2<u2){
                i2++;
            }else{
                b[i2]=Infinity;
            }
        }
    }
    return a
}

Sort.prototype.merge=function(prim,ult,type){
    return type?
        this._mezcla(this.arr,new Array(this.arr.length),prim,ult)
        :
        this._mezclaUno(this.arr,prim,ult);
}
Sort.prototype._mezcla=function(a,b,prim,ult){
    //Complejidad 
    //nlog(n)
    let mitad;
    if(prim<ult){
        mitad=Math.floor((prim+ult)/2);
        this._mezcla(a,b,prim,mitad);
        this._mezcla(a,b,mitad+1,ult);
        this._combinar(a,b,prim,mitad,mitad+1,ult);
    }
    return a
}
Sort.prototype._mezclaUno=function(a,prim,ult){
    //Complejidad 
    //nlog(n)
    let mitad;
    if(prim<ult){
        mitad=Math.floor((prim+ult)/2);
        this._mezclaUno(a,prim,mitad);
        this._mezclaUno(a,mitad+1,ult);
        this._combinarUno(a,prim,mitad,ult);
    }
    return a
}

Sort.prototype._empujar=function(a,prim,ult,i){
    let j,k;
    k=i-prim+1;
    while(j!=k){
        j=k;
        if((2*j<=ult-prim+1) && (a[2*j+prim-1]>a[k+prim-1])){
            k=2*j;
        }
        if((2*j<ult-prim+1) && (a[2*j+prim]>a[k+prim-1])){
            k=2*j+1;
        }
        this._intercambia(a,j+prim-1,k+prim-1);
    }
    return a
}

Sort.prototype._hacerMonticulo=function(a,prim,ult){
    let i;
    for(i=Math.floor((ult-prim+1)/2);i>=1;i--){
        this._empujar(a,prim,ult,prim+i-1);
    }
    return a
}

Sort.prototype.monticulo=function(prim,ult){
    let i;
    let a=this.arr;
    this._hacerMonticulo(a,prim,ult);
    for(i=ult;i>=(prim+1);i--){
        this._intercambia(a,prim,i);
        this._empujar(a,prim,i-1,prim);
    }
    return a
}

Sort.prototype._privote=function(a,p,prim,ult){
    let i,l;
    i=prim;
    l=ult;
    while(!((a[i]>p)||(i>=ult))){
        i++;
    }
    while(!(a[l]<=p)){
        l--;
    }
    while(i<l){
        this._intercambia(a,i,l);
        while(!(a[i]>p)){
            i++;
        }
        while(!(a[l]<=p)){
            l--;
        }
    }
    this._intercambia(a,prim,l);
    return l
}
Sort.prototype.quickSort=function(prim,ult){
    //complejidad
    //peor O(n^2)
    //mejor y medio O(nlogn)
    let l;
    let a=this.arr;
    if(prim<ult){
        l=this._privote(a,a[prim],prim,ult);
        this.quickSort(a,prim,l-1);
        this.quickSort(a,l+1,ult);
    }
    return a
}

Sort.prototype.shellSort=function(prim,ult){
    let a= this.arr;
    let N=ult-prim+1;
    var increment = (N/2);
    while (increment > 0) {
        for (let i = increment; i < N; i++) {
            var j = i;
            var temp = a[i+prim];
    
            while (j >= increment && a[j-increment+prim] > temp) {
                a[j+prim] = a[j-increment+prim];
                j = j - increment;
            }
    
            a[j+prim] = temp;
        }
    
        if (increment == 2) {
            increment = 1;
        } else {
            increment = parseInt(increment*5 / 11);
        }
    }
  return a.slice(prim,ult+1);
}
// let sort=new Sort([2,45,2,5,6,3,1]);
// console.table(sort.interseccion(0,6))
// console.table(sort.seleccion(0,6));
// console.table(sort.burbuja(0,6));
// console.table(sort.merge(0,6,0));
// console.table(sort.merge(0,6,1));
// console.table(sort.monticulo(0,6));
// console.table(sort.quickSort(0,6));
// console.table(sort.shellSort(0,6))
// console.table(interseccion([2,45,2,5,6,3,1],0,6))
// console.log(posMax([2,45,2,5,6,3,1],0,6))
// console.log(posMin([2,45,2,5,6,3,1],0,6))
// console.log(intercambia([2,45,2,5,6,3,1],1,4))
// console.table(seleccion([2,45,2,5,6,3,1],0,6))
// console.table(burbuja([2,45,2,5,6,3,1],0,6))
// console.table(mezcla([2,45,2,5,6,3,1],new Array(7),0,6))
// console.table(mezclaUno([2,45,2,5,6,3,1],0,6))
// console.table(monticulo([2,45,2,5,6,3,1],0,6))
// console.table(quickSort([2,45,2,5,6,3,1],0,6))
// console.table(shellSort([2,45,2,5,6,3,1],0,6))
// if (typeof exports !== 'undefined') {
//     if (typeof module !== 'undefined' && module.exports) {
//         exports = module.exports = _;
//     }
//     exports._ = _;
// } else {
//     root['_'] = _;
// }
