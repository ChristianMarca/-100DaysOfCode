function interseccion (a,prim,ult){
    //Complejidad 
    //mejor 14n-11
    //peor 9/2n^2+13/2n-10
    //media 9/2n^2+47/4n-11
    let i,j,x;
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

function posMax(a,i,j){
    let pmax,k;
    pmax=i;
    for(k=i+1;k<=j;k++){
        if(a[k]>a[pmax]){
            pmax=k;
        }
    }
    return pmax
}

function posMin(a,i,j){
    let pmin,k;
    pmin=i;
    for(k=i+1;k<=j;k++){
        if(a[k]<a[pmin]){
            pmin=k;
        }
    }
    return pmin
}

function intercambia(a,i,j){
    let temp;
    temp=a[i];
    a[i]=a[j];
    a[j]=temp;

    return a
}

function seleccion(a,prim,ult){
    //Complejidad 
    //mejor 3n^2+14n-14
    //peor 7/2n^2+27/2n-14
    //media 13/4n^2+55/4n-14
    let i;
    for(i=prim;i<=ult-1;i++){
        intercambia(a,i,posMin(a,i,ult))
    }
    return a
}

function burbuja(a,prim,ult){
    //Complejidad 
    //mejor 7/2n^2+5/2n-3
    //peor 8n^2-2n-1
    //media 23/4n^2+1/4n-1
    let i,j;
    for(i=prim; i<=ult-1;i++){
        for(j=ult; j>=i+1;j--){
            if(a[j-1]>a[j]){
                console.log(a)
                intercambia(a,j-1,j);
            }
        }
    }
    return a
}

function combinarUno(a,p,q,r) {
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
function combinar(a,b,p1,u1,p2,u2){
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

function mezcla(a,b,prim,ult){
    //Complejidad 
    //nlog(n)
    let mitad;
    if(prim<ult){
        mitad=Math.floor((prim+ult)/2);
        mezcla(a,b,prim,mitad);
        mezcla(a,b,mitad+1,ult);
        combinar(a,b,prim,mitad,mitad+1,ult);
    }
    return a
}
function mezclaUno(a,prim,ult){
    //Complejidad 
    //nlog(n)
    let mitad;
    if(prim<ult){
        mitad=Math.floor((prim+ult)/2);
        mezclaUno(a,prim,mitad);
        mezclaUno(a,mitad+1,ult);
        combinarUno(a,prim,mitad,ult);
    }
    return a
}

function empujar(a,prim,ult,i){
    let j,k;
    k=i-prim+1;
    while(j!=k){
        console.log('int..',a)
        j=k;
        if((2*j<=ult-prim+1) && (a[2*j+prim-1]>a[k+prim-1])){
            k=2*j;
        }
        if((2*j<ult-prim+1) && (a[2*j+prim]>a[k+prim-1])){
            k=2*j+1;
        }
        intercambia(a,j+prim-1,k+prim-1);
    }
    return a
}

function hacerMonticulo(a,prim,ult){
    let i;
    for(i=Math.floor((ult-prim+1)/2);i>=1;i--){
        empujar(a,prim,ult,prim+i-1);
    }
    return a
}

function monticulo(a,prim,ult){
    let i;
    hacerMonticulo(a,prim,ult);
    for(i=ult;i>=(prim+1);i--){
        intercambia(a,prim,i);
        empujar(a,prim,i-1,prim);
    }
    return a
}

function privote(a,p,prim,ult){
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
        intercambia(a,i,l);
        while(!(a[i]>p)){
            i++;
        }
        while(!(a[l]<=p)){
            l--;
        }
    }
    intercambia(a,prim,l);
    return l
}
function quickSort(a,prim,ult){
    //complejidad
    //peor O(n^2)
    //mejor y medio O(nlogn)
    let l;
    if(prim<ult){
        l=privote(a,a[prim],prim,ult);
        quickSort(a,prim,l-1);
        quickSort(a,l+1,ult);
    }
    return a
}

// function shellSort(a,prim,ult){
//     let j,h,N,v;
//     N=(ult-prim+1);
//     h=1;
//     while(!(h>N)){
//         h=3*h+1;
//     }
//     console.log(h,'sad')
//     do{
//         h=Math.floor(h/3);
//         for(let i=h;i<N;i++){
//             v=a[i+prim];
//             j=i;
//             while((j>=h)&&(a[j-h+prim]>v)){
//                 a[j+prim]=a[j-h+prim];
//                 console.log(j,h)
//                 j=j-h;
//                 console.log(j)
//                 console.log(a,'nnn')
//                 // h--;
//             }
//             a[j+prim]=v;
//         }
//         console.log(a,h,'++')
//     }while(!(h=1))
//     return a
// }
function shellSort(a,prim,ult){
    let N=ult-prim+1;
    var increment = (N/2);
    while (increment > 0) {
        for (let i = increment; i < N; i++) {
            console.log('incr',i)
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
  return a;
}
// console.table(interseccion([2,45,2,5,6,3,1],0,6))
// console.log(posMax([2,45,2,5,6,3,1],0,6))
// console.log(posMin([2,45,2,5,6,3,1],0,6))
// console.log(intercambia([2,45,2,5,6,3,1],1,4))
// console.table(seleccion([2,45,2,5,6,3,1],0,6))
// console.table(burbuja([2,45,2,5,6,3,1],0,6))
// console.table(mezcla([2,45,2,5,6,3,1],new Array(7),0,6))
// console.table(mezclaUno([2,45,2,5,6,3,1],0,6))
// console.table(monticulo([2,45,2,5,6,3,1],0,6))
console.table(quickSort([2,45,2,5,6,3,1],0,6))
console.table(shellSort([2,45,2,5,6,3,1],0,6))