let token = `2c899ff9c94cb224b232d868701f96145d6ad8dcf4e6402d`

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://stingy-decorous-laugh.glitch.me/api/cars`, {
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
        const response = await fetch(`https://stingy-decorous-laugh.glitch.me/api/cars`, {
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
        const response = await fetch(`https://stingy-decorous-laugh.glitch.me/api/cars/${id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },
    delete: async(id:string) =>{
        const response = await fetch(`https://stingy-decorous-laugh.glitch.me/api/cars/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });
    }
}