// “Write a program that prints the numbers from 1 to 100. But for 
// multiples of three print ‘Fizz’ instead of the number and for the 
// multiples of five print ‘Buzz’. For numbers which are multiples of 
// both three and five print ‘FizzBuzz’.”
(function(N){
    'use strict'
    let arrayOnToOneHundred=Array.apply(null, {length: N});
    
    arrayOnToOneHundred.map((item,index) => {
        let string="";
        let element=index+1;
        if(!(element%3))string=string+"Fizz";
        if(!(element%5))string=string+"Buzz";
        string?console.log(string):console.log(element);
    },this);

})(100);
