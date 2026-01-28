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

        // Edit Events
        editEvents: [],
        editEventsLoading: false,
        editEventsHasMore: true,
        editEventsNextCursor: null,
        editEventsError: null,

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

        // Edit Events Actions
        addNewEditEvent(state, action) {
            // 添加新事件到列表頂部，並檢查是否已存在
            const exists = state.editEvents.some(e => e.id === action.payload.id);
            if (!exists) {
                state.editEvents = [action.payload, ...state.editEvents];
            }
        },
        setEditEvents(state, action) {
            state.editEvents = action.payload;
        },
        appendEditEvents(state, action) {
            // 追加事件並去重
            const existingUuids = new Set(state.editEvents.map(e => e.uuid));
            const newEvents = (action.payload||[])?.filter(e => !existingUuids.has(e.uuid));
            state.editEvents = [...state.editEvents, ...newEvents];
        },
        setEditEventsLoading(state, action) {
            state.editEventsLoading = action.payload;
        },
        setEditEventsHasMore(state, action) {
            state.editEventsHasMore = action.payload;
        },
        setEditEventsNextCursor(state, action) {
            state.editEventsNextCursor = action.payload;
        },
        setEditEventsError(state, action) {
            state.editEventsError = action.payload;
        },
        clearEditEvents(state) {
            state.editEvents = [];
            state.editEventsNextCursor = null;
            state.editEventsHasMore = true;
            state.editEventsError = null;
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

    // Edit Events exports
    addNewEditEvent,
    setEditEvents,
    appendEditEvents,
    setEditEventsLoading,
    setEditEventsHasMore,
    setEditEventsNextCursor,
    setEditEventsError,
    clearEditEvents,

    setSelectedTool,
    setShowComponentSettings,

} = EditorMemorySlice.actions;

export default EditorMemorySlice.reducer;
