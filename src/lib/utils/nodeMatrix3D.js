const _buildIndexs = (children)=>{
    const indexs = {}
    let dimension_0s = [...new Set((children||[]).map(childNode=>childNode.dimension_0))]
    dimension_0s.forEach((_dimension_0, rowIndex)=>{
        let dimension_1s = [...new Set((children||[]).filter(childNode=>childNode.dimension_0==_dimension_0).map(childNode=>childNode.dimension_1))]
        dimension_1s.forEach((_dimension_1, columnIndex)=>{
            let dimension_2s = (children||[]).filter(childNode=>childNode.dimension_0==_dimension_0 && childNode.dimension_1==_dimension_1).map(childNode=>childNode.display_order)
            dimension_2s.forEach((_dimension_2, columnRowIndex)=>{
                if(!(_dimension_0 in indexs)) indexs[_dimension_0]={}
                if(!(_dimension_1 in indexs[_dimension_0])) indexs[_dimension_0][_dimension_1]={}
                indexs[_dimension_0][_dimension_1][_dimension_2]=[rowIndex, columnIndex, columnRowIndex]
            })
        })
    })
    return indexs
}

export const getChildrenMatrixDimension = (node)=>{

    var d_1 = (node?.children_matrix_3d||[]).length;
    var d_2 = 0;
    var d_3 = 0;

    (node?.children_matrix_3d||[]).forEach((row, rowIndex)=>{
        (row||[]).forEach((column, columnIndex)=>{
            (column||[]).forEach((columnRow, columnRowIndex)=>{
                if(columnIndex+1>d_2){
                    d_2 = columnIndex+1
                }
                
                if(columnRowIndex+1>d_3){
                    d_3 = columnRowIndex+1
                }
            })
        })
    })

    if(d_3>1){
        return 3
    }else{
        if(d_2>1){
            return 2
        }else{
            if(d_1>1){
                return 1
            }else{
                return 0
            }
        }
    }

}

export function buildNode3DMatrix(node){
    
    if (!node) return
    if ((node?.children||[]).length<=0){
        node.children_matrix_3d = []
        return
    }

    const matrix = []

    const indexs = _buildIndexs(node?.children||[]);
    (node?.children||[]).forEach((childNode)=>{
        buildNode3DMatrix(childNode)
        const [rowIndex, columnIndex, columnRowIndex] = indexs[childNode.dimension_0][childNode.dimension_1][childNode.display_order]
        if(matrix[rowIndex]==undefined)matrix[rowIndex]=[]
        if(matrix[rowIndex][columnIndex]==undefined)matrix[rowIndex][columnIndex]=[]
        matrix[rowIndex][columnIndex][columnRowIndex] = childNode
    })

    node.children_matrix_3d = matrix

}

export function buildWebsite3DMatrix(website){
    for(let i=0;i<(website?.header_nodes||[]).length;i++){
        buildNode3DMatrix(website?.header_nodes[i])
    }
    for(let j=0;j<(website?.webpage_nodes||[]).length;j++){
        buildNode3DMatrix(website?.webpage_nodes[j])
    }
    for(let k=0;k<(website?.footer_nodes||[]).length;k++){
        buildNode3DMatrix(website?.footer_nodes[k])
    }
}

export function buildWebpage3DMatrix(webpage){
    buildNode3DMatrix(webpage?.webpage_node);
    for(let i=0;i<(webpage?.header_nodes||[]).length;i++){
        buildNode3DMatrix(webpage?.header_nodes[i])
    }
    for(let k=0;k<(webpage?.footer_nodes||[]).length;k++){
        buildNode3DMatrix(webpage?.footer_nodes[k])
    }
}


export function remove3DMatrixNode(matrix, rowIndex, columnIndex, columnRowIndex){

    const row = matrix[rowIndex]
    const column = matrix[rowIndex][columnIndex]

    if(column.length===1){
        if(row.length===1){
            matrix.splice(rowIndex,1)
            return [true, true]
        }else{
            row.splice(columnIndex,1)
            return [false, true]
        }
    }else{
        column.splice(columnRowIndex,1)
        return [false, false]
    }

}

