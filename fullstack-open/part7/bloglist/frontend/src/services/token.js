export let token;

export const setToken = (userToken) => {
    token = `bearer ${userToken}`;
};