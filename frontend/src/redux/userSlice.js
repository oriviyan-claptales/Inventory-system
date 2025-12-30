// import { createSlice } from "@reduxjs/toolkit"
// const userSlice = createSlice({
//     name : "user",
//     initialState:{
//         userData:null
//     },
//     reducers:{
//         setUserData:(state,action)=>{
//             state.userData = action.payload
//         }
//     }
// })
// export const {setUserData} = userSlice.actions
// export default userSlice.reducer



import { createSlice } from "@reduxjs/toolkit";

// 1️⃣ Pehle LocalStorage check karo
const storedUser = localStorage.getItem("user");

const userSlice = createSlice({
  name: "user",
  initialState: {
    // Agar storage me data hai to wahan se uthao, warna null
    userData: storedUser ? JSON.parse(storedUser) : null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      // Redux ke sath-sath browser storage me bhi save karo
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    // 2️⃣ Logout action bhi yahi bana lete hain safai ke liye
    logoutUser: (state) => {
      state.userData = null;
      localStorage.removeItem("user");
    }
  },
});

export const { setUserData, logoutUser } = userSlice.actions;
export default userSlice.reducer;