export function insert3DMatrixNode(matrix, rowIndex, columnIndex, columnRowIndex, after, node){

    try{
        if(([null,undefined].includes(columnIndex) && [null,undefined].includes(columnRowIndex)) ){
            matrix.splice(rowIndex+after, 0, [[node]])
        }else if([null,undefined].includes(columnRowIndex)){
    
            if(!matrix?.[rowIndex]){
                matrix.splice(rowIndex+after, 0, [[node]])
            }else{
                const row = matrix[rowIndex]
                row.splice(columnIndex+after, 0, [node])
            }
    
           
        }else{
            // console.log(matrix)
            // console.log(rowIndex)
            // console.log(columnIndex)
    
            if(!matrix?.[rowIndex]){
                matrix.splice(rowIndex+after, 0, [[node]])
            }else if (!matrix?.[rowIndex]?.[columnIndex]){
                const row = matrix[rowIndex]
                row.splice(columnIndex+after, 0, [node])
            }else{
                const column = matrix[rowIndex][columnIndex]
                column.splice(columnRowIndex+after, 0, node)
            }
           
        }
    }catch(e){
        console.log(matrix)
        console.log(rowIndex)
        console.log(columnIndex)
        console.log(columnRowIndex)
        console.log(after)
        console.log(node)
    }
    

    // console.log(matrix)
}



function findNode(targetNode, node_uuid){

    //TODO only keep the webpage logic

    // for(let i=0;i<(targetNode?.children||[]).length;i++){
    //     if((targetNode?.children[i]?.uuid||'')===node_uuid){
    //         return [targetNode.children[i], i, null, null, targetNode ]
    //     }
    //     const _array = findNode(targetNode?.children[i], node_uuid)
    //     if(_array) return _array
    // }


    // if(targetNode.type=='webpage'){
        for(let i=0;i<(targetNode?.children||[]).length;i++){
            if((targetNode?.children[i]?.uuid||'')===node_uuid){
                return [targetNode.children[i], i, null, null, targetNode ]
            }
            const _array = findNode(targetNode?.children[i], node_uuid)
            if(_array) return _array
        }
    // }else{
    //     for(let i=0;i<(targetNode?.children_matrix_3d||[]).length;i++){
    //         for(let j=0;j<((targetNode?.children_matrix_3d[i])||[]).length;j++){
    //             for(let k=0;k<((targetNode?.children_matrix_3d[i][j])||[]).length;k++){
    //                 if((targetNode?.children_matrix_3d[i][j][k]?.uuid||'')===node_uuid){
    //                     return [targetNode.children_matrix_3d[i][j][k], i, j, k, targetNode]
    //                 }
    //                 const _array = findNode(targetNode?.children_matrix_3d[i][j][k], node_uuid)
    //                 if(_array) return _array
    //             }
    //         }  
    //     }
    // }
    
}

export function websiteFindNode(website, node_uuid){
    for(let i=0;i<(website?.header_nodes||[]).length;i++){

        if((website?.header_nodes[i]?.uuid||'')===node_uuid){
            return [ website.header_nodes[i], i, null, null, null    ]
        }
        const _array = findNode(website.header_nodes[i], node_uuid)
        if(_array) return _array

    }
    for(let j=0;j<(website?.webpage_nodes||[]).length;j++){

        if((website?.webpage_nodes[j]?.uuid||'')===node_uuid){
            return [  website.webpage_nodes[j],  j, null, null, null ]
        }
        const _array = findNode(website.webpage_nodes[j], node_uuid)
        if(_array) return _array

    }
    for(let k=0;k<(website?.footer_nodes||[]).length;k++){

        if((website?.footer_nodes[k]?.uuid||'')===node_uuid){
            return [  website.footer_nodes[k], k, null, null, null ]
        }
        const _array = findNode(website.footer_nodes[k], node_uuid)
        if(_array) return _array
    }
}



function findAndReplaceNode(targetNode, replacementNode){

    //TODO only keep the webpage logic


    // if(targetNode.type=='webpage'){

        for(let i=0;i<(targetNode?.children||[]).length;i++){
    
            if((targetNode?.children[i]?.uuid||'')===replacementNode?.uuid){
                targetNode.children[i] = replacementNode
                return true
            }

            if( findAndReplaceNode(targetNode?.children[i], replacementNode)) return true
            
            
        }

    // }else{


    //     for(let i=0;i<(targetNode?.children_matrix_3d||[]).length;i++){
    //         for(let j=0;j<((targetNode?.children_matrix_3d[i])||[]).length;j++){
    //             for(let k=0;k<((targetNode?.children_matrix_3d[i][j])||[]).length;k++){
    
    //                 if((targetNode?.children_matrix_3d[i][j][k]?.uuid||'')===replacementNode?.uuid){
    //                     targetNode.children_matrix_3d[i][j][k] = replacementNode
    //                     return true
    //                 }
    
    //                 if( findAndReplaceNode(targetNode?.children_matrix_3d[i][j][k], replacementNode)) return true
                    
                    
    //             }
    //         }  
    //     }


    // }
    
}


