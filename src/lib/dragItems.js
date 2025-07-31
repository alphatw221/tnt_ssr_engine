export const dragItems = {
    textTemplate:{
        key:'text_template',
        type:'component_template',
        accept:[]
    },
    paddingTemplate:{
        key:'padding_template',
        type:'component_template',
        accept:[]
    },
    imageTemplate:{
        key:'image_template',
        type:'component_template',
        accept:[]
    },
    fragment:{
        key:'fragment',
        type:'fragment',
        accept:['component_template']
    },
    textComponent:{
        key:'text_component',
        type:'component',
        accept:[]
    },
    paddingComponent:{
        key:'padding_component',
        type:'component',
        accept:[]
    },
    imageComponent:{
        key:'image_component',
        type:'component',
        accept:[]
    }
}

export const dragItemTypes = {
    SIDE_MENU:'side_menu',
    COMPONENT_TEMPLATE:'component_template',
    COMPONENT:'component',
    
    PAGE:'page',
    FRAGMENT:'fragment',

    WEBPAGE:'webpage',
    SECTION:'section',
    NODE:'node',
    NODE_TEMPLATE:'node_template'

    
}



export const nodeCompatibility = {
    'webpage':[dragItemTypes.SECTION],
    'section':[dragItemTypes.NODE],
    'node':[dragItemTypes.NODE],
}