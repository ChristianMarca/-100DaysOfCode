'use strict'
module.exports= class TablaHash{
    constructor(){
        this.tamano=1000;
        this.ranuras=new Array(this.tamano);
        this.datos=new Array(this.tamano);
    }

    hashCode(valueToHash=this.value) {
        if(typeof(valueToHash)=='number'){
            return valueToHash
        }
        var hash = 0, i, chr;
        if (valueToHash.length === 0) return hash;
        for (i = 0; i < valueToHash.length; i++) {
          chr   = valueToHash.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
      };

    agregar(clave,dato) {
        let proximaRanura=null;
        let valorHash=this.functionHash(clave,this.ranuras.length);
        if(this.ranuras[valorHash]==null){
            this.ranuras[valorHash]=clave;
            this.datos[valorHash]=dato;
        }else{
            if (this.ranuras[valorHash] == clave)
                this.datos[valorHash] = dato //reemplazo
            else{
                proximaRanura = this.rehash(valorHash,len(this.ranuras))
                while (this.ranuras[proximaRanura] != null &&
                                this.ranuras[proximaRanura] != clave){
                    proximaRanura = this.rehash(proximaRanura,this.ranuras.length)
                }
                if (this.ranuras[proximaRanura] == null){
                    this.ranuras[proximaRanura]=clave
                    this.datos[proximaRanura]=dato
                }
                else this.datos[proximaRanura] = dato //reemplazo

            }

        }
    }

    functionHash(clave,tamano){
        return clave/tamano
    }

    rehash(hashViejo,tamano){
        return (hashViejo+1)%tamano
    }

    obtener(clave){
        let dato = null;
        let parar = false;
        let encontrado = false;
        let ranuraInicio = this.functionHash(clave,this.ranuras.length)
        let posicion = ranuraInicio;

        while (this.ranuras[posicion] != null && 
                            !encontrado && !parar){
            if (this.ranuras[posicion] == clave){
                encontrado = true;
                dato = this.datos[posicion]
            }
            else{
                posicion=this.rehash(posicion,len(this.ranuras))
                if (posicion == ranuraInicio)
                    parar = true;
            }
        }
        return dato
    }
    existe(clave){
        let dato = null;
        let parar = false;
        let encontrado = false;
        let ranuraInicio = this.functionHash(clave,this.ranuras.length);

        let posicion = ranuraInicio;

        while(this.ranuras[posicion] != null &&  
                            !encontrado && !parar){
            if (this.ranuras[posicion] == clave){
                encontrado = true
                dato = this.datos[posicion];
            }
            else{
                posicion=this.rehash(posicion,len(this.ranuras))
                if (posicion == ranuraInicio){
                    parar = true
                }
            }
        }
        return encontrado
    }
    __getItem__(clave){
        return this.obtener(clave)
    }

    __setItem__(clave,dato){
        return this.agregar(clave,dato)
    }
}