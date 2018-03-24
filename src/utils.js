
export function GenerateActions(namespace='', actionList=[]){
  const ret={}
  actionList.forEach(v=>ret[v] = namespace +'.'+ v)
  return ret
}


export function arrayUnique(arr){return Array.from(new Set(arr))}

export function ensureHTTP(url){
  url = String(url).trim()
  return /^https?:\/\//i.test(url)
  ? url
  : 'http://'+url
}

export function fetchURLInfo(url){
  return fetch(`https://jamesbookmark.herokuapp.com/lambda/info/run?url=${url}`)
  .then(r=>r.json())
}

