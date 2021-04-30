const authProvider: any = {
    login: async ({ username, password }) =>  {
        const request = new Request(`${process.env.BASE_PATH}authenticate`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                console.log(token)
                localStorage.setItem('token', token);
            });
    },
    checkAuth: async (params: any) => {
        const token = localStorage.getItem('token')
        const request = new Request(`${process.env.BASE_PATH}checkAuth`, {
            method: 'POST',
            body: JSON.stringify({ token }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        await fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
        return Promise.resolve();
    },
    getPermissions: (params: any) => Promise.reject(),
    logout: async () => {
        const token = localStorage.getItem('token')
        const request = new Request(`${process.env.BASE_PATH}logout`, {
            method: 'POST',
            body: JSON.stringify({ token }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        await fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                localStorage.removeItem('token')
                return response.json();
            })
        return Promise.resolve();
    }
};

export default authProvider