export function templatesFindAndReplaceNode(website, replacementNode){

    if(replacementNode?.mark_as_template){
        website.template_nodes[replacementNode?.uuid] = replacementNode
    }else if(!replacementNode?.mark_as_template && website?.template_nodes?.[replacementNode?.uuid]){
        delete website.template_nodes[replacementNode?.uuid]
    }
    for(const key of Object.keys(website?.template_nodes||{})){
        if(findAndReplaceNode(website?.template_nodes[key], replacementNode)) {
            break
        }
    };

}
export function websiteFindAndReplaceNode(website, replacementNode){

    templatesFindAndReplaceNode(website, replacementNode)
    // if(replacementNode?.mark_as_template){
    //     website.template_nodes[replacementNode?.uuid] = replacementNode
    // }else if(!replacementNode?.mark_as_template && website?.template_nodes?.[replacementNode?.uuid]){
    //     delete website.template_nodes[replacementNode?.uuid]
    // }
    // for(const key of Object.keys(website?.template_nodes||{})){

    //     if(findAndReplaceNode(website?.template_nodes[key], replacementNode)) {

    //         break
    //     }
    // };

    for(let i=0;i<(website?.header_nodes||[]).length;i++){

        if((website?.header_nodes[i]?.uuid||'')===replacementNode?.uuid){
            website.header_nodes[i] = replacementNode
            return true
        }

        if(findAndReplaceNode(website.header_nodes[i], replacementNode)) return true
    }
    for(let j=0;j<(website?.webpage_nodes||[]).length;j++){

        if((website?.webpage_nodes[j]?.uuid||'')===replacementNode?.uuid){
            website.webpage_nodes[j] = replacementNode
            return true
        }

        if(findAndReplaceNode(website.webpage_nodes[j], replacementNode)) return true
    }
    for(let k=0;k<(website?.footer_nodes||[]).length;k++){

        if((website?.footer_nodes[k]?.uuid||'')===replacementNode?.uuid){
            website.footer_nodes[k] = replacementNode
            return true
        }

        if(findAndReplaceNode(website.footer_nodes[k], replacementNode)) return true
    }
}





function findAndRemoveNode(targetNode, node_uuid){


    //TODO only keep the webpage logic

    // if(targetNode.type=='webpage'){
        for(let i=0;i<(targetNode?.children||[]).length;i++){
            if((targetNode?.children[i]?.uuid||'')===node_uuid){
                targetNode?.children?.splice(i,1)
                return true
            }
            if( findAndRemoveNode(targetNode?.children[i], node_uuid)) return true
        }
    // }else{
    //     for(let i=0;i<(targetNode?.children_matrix_3d||[]).length;i++){
    //         for(let j=0;j<((targetNode?.children_matrix_3d[i])||[]).length;j++){
    //             for(let k=0;k<((targetNode?.children_matrix_3d[i][j])||[]).length;k++){
    //                 if((targetNode?.children_matrix_3d[i][j][k]?.uuid||'')===node_uuid){
    //                     remove3DMatrixNode(targetNode?.children_matrix_3d, i, j, k)
    //                     return true
    //                 }
    //                 if( findAndRemoveNode(targetNode?.children_matrix_3d[i][j][k], node_uuid)) return true
    //             }
    //         }  
    //     }
    // }
    
}



export function websiteFindAndRemoveNode(website, node_uuid){


    for(const key of Object.keys(website?.template_nodes||{})){
        if((website?.template_nodes[key]?.uuid||'')===node_uuid){
            delete website.template_nodes[key]
            break;
        }
        if(findAndRemoveNode(website?.template_nodes[key], node_uuid)) {
            break
        }
    };


    for(let i=0;i<(website?.header_nodes||[]).length;i++){
        if((website?.header_nodes[i]?.uuid||'')===node_uuid){
            website.header_nodes?.splice(i,1)
            return true
        }
        if(findAndRemoveNode(website.header_nodes[i], node_uuid)) return true
    }
    for(let j=0;j<(website?.webpage_nodes||[]).length;j++){
        if((website?.webpage_nodes[j]?.uuid||'')===node_uuid){
            website.webpage_nodes?.splice(j,1)
            return true
        }
        if(findAndRemoveNode(website.webpage_nodes[j], node_uuid)) return true
    }
    for(let k=0;k<(website?.footer_nodes||[]).length;k++){
        if((website?.footer_nodes[k]?.uuid||'')===node_uuid){
            website.footer_nodes?.splice(k,1)
            return true
        }
        if(findAndRemoveNode(website.footer_nodes[k], node_uuid)) return true
    }
}





