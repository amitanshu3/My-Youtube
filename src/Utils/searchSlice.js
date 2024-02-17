/*import { createSlice } from "@reduxjs/toolkit";

const serachSlice=createSlice({
    name:"serach",
    initialState:{

    },
    reducers:{
  cacheResults:(state,action)=>{
   state=Object.assign(state,action.payload)
  },
    },
})

export const {cacheResults} =serachSlice.actions;
export default serachSlice.reducer;*/


import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {},
    reducers: {
        cacheResults: (state, action) => {
            // Mutate the state rather than reassigning it
           state= Object.assign(state, action.payload);
        },
    },
});

export const { cacheResults } = searchSlice.actions;
export default searchSlice.reducer;
