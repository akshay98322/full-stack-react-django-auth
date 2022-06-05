const storeToken = (value) => {
    if (value) {
        const {access, refresh } = value;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
    }
}

const getToken = () => {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');
    return {access, refresh};
}

const removeToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

export {storeToken, getToken, removeToken};