function findAndInsertNode(targetNode, target_node_uuid, insertNode, after){


    //TODO only keep the webpage logic


    // if(targetNode.type=='webpage'){

        for(let i=0;i<(targetNode?.children||[]).length;i++){
    
            if((targetNode?.children[i]?.uuid||'')===target_node_uuid){
                targetNode?.children?.splice(i+after, 0, insertNode)
                return true
            }

            if( findAndInsertNode(targetNode?.children[i], target_node_uuid, insertNode, after)) return true
            
            
        }

    // }else{


    //     for(let i=0;i<(targetNode?.children_matrix_3d||[]).length;i++){
    //         for(let j=0;j<((targetNode?.children_matrix_3d[i])||[]).length;j++){
    //             for(let k=0;k<((targetNode?.children_matrix_3d[i][j])||[]).length;k++){
    
    //                 if((targetNode?.children_matrix_3d[i][j][k]?.uuid||'')===target_node_uuid){
    //                     console.log(targetNode.children_matrix_3d[i][j])
    //                     targetNode.children_matrix_3d[i][j].splice(k+after, 0, insertNode)
    //                     return true
    //                 }
    
    //                 if( findAndInsertNode(targetNode?.children_matrix_3d[i][j][k], target_node_uuid, insertNode, after)) return true
                    
                    
    //             }
    //         }  
    //     }


    // }
    
}

export function websiteFindAndInsertNode(website, target_node_uuid, insertNode, after){
    for(let i=0;i<(website?.header_nodes||[]).length;i++){

        if((website?.header_nodes[i]?.uuid||'')===target_node_uuid){
            website.header_nodes.splice(i+after,0,insertNode)
            return true
        }

        if(findAndInsertNode(website.header_nodes[i], target_node_uuid, insertNode, after)) return
    }
    for(let j=0;j<(website?.webpage_nodes||[]).length;j++){

        if((website?.webpage_nodes[j]?.uuid||'')===target_node_uuid){
            website.webpage_nodes.splice(j+after,0,insertNode)
            return true
        }

        if(findAndInsertNode(website.webpage_nodes[j], target_node_uuid, insertNode, after)) return
    }
    for(let k=0;k<(website?.footer_nodes||[]).length;k++){

        if((website?.footer_nodes[k]?.uuid||'')===target_node_uuid){
            website.footer_nodes.splice(k+after,0,insertNode)
            return true
        }

        if(findAndInsertNode(website.footer_nodes[k], target_node_uuid, insertNode, after)) return
    }
}





function findAndInsertChildNode(rootNode, target_node_uuid, rowIndex, columnIndex, columnRowIndex, after, childNode){

        //TODO only keep the webpage logic
        // console.log(childNode)
        if(
            // rootNode.type=='webpage' && 
            rootNode?.uuid===target_node_uuid){
            rootNode.children?.splice(rowIndex+after, 0, childNode)
            return true
        }


        // if(rootNode?.uuid===target_node_uuid){
        //     insert3DMatrixNode(rootNode.children_matrix_3d, rowIndex, columnIndex, columnRowIndex, after, childNode)
        //     // console.log(rootNode.children_matrix_3d)
        //     return true
        // }

        // if(rootNode.type=='webpage'){

            for(let i=0;i<(rootNode?.children||[]).length;i++){
                if( findAndInsertChildNode(rootNode?.children[i], target_node_uuid, rowIndex,  null, null, after, childNode)) return true
            }
    
        // }else{

        //     for(let i=0;i<(rootNode?.children_matrix_3d||[]).length;i++){
        //         for(let j=0;j<((rootNode?.children_matrix_3d[i])||[]).length;j++){
        //             for(let k=0;k<((rootNode?.children_matrix_3d[i][j])||[]).length;k++){

        //                 if( findAndInsertChildNode(rootNode?.children_matrix_3d[i][j][k], target_node_uuid, rowIndex, columnIndex, columnRowIndex, after, childNode)) return true
                        
        //             }
        //         }  
        //     }
        // }
    
    
}

export function websiteFindAndInsertChildNode(website, websiteNode, target_node_uuid, rowIndex, columnIndex, columnRowIndex, after, childNode){
    
    if(websiteNode==='header'){
        website.header_nodes.splice(rowIndex+after,0,childNode)
        return true
    }else if(websiteNode==='webpage'){
        website.webpage_nodes.splice(rowIndex+after,0,childNode)
        return true
    }else if(websiteNode==='footer'){
        website.footer_nodes.splice(rowIndex+after,0,childNode)
        return true
    }

    for(let i=0;i<(website?.header_nodes||[]).length;i++){
        if(findAndInsertChildNode(website.header_nodes[i], target_node_uuid, rowIndex, null, null, after, childNode)) {
        
            return true
        }
    }
    for(let j=0;j<(website?.webpage_nodes||[]).length;j++){
        if(findAndInsertChildNode(website.webpage_nodes[j], target_node_uuid, rowIndex, null, null, after, childNode)) {
            // console.log(website.webpage_nodes[j])
            return true
        }
    }
    for(let k=0;k<(website?.footer_nodes||[]).length;k++){
        if(findAndInsertChildNode(website.footer_nodes[k], target_node_uuid, rowIndex, null, null, after, childNode)) return true
    }
}