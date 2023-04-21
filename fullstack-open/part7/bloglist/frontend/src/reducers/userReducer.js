import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';
import { setToken } from '../services/token';

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser(state, action) {
            if (state) {
                setToken(action.payload.token);
            }
            return action.payload;
        },
        removeUser() {
            window.localStorage.removeItem('currentUser');
            setToken('');
            return null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export const login = (credentials) => {
    return async (dispatch) => {
        const user = await userService.login(credentials);
        setToken(user.token);
        window.localStorage.setItem('currentUser', JSON.stringify(user));
        dispatch(setUser(user));
    };
};

export default userSlice.reducer;
