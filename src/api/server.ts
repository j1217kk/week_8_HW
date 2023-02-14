let token = `YOUR_API_TOKEN_HERE`

export const serverCalls = {
    get: async () => {
        const response = await fetch(`FLASK URL`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },

    create: async(data: any = {}) => {
        const response = await fetch(`flask url`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok){
            throw new Error('Failed to create new data on server')
        }
        return await response.json()
    },
    update: async(id:string, data: any = {}) =>{
        const response = await fetch(`flask url`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },
    delete: async(id:string) =>{
        const response = await fetch(`flask url`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });
    }
}