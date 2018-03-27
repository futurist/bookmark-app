
function mockFunction(){  //eslint-disable-line
  var obj = function(){}
  var fn = o=>new Proxy(o, {
    get: (o,k)=>fn(o),
    set: (o,k,v)=>o,
    apply: (o, scope, args)=>o
  })
  return fn(obj)
}
// var a = mockFunction(); console.log(a.b.b=3)


export function GenerateActions(namespace='', actionList=[]){
  const ret={}
  actionList.forEach(v=>ret[v] = namespace +'.'+ v)
  return ret
}


export function arrayUnique(arr){return Array.from(new Set(arr))}

export function ensureHTTP(url){
  url = String(url).trim()
  return /^\s*https?:\/\//i.test(url)
  ? url
  : 'http://'+url
}

export function fetchURLInfo(url){
  return fetch(`https://jamesbookmark.herokuapp.com/lambda/info/run?url=${url}`)
  .then(r=>r.json())
}

export function textOverflow(str, len=10, remain='...'){
  var s = String(str)
  return s.length <= len ? s : s.slice(0,len)+ remain
}

//https://coderwall.com/p/0iz_zq/how-to-put-focus-at-the-end-of-an-input-with-react-js
export function moveCaretAtEnd(e) {
  const {target} = e||{}
  if(!target) return
  var temp_value = target.value
  target.value = ''
  target.value = temp_value
}
