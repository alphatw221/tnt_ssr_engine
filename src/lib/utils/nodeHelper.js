
const propMap = {'footer':'footer_nodes','webpage':'webpage_nodes','header':'header_nodes'}

const UNDO = 1
const REDO = 0


export const nodeDropAcceptTable = {
    'webpage':['menu_webpage','menu_section'],
    'section':['menu_section', 'menu_node'],
    'node':['menu_node'],
}

export const validContainerNodes = {
    'webpage':{
        only_accepted_children:['section'],
        only_accepted_siblings:['webpage']
    },
    'section':{
        except_accepted_children:['webpage', 'section'],
        only_accepted_siblings:['section']
    },
    'side_bar':{
        except_accepted_children:['webpage', 'section'],
        except_accepted_siblings:['webpage', 'section']
    },
    'node_box':{
        except_accepted_children:['webpage', 'section',],
        except_accepted_siblings:['webpage', 'section', ]
    },
    'dropdown_list':{
        except_accepted_children:['webpage', 'section', ],
        except_accepted_siblings:['webpage', 'section', ]
    },
    'absolute_position_node_box':{
        except_accepted_children:['webpage', 'section', ],
        except_accepted_siblings:['webpage', 'section', ]
    },
    'custom_slider':{
        except_accepted_children:['webpage', 'section', ],
        except_accepted_siblings:['webpage', 'section', ]
    },
    'node':{
        only_accepted_children:[],
        except_accepted_siblings:['webpage', 'section',]
    },
   


}



export const getNodeAfterApplyTemplate = (original_node, template_nodes, isSudoNode, hierarchy) => {
    
    if(original_node?.mark_as_template)return original_node
    if(!template_nodes?.[original_node?.template_node_uuid])return original_node
    if(template_nodes?.[original_node?.template_node_uuid]?.type != original_node?.type)return original_node
    // console.log(template_nodes?.[original_node?.template_node_uuid]);
    const template_node = template_nodes?.[original_node?.template_node_uuid]

    return {
        ...original_node,
        data:{...template_node?.data, ...original_node?.data},
        template_children:template_node?.children||[]
    }
}


export const nodeMouseEventPositionHelper = (element, event, node, topBeforeHandler, inHandler, bottomAfterHandler, leftBeforeHandler, rightAfterHandler)=>{


    if(!element)return
    const parentElement = element.parentElement;
    const parentStyles = window.getComputedStyle(parentElement);

    const rect =  element.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top;


    if(Object.keys(validContainerNodes).includes(node?.type)){   //可放入
        if(['row', 'row-reverse'].includes(parentStyles.flexDirection)){       //row
            if(x < rect.width / 4){
                return leftBeforeHandler?leftBeforeHandler():topBeforeHandler();
            }else if(x > 3 * rect.width / 4){
                return rightAfterHandler?rightAfterHandler():bottomAfterHandler();
            }else{
                return inHandler();
            }
        }else{      //column
            if(y < rect.height / 4){
                return topBeforeHandler();
            }else if(y > 3 * rect.height / 4){
                return bottomAfterHandler();
            }else{
                return inHandler();
            }
        }
    }else{  //不可放入
        if(['row', 'row-reverse'].includes(parentStyles.flexDirection)){       //row
            if(x < rect.width / 2){
                return leftBeforeHandler?leftBeforeHandler():topBeforeHandler();
            }else{
                return rightAfterHandler?rightAfterHandler():bottomAfterHandler();
            }
        }else{      //column
            if(y < rect.height / 2){
                return topBeforeHandler();
            }else{
                return bottomAfterHandler();
            }
        }
    }
}



export const menuNodeMouseEventPositionHelper = (element, event, node, topBeforeHandler, inHandler, bottomAfterHandler)=>{


    if(!element)return

    const rect =  element.getBoundingClientRect()
    const y = event.clientY - rect.top;

    if(Object.keys(validContainerNodes).includes(node?.type)){   //可放入
        if(y < rect.height / 4){
            return topBeforeHandler();
        }else if(y > 3 * rect.height / 4){
            return bottomAfterHandler();
        }else{
            return inHandler();
        }
    }else{  //不可放入
        if(y < rect.height / 2){
            return topBeforeHandler();
        }else{
            return bottomAfterHandler();
        }
    }
}