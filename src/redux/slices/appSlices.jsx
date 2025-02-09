import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    loading: false
}

export const appSlices = createSlice({
    name: "app",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})



export const { } = appSlices.actions

export default appSlices.reducer