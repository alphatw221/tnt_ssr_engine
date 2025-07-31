// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice} from "@reduxjs/toolkit";


const EditorMemorySlice = createSlice({
    name: 'editor_memory',
    initialState: {
        
        socket_id:null,
        cursor:null,//{type:'', data:{}, position:''}
        cursorDirection:null,
        clipBoard:null,
        rects:{},

        collaboratorCursors:{},

        sideMenuActive:false,


        showElementOutline:false,

        websiteCollaborators:[],
        

        selectedTool:null,
        showComponentSettings:false,
    },
    reducers: {
        updateRects(state, action){
            state.rects[action.payload.uuid] = action.payload.rect
            return state
        },
        setSocketId(state, action){
            return {...state, socket_id:action.payload}
        },
        setCollaboratorCursors(state, action) {
            return {...state, collaboratorCursors:action.payload}
        },
        updateCollaboratorCursor(state, action){
            if(action.payload?.socket_id && action.payload.node_uuid && action.payload.themeColor){
                state.collaboratorCursors[action.payload?.socket_id] = action.payload.node_uuid
            }
            return state
        },
        removeCollaboratorCursor(state, action){
            if(action.payload?.socket_id){
                delete state.collaboratorCursors[action.payload?.socket_id]
            }
            return state
        }
        ,
        setCursor(state, action) {
            return {...state, cursor:action.payload}
        },
        setCursorDirection(state, action) {
            console.log(action.payload)
            return {...state, cursorDirection:action.payload}
        },
        setClipBoard(state, action) {
            return {...state, clipBoard:action.payload}
        },
        copyToClipBoard(state, action) {
            return {...state, clipBoard:{type:state?.cursor?.type||null, instance:state?.cursor?.instance||null}}
        },
        //------------------------------------
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
        setSideMenuActive(state, action) {
            return {...state, sideMenuActive:action.payload}
        },


        setSelectedTool(state, action) {
            return {...state, selectedTool:action.payload}
        },
        setShowComponentSettings(state, action) {
            return {...state, showComponentSettings:action.payload}
        },
    },
});

export const { 
    updateRects,
    setSocketId,
    setCollaboratorCursors,
    updateCollaboratorCursor,
    removeCollaboratorCursor,
    setCursor,
    setCursorDirection,
    setClipBoard,
    copyToClipBoard,

    setWebsiteCollaborators,
    websiteCollaboratorLeft,
    websiteCollaboratorJoin,
    websiteCollaboratorStateUpdate,
    
    setSideMenuActive,

    setSelectedTool,
    setShowComponentSettings,
    
} = EditorMemorySlice.actions;

export default EditorMemorySlice.reducer;
