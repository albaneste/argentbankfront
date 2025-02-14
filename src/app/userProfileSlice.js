import { createSlice } from '@reduxjs/toolkit';

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        profile: null,
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.profile = action.payload;
        },
        updateUserName: (state, action) => {
            state.profile.userName = action.payload.userName;
        },
    },
});

export const { setUserProfile, updateUserName } = userProfileSlice.actions;
export default userProfileSlice.reducer;