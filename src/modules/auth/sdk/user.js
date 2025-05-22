import {ref} from 'vue'

const user = ref(JSON.parse(localStorage.getItem('user')))

const logout = async (router) => {
    try {
        localStorage.removeItem('user')
        user.value = null
        await router.push({ name: 'login' })
    } catch (error) {
        console.error(error)
    }
}
const isUserLoggedIn = () => !!user.value?.password

export const useUser = () => {
    return { user, logout, isUserLoggedIn }
}
