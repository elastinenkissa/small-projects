import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {},
    reducers: {
        createNotification(state, action) {
            if (state.time) {
                clearTimeout(state.time)
            }
            return action.payload;
        },
        removeNotification(state, action) {
            return {};
        },
    },
});

export const { createNotification, removeNotification } =
    notificationSlice.actions;

export const setNotification = (message, timer) => {
    return async (dispatch) => {
        const time = setTimeout(() => {
            dispatch(removeNotification());
        }, timer * 1000);
        dispatch(createNotification({ message, time: time }));
    };
};

export default notificationSlice.reducer;
