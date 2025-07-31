import {user_move_node, user_create_node } from '@/api/node.js'

// deplicated
export const containerNodeHandleDropNodeHelper = (dropItem, containerNode, actions)=>{

    const dimension_0_index = (containerNode?.children_matrix_3d||[]).length>0?(containerNode?.children_matrix_3d||[]).length-1:0
    const after = (containerNode?.children_matrix_3d||[]).length>0?1:0

    if(!dropItem?.parent_node){            //createNode
        console.log('create node')
        var _node_uuid, _name, _type, _data, _children_matrix_3d, _dimension_0_index, _dimension_1_index, _display_order_index, _after
        user_create_node(
            _node_uuid=containerNode?.uuid, 
            _name=dropItem?.node?.name, 
            _type=dropItem?.node?.type, 
            _data=dropItem?.node?.data, 
            _children_matrix_3d=dropItem?.node?.children_matrix_3d||null,
            _dimension_0_index=dimension_0_index,
            _dimension_1_index=null, 
            _display_order_index=null, 
            _after=after,
            true
        )
        .then(res=>{
            console.log(res.data)
            // actions?.globleInsertInto(res.data?.node, containerNode, dimension_0_index, null, null, after)

        })

        const sudo_node = {name:dropItem?.node?.name, type:dropItem?.node?.type, data:dropItem?.node?.data, children_matrix_3d:dropItem?.node?.children_matrix_3d||null, }
        actions?.globleInsertInto(sudo_node, containerNode, dimension_0_index, null, null, after)


    }else{                                  //moveNode
        console.log('move node')

        actions?.globleMoveInto(dropItem.node, containerNode, dimension_0_index, null, null, after)

        user_move_node(containerNode?.uuid, dropItem?.node?.uuid, dimension_0_index, null, null, after, true).then(res=>{
            console.log(res.data)
        })

    }


}

// deplicated

export const nodeGridDropNodeHelper = (dropItem, containerNode, dimension_0_index, dimension_1_index, dimension_2_index, after, actions)=>{


    if(!dropItem?.parent_node){            //createNode
        console.log('create node')
        var _node_uuid, _name, _type, _data, _children_matrix_3d, _dimension_0_index, _dimension_1_index, _display_order_index, _after
        user_create_node(
            _node_uuid=containerNode?.uuid, 
            _name=dropItem?.node?.name, 
            _type=dropItem?.node?.type, 
            _data=dropItem?.node?.data, 
            _children_matrix_3d=dropItem?.node?.children_matrix_3d||null,
            _dimension_0_index=dimension_0_index,
            _dimension_1_index=dimension_1_index, 
            _display_order_index=dimension_2_index, 
            _after=after,
            true
        )
        .then(res=>{
            console.log(res.data)

            // actions?.globleInsertInto(res.data?.node, containerNode, dimension_0_index, dimension_1_index, dimension_2_index, after)

        })

        const sudo_node = {name:dropItem?.node?.name, type:dropItem?.node?.type, data:dropItem?.node?.data, children_matrix_3d:dropItem?.node?.children_matrix_3d||null, }
        actions?.globleInsertInto(sudo_node, containerNode, dimension_0_index, dimension_1_index, dimension_2_index, after)


    }else{                                  //moveNode
        console.log('move node')

        actions?.globleMoveInto(dropItem.node, containerNode, dimension_0_index, dimension_1_index, dimension_2_index, after)

        user_move_node(containerNode?.uuid, dropItem?.node?.uuid, dimension_0_index, dimension_1_index, dimension_2_index, after, true).then(res=>{
            console.log(res.data)
        })

    }


}



export const checkDropValidHelper = (source_node, target_node, validContainerNodes, tt, tf, ft, ff)=>{
    const config = Object.keys(validContainerNodes).includes(target_node?.type)? validContainerNodes[target_node?.type] : validContainerNodes['node']

    if(  //可放入
      config?.only_accepted_children && config?.only_accepted_children?.includes(source_node?.type)|| 
      config?.except_accepted_children && !config?.except_accepted_children?.includes(source_node?.type)
    ){
      if(//可放至前後
          config?.only_accepted_siblings && config?.only_accepted_siblings?.includes(source_node?.type)|| 
          config?.except_accepted_siblings && !config?.except_accepted_siblings?.includes(source_node?.type)
      ){
         return tt();
      }else{  //不可放至前後
          return tf(); 
      }
      
    }else{ //不可放入

      if(//可放至前後
          config?.only_accepted_siblings && config?.only_accepted_siblings?.includes(source_node?.type)|| 
          config?.except_accepted_siblings && !config?.except_accepted_siblings?.includes(source_node?.type)
      ){
          return ft();
      }else{  //不可放至前後
          return ff();
      }
     
    }
}

export const nodeMenuHoverDropHelper = (ref, node, item, hierarchy, monitor, validContainerNodes, topHandler, bottomHandler, inHandler, invalidHandler)=>{

    if (!ref.current) {
        console.log('no ref')
        invalidHandler()
        return
    }


    if(node?.uuid==item?.node?.uuid) { // prevent self hovering
        console.log(' drag to it self')
        invalidHandler()
        return
      }
      if(hierarchy?.map(n=>n.uuid).includes(item?.node?.uuid)) { //  prevent move to child
        console.log('drag to decendents')
        invalidHandler()
        return 
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top


      checkDropValidHelper(item?.node, node, validContainerNodes, 
        ()=>{
            const oneThirdY= (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;
            const twoThirdY= 2 * (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;

            if(hoverClientY < oneThirdY){
                topHandler();
            }else if(twoThirdY < hoverClientY ){
                bottomHandler();
            }else{
                inHandler();
            }
        },
        ()=>{
            inHandler();
        },
        ()=>{
            const middleY= (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            if(hoverClientY < middleY){
                topHandler();
            }else{
                bottomHandler();
            }
        },
        ()=>{
            invalidHandler()
        }
      )


    //   const config = Object.keys(validContainerNodes).includes(node?.type)? validContainerNodes[node?.type] : validContainerNodes['node']

    //   if(  //可放入
    //     config?.only_accepted_children && config?.only_accepted_children?.includes(item?.node?.type)|| 
    //     config?.except_accepted_children && !config?.except_accepted_children?.includes(item?.node?.type)
    //   ){
    //     if(//可放至前後
    //         config?.only_accepted_siblings && config?.only_accepted_siblings?.includes(item?.node?.type)|| 
    //         config?.except_accepted_siblings && !config?.except_accepted_siblings?.includes(item?.node?.type)
    //     ){
    //         const oneThirdY= (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;
    //         const twoThirdY= 2 * (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;

    //         if(hoverClientY < oneThirdY){
    //             topHandler();
    //         }else if(twoThirdY < hoverClientY ){
    //             bottomHandler();
    //         }else{
    //             inHandler();
    //         }
    //     }else{  //不可放至前後
    //         inHandler();
    //     }
        
    //   }else{ //不可放入

    //     if(//可放至前後
    //         config?.only_accepted_siblings && config?.only_accepted_siblings?.includes(item?.node?.type)|| 
    //         config?.except_accepted_siblings && !config?.except_accepted_siblings?.includes(item?.node?.type)
    //     ){
    //         const middleY= (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //         if(hoverClientY < middleY){
    //             topHandler();
    //         }else{
    //             bottomHandler();
    //         }
    //     }else{  //不可放至前後
    //         console.log('不可放置前後')
    //         invalidHandler()
    //     }
       
    //   }


}