import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {},
    reducers: {
        createNotification(state, action) {
            return action.payload;
        },
        removeNotification() {
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
        dispatch(createNotification({ message, time, error: false }));
    };
};

export const setErrorNotification = (message, timer) => {
    return async (dispatch) => {
        const time = setTimeout(() => {
            dispatch(removeNotification());
        }, timer * 1000);
        dispatch(createNotification({ message, time, error: true }));
    };
};

export default notificationSlice.reducer;
