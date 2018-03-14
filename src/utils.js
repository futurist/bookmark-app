
export function GenerateActions(namespace='', actionList=[]){
  const ret={}
  actionList.forEach(v=>ret[v] = namespace +'.'+ v)
  return ret
}

