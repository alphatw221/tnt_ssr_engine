export function element2json(el){
    const data = {}
    if([null, undefined, ''].includes(el)) return data
    for(var i = 0; i < el.childElementCount; i++){
      const child = el.children[i]
      // console.log(child)
      if(child.getAttribute('data_type')==='object'){
        if(child.innerHTML=='None'){
          data[child.getAttribute('name')] = null
        }else{
          data[child.getAttribute('name')]=element2json(child)
        }
      }else if(child.getAttribute('data_type')==='array'){
        const array = []
        for(var j = 0; j < child.childElementCount; j++){
          const item = child.children[j]
          // console.log(item)
          array.push(element2json(item))
        }
        data[child.getAttribute('name')]=array
      }
      else if(child.getAttribute('data_type')==='string_array'){

        const array = []
        for(var j = 0; j < child.childElementCount; j++){
          const item = child.children[j]
          array.push(item.innerHTML)
        }
        data[child.getAttribute('name')]=array
      }
      else if(child.getAttribute('data_type')==='string'){
        if(child.innerHTML=='None'){
          data[child.getAttribute('name')] = null
        }else{
          data[child.getAttribute('name')]=child.innerHTML
        }
      }else if(child.getAttribute('data_type')==='integer'){
        
        if(child.innerHTML=='None'){
          data[child.getAttribute('name')] = null
        }else{
          data[child.getAttribute('name')]=parseInt(child.innerHTML)
        }

      }else if(child.getAttribute('data_type')==='float'){

        if(child.innerHTML=='None'){
          data[child.getAttribute('name')] = null
        }else{
          data[child.getAttribute('name')]=parseFloat(child.innerHTML)
        }

      }else if(child.getAttribute('data_type')==='date'){

        if(child.innerHTML=='None'){
          data[child.getAttribute('name')] = null
        }else{
          data[child.getAttribute('name')]=Date.parse(child.innerHTML)
        }

      }else if(child.getAttribute('data_type')==='bool'){

        if(child.innerHTML=='None'){
          data[child.getAttribute('name')] = null
        }else{
          data[child.getAttribute('name')]=(child.innerHTML=='True')
        }

      }
    }
    return data
}

