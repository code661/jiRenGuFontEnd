const a = 1

console.log(a)
console.log('hello')

function sum({x,y}={x:0,x:0},{a=1,b=1}){
  return [x+a,y+b]
}

console.log(sum({x:1,y:2},{a:3}))
