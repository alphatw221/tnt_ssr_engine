






function findElement(currentElement, target_parent_relation_uuid){


    for(let i=0;i<(currentElement?.children||[]).length;i++){
        if((currentElement?.children[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
            return [currentElement.children[i], i, null, null, currentElement ]
        }
        const _array = findElement(currentElement?.children[i], target_parent_relation_uuid)
        if(_array) return _array
    }
    
}

export function websiteFindElement(website, target_parent_relation_uuid){
    for(let k=0;k<(website?.webpages||[]).length;k++){
        const webpage = website?.webpages[k]
        for(let i=0;i<(webpage?.head_elements||[]).length;i++){

            if((webpage?.head_elements[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                return [ webpage.head_elements[i], i, null, null, null    ]
            }
            const _array = findElement(webpage.head_elements[i], target_parent_relation_uuid)
            if(_array) return _array

        }
        for(let j=0;j<(webpage?.body_elements||[]).length;j++){

            if((webpage?.body_elements[j]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                return [  webpage.body_elements[j],  j, null, null, null ]
            }
            const _array = findElement(webpage.body_elements[j], target_parent_relation_uuid)
            if(_array) return _array

        }
    }

}



function findAndReplaceElement(currentElement, replacementElement){

    for(let i=0;i<(currentElement?.children||[]).length;i++){

        if((currentElement?.children[i]?.parent_relation_uuid||'')===replacementElement?.parent_relation_uuid){
            currentElement.children[i] = replacementElement
            return true
        }

        if( findAndReplaceElement(currentElement?.children[i], replacementElement)) return true
    }
    
}



export function websiteFindAndReplaceElement(website, replacementElement){


    for(let k=0;k<(website?.webpages||[]).length;k++){
        const webpage = website?.webpages[k]
        for(let i=0;i<(webpage?.head_elements||[]).length;i++){

            if((webpage?.head_elements[i]?.parent_relation_uuid||'')===replacementElement?.parent_relation_uuid){
                webpage.head_elements[i] = replacementElement
                return true
            }

            if(findAndReplaceElement(webpage.head_elements[i], replacementElement)) return true
        }
        for(let j=0;j<(webpage?.body_elements||[]).length;j++){

            if((webpage?.body_elements[j]?.parent_relation_uuid||'')===replacementElement?.parent_relation_uuid){
                webpage.body_elements[j] = replacementElement
                return true
            }

            if(findAndReplaceElement(webpage.body_elements[j], replacementElement)) return true
        }
    }
}





function findAndRemoveElement(currentElement, target_parent_relation_uuid){


    for(let i=0;i<(currentElement?.children||[]).length;i++){
        if((currentElement?.children[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
            currentElement?.children?.splice(i,1)
            return true
        }
        if( findAndRemoveElement(currentElement?.children[i], target_parent_relation_uuid)) return true
    }
    
}



export function websiteFindAndRemoveElement(website, target_parent_relation_uuid){
    for(let k=0;k<(website?.webpages||[]).length;k++){
        const webpage = website?.webpages[k]
        for(let i=0;i<(webpage?.head_elements||[]).length;i++){
            if((webpage?.head_elements[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                webpage.head_elements?.splice(i,1)
                return true
            }
            if(findAndRemoveElement(webpage.head_elements[i], target_parent_relation_uuid)) return true
        }
        for(let j=0;j<(webpage?.body_elements||[]).length;j++){
            if((webpage?.body_elements[j]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                webpage.body_elements?.splice(j,1)
                return true
            }
            if(findAndRemoveElement(webpage.body_elements[j], target_parent_relation_uuid)) return true
        }
    }
}





function findAndInsertElement(currentElement, target_parent_relation_uuid, insertElement, after){

    for(let i=0;i<(currentElement?.children||[]).length;i++){

        if((currentElement?.children[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
            currentElement?.children?.splice(i+after, 0, insertElement)
            return true
        }

        if( findAndInsertElement(currentElement?.children[i], target_parent_relation_uuid, insertElement, after)) return true
        
        
    }
    
}

export function websiteFindAndInsertElement(website, target_parent_relation_uuid, insertElement, after){
    for(let k=0;k<(website?.webpages||[]).length;k++){
        const webpage = website?.webpages[k]
        for(let i=0;i<(webpage?.head_elements||[]).length;i++){

            if((webpage?.head_elements[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                webpage.head_elements.splice(i+after,0, insertElement)
                return true
            }
            if(findAndInsertElement(webpage.head_elements[i], target_parent_relation_uuid, insertElement, after)) return
        }
        for(let j=0;j<(webpage?.body_elements||[]).length;j++){

            if((webpage?.body_elements[j]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                webpage.body_elements.splice(j+after,0, insertElement)
                return true
            }
            if(findAndInsertElement(webpage.body_elements[j], target_parent_relation_uuid, insertElement, after)) return
        }
    }
}





function findAndInsertChildElement(currentElement, target_parent_relation_uuid, sequence, after, childElement){

        if(currentElement?.parent_relation_uuid===target_parent_relation_uuid){
            currentElement.children?.splice(sequence+after, 0, childElement)
            return true
        }
        for(let i=0;i<(currentElement?.children||[]).length;i++){
            if( findAndInsertChildElement(currentElement?.children[i], target_parent_relation_uuid, sequence, after, childElement)) return true
        }
    
}

export function websiteFindAndInsertChildElement(website, target_parent_relation_uuid, sequence, after, childElement){
    for(let k=0;k<(website?.webpages||[]).length;k++){
        const webpage = website?.webpages[k]
        for(let i=0;i<(webpage?.head_elements||[]).length;i++){
            if(findAndInsertChildElement(webpage.head_elements[i], target_parent_relation_uuid, sequence, after, childElement)) {
                return true
            }
        }
        for(let j=0;j<(webpage?.body_elements||[]).length;j++){
            if(findAndInsertChildElement(webpage.body_elements[j], target_parent_relation_uuid, sequence, after, childElement)) {
                return true
            }
        }
    }
}