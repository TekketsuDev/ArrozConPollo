 const array1 = [
    ['1', {id:'1', text: "Todo item #1", date: '2021-11-30'}],
    ['2', {id:'2', text: "Todo item #2", date: '2021-12-12'}],
    ['3', {id:'3', text: "Todo item #3", date: '2021-11-29'}],
    ['4', {id:'4', text: "Todo item #4", date: '2021-12-03'}]
];
const newMap = new Map()

array1.forEach(el => newMap.set(el[1], el[0]))



// 1: {…}, 2: {…}, 3: {…}, 4: {…}
newMap.forEach((key, value) => console.log(key, value));

let typeoftile = []; 

let map1 = new Map();
function setMap(map, cell){


    
    return map;
}
function IterateByID(map){

}

map1 = setMap;
map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1.keys();

console.table(map1);
//console.log(iterator1.next().value);
// Expected output: "0"

//console.log(iterator1.next().value);
// Expected output: 1
