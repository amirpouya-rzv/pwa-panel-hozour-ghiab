  // redux/theme/darkmodeslice.js
  import { createSlice } from "@reduxjs/toolkit";

  const savedTheme = localStorage.getItem("theme") || "light";

  const initialState = {
    darkmode: savedTheme,
  };

  const darkmodeSlice = createSlice({
    name: "darkmode",
    initialState,
    reducers: {
      setTheme: (state, action) => {
        state.darkmode = action.payload;
        localStorage.setItem("theme", action.payload);
      },
    },
  });

  export const { setTheme } = darkmodeSlice.actions;
  export default darkmodeSlice.reducer;
