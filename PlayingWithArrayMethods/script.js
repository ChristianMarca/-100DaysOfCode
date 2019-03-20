(function(){
    const {INVENTORS,PEOPLE,DATA} =require('./constants.js');
    // Array.prototype.filter()
    // 1. Filter the list of inventors for those who were born in the 1500's
    const bornIn1500= INVENTORS.filter((inventor)=>inventor.year<1600 && inventor.year>=1500);
    console.table(bornIn1500)
    // Array.prototype.map()
    // 2. Give us an array of the inventors' first and last names
    const fisrtAndLastName=INVENTORS.map((inventor)=>{return {first:inventor.first,last:inventor.last}});
    console.table(fisrtAndLastName)
    // Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest
    const sortInventors=INVENTORS.sort((a,b)=>a.year > b.year?1:-1);
    console.table(sortInventors)
    // Array.prototype.reduce()
    // 4. How many years did all the inventors live?
    const yearsOfLife= INVENTORS.reduce((valAnt,valAct)=>valAnt+(valAct.passed-valAct.year),0)
    console.log(yearsOfLife)
    // 5. Sort the inventors by years lived
    const sortByYearsLived=INVENTORS.sort((a,b)=>a.passed-a.year<b.passed-b.year?1:-1);
    console.table(sortByYearsLived)
    // 7. sort Exercise
    // Sort the people alphabetically by last name
    const sortByLastName=PEOPLE.sort((a,b)=>a.split(',')[0]>b.split(',')[0]?1:-1);
    console.table(sortByLastName);
    // 8. Reduce Exercise
    // Sum up the instances of each of these
    const sumUpInstances=DATA.reduce((valAnt,valAct)=>{
        if(!valAnt[valAct]) valAnt[valAct]=0
        valAnt[valAct]++;
        return valAnt
    },{});
    console.log(sumUpInstances)
})()