import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from './userProfileSlice';

const store = configureStore({
    reducer: {
        userProfile: userProfileReducer
    },
});

export { store };
