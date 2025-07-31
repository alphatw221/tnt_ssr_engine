// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice} from "@reduxjs/toolkit";


const websiteEditorSlice = createSlice({
    name: 'website_editor',
    initialState: {
        


        sideMenuActive:false,
        websiteCollaborators:[],

    },
    reducers: {
        setWebsiteCollaborators(state, action){
            return {...state, websiteCollaborators:action.payload}
        },
        websiteCollaboratorLeft(state, action){

            const collaborator = state.websiteCollaborators.find(_collaborator=>action.payload.socket_id==_collaborator.socket_id)

            let ele = document.getElementById(`node_${collaborator?.cursor}`)
            if(ele){
                ele?.classList?.remove('collaborator-cursor-hover')
                ele.style.outlineColor = 'transparent';
            }
            


            return { ...state, websiteCollaborators:state.websiteCollaborators.filter(_collaborator=>_collaborator.socket_id!==action.payload.socket_id)}    
        },
        websiteCollaboratorJoin(state, action){
            return { ...state, websiteCollaborators:[...state.websiteCollaborators.filter(_collaborator=>_collaborator.socket_id!==action.payload.socket_id), action.payload]}    
        },
        websiteCollaboratorStateUpdate(state, action){

            const collaborator = state.websiteCollaborators.find(_collaborator=>action.payload.socket_id==_collaborator.socket_id)

            let ele = document.getElementById(`node_${collaborator?.cursor}`)
            if(ele){
                ele?.classList?.remove('collaborator-cursor-hover')
                ele.style.outlineColor = 'transparent';
            }

            ele = document.getElementById(`node_${action?.payload?.cursor}`)
            if(ele){
                ele?.classList?.add('collaborator-cursor-hover')
                ele.style.outlineColor = action?.payload?.themeColor
            }
            

            return { ...state, websiteCollaborators:[...state.websiteCollaborators.filter(_collaborator=>_collaborator.socket_id!==action.payload.socket_id), action.payload]}    
        },
        //----------
        setWebsiteEditorSlice(state, action) {
            return {...state, ...action.payload}
        },
        setSideMenuActive(state, action) {
            return {...state, sideMenuActive:action.payload}
        },



    },
});

export const { 
    setWebsiteCollaborators,
    websiteCollaboratorLeft,
    websiteCollaboratorJoin,
    websiteCollaboratorStateUpdate,
    
    setWebsiteEditorSlice, 
    setSideMenuActive, 


} = websiteEditorSlice.actions;

export default websiteEditorSlice.reducer;
