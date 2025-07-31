

// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice} from "@reduxjs/toolkit";
import { getRandomColor } from "@/lib/utils/rgba2hex"
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:null,
        themeColor:getRandomColor(),
    },
    reducers: {
        setUser(state, action){
            state.user = action.payload
        },
        setThemeColor(state, action){
            state.themeColor = action.payload
        },
       
    },
});

export const { setUser, setThemeColor } = userSlice.actions;
export default userSlice.reducer;
