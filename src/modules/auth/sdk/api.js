import api from '@/stores/axios.js'

const domain = 'https://k3htr4drac.execute-api.us-east-1.amazonaws.com/Dev/api/Auth'

export const register = async (data) => {
    try {
        const response = await api.post(`${domain}/register`, data)

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const login = async (data) => {
    try {
        const response = await api.post(`${domain}/login`, data)

        return response.data
    } catch (error) {
        console.error(error)
    }
}