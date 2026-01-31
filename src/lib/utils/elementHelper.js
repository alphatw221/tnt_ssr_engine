






function findElement(currentElement, target_parent_relation_uuid){


    for(let i=0;i<(currentElement?.children||[]).length;i++){
        if((currentElement?.children[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
            return currentElement.children[i]
        }
        return findElement(currentElement?.children[i], target_parent_relation_uuid)

    }
    
}

export function websiteFindElement(website, target_parent_relation_uuid){
    for(let k=0;k<(website?.webpages||[]).length;k++){
        const webpage = website?.webpages[k]
        for(let i=0;i<(webpage?.head_elements||[]).length;i++){

            if((webpage?.head_elements[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                return webpage.head_elements[i]
            }
            return findElement(webpage.head_elements[i], target_parent_relation_uuid)


        }
        for(let j=0;j<(webpage?.body_elements||[]).length;j++){

            if((webpage?.body_elements[j]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                return webpage.body_elements[j]
            }
            return findElement(webpage.body_elements[j], target_parent_relation_uuid)


        }
    }

}







function findAndReplaceElement(currentElement, element_uuid, replacementElement){

    for(let i=0;i<(currentElement?.children||[]).length;i++){

        if((currentElement?.children[i]?.uuid||'')===element_uuid){
            currentElement.children[i] = {...replacementElement, children: currentElement.children[i]?.children||[]}
        }else{
            findAndReplaceElement(currentElement?.children[i], element_uuid, replacementElement)
        }
    }
    
}



export function websiteFindAndReplaceElement(website, element_uuid, replacementElement){


    for(let k=0;k<(website?.webpages||[]).length;k++){
        const webpage = website?.webpages[k]
        for(let i=0;i<(webpage?.head_elements||[]).length;i++){

            if((webpage?.head_elements[i]?.uuid||'')===element_uuid){
                webpage.head_elements[i] = {...replacementElement, children:webpage.head_elements[i]?.children||[]}
            }
            else{
                findAndReplaceElement(webpage.head_elements[i], element_uuid, replacementElement)
            }
        }
        for(let j=0;j<(webpage?.body_elements||[]).length;j++){

            if((webpage?.body_elements[j]?.uuid||'')===element_uuid){
                webpage.body_elements[j] = {...replacementElement, children:webpage.body_elements[j]?.children||[]}
            }else{
                findAndReplaceElement(webpage.body_elements[j], element_uuid, replacementElement)
            }

        }
    }
}





function findAndRemoveElement(currentElement, element_uuid){


    for(let i=0;i<(currentElement?.children||[]).length;i++){
        if((currentElement?.children[i]?.uuid||'')===element_uuid){
            currentElement?.children?.splice(i,1)
        }
        else{
            findAndRemoveElement(currentElement?.children[i], element_uuid)
        }
    }
    
}



export function websiteFindAndRemoveElement(website, element_uuid){
    //全部target element都會被刪除 
    for(let k=0;k<(website?.webpages||[]).length;k++){
        const webpage = website?.webpages[k]
        for(let i=0;i<(webpage?.head_elements||[]).length;i++){
            if((webpage?.head_elements[i]?.uuid||'')===element_uuid){
                webpage.head_elements?.splice(i,1)
            }else{
                findAndRemoveElement(webpage.head_elements[i], element_uuid)
            }
        }
        for(let j=0;j<(webpage?.body_elements||[]).length;j++){
            if((webpage?.body_elements[j]?.uuid||'')===element_uuid){
                webpage.body_elements?.splice(j,1)
            }else{
                findAndRemoveElement(webpage.body_elements[j], element_uuid)
            }
        }
    }
}




function findAndRemoveElementRelation(currentElement, target_parent_relation_uuid){


    for(let i=0;i<(currentElement?.children||[]).length;i++){
        if((currentElement?.children[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
            currentElement?.children?.splice(i,1)
        }else{
            findAndRemoveElementRelation(currentElement?.children[i], target_parent_relation_uuid)
        }
    }
    
}



export function websiteFindAndRemoveElementRelation(website, target_parent_relation_uuid){
    for(let k=0;k<(website?.webpages||[]).length;k++){
        const webpage = website?.webpages[k]
        for(let i=0;i<(webpage?.head_elements||[]).length;i++){
            if((webpage?.head_elements[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                webpage.head_elements?.splice(i,1)
            }else{
                findAndRemoveElementRelation(webpage.head_elements[i], target_parent_relation_uuid)
            }
        }
        for(let j=0;j<(webpage?.body_elements||[]).length;j++){
            if((webpage?.body_elements[j]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                webpage.body_elements?.splice(j,1)
            }else{
                findAndRemoveElementRelation(webpage.body_elements[j], target_parent_relation_uuid)
            }
        }
    }
}




function findAndInsertElement(currentElement, target_parent_relation_uuid, insertElement, after){

    for(let i=0;i<(currentElement?.children||[]).length;i++){

        if((currentElement?.children[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
            currentElement?.children?.splice(i+after, 0, insertElement)
        }else{
            findAndInsertElement(currentElement?.children[i], target_parent_relation_uuid, insertElement, after)
        }        
        
    }
    
}

export function websiteFindAndInsertElement(website, target_parent_relation_uuid, insertElement, after){
    for(let k=0;k<(website?.webpages||[]).length;k++){
        const webpage = website?.webpages[k]
        for(let i=0;i<(webpage?.head_elements||[]).length;i++){

            if((webpage?.head_elements[i]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                webpage.head_elements.splice(i+after,0, insertElement)
            }else{
                findAndInsertElement(webpage.head_elements[i], target_parent_relation_uuid, insertElement, after)
            }
        }
        for(let j=0;j<(webpage?.body_elements||[]).length;j++){

            if((webpage?.body_elements[j]?.parent_relation_uuid||'')===target_parent_relation_uuid){
                webpage.body_elements.splice(j+after,0, insertElement)
            }else{
                findAndInsertElement(webpage.body_elements[j], target_parent_relation_uuid, insertElement, after)
            }
        }
    }
}





function findAndInsertChildElement(currentElement, target_parent_relation_uuid, sequence, after, childElement){

        if(currentElement?.parent_relation_uuid===target_parent_relation_uuid){
            if(sequence === -1){
                currentElement.children?.push(childElement)
            }else{
                currentElement.children?.splice(sequence+after, 0, childElement)
            }
        }else{
            for(let i=0;i<(currentElement?.children||[]).length;i++){
                findAndInsertChildElement(currentElement?.children[i], target_parent_relation_uuid, sequence, after, childElement)
            }
        }
       
    
}

export function websiteFindAndInsertChildElement(website, target_parent_relation_uuid, sequence, after, childElement){
    for(let k=0;k<(website?.webpages||[]).length;k++){
        const webpage = website?.webpages[k]
        for(let i=0;i<(webpage?.head_elements||[]).length;i++){
            findAndInsertChildElement(webpage.head_elements[i], target_parent_relation_uuid, sequence, after, childElement)
        }
        for(let j=0;j<(webpage?.body_elements||[]).length;j++){
            findAndInsertChildElement(webpage.body_elements[j], target_parent_relation_uuid, sequence, after, childElement)
        }
    }
}

