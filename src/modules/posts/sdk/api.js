import api from '@/stores/axios.js'

const domain = 'https://k3htr4drac.execute-api.us-east-1.amazonaws.com/Dev/api/Post'

export const getAllPosts = async () => {
    try {
        const response = await api.get(`${domain}/get_all_posts`)

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const createPost = async (data) => {
    try {
        const response = await api.post(`${domain}/create_post`, data)

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const deletePost = async (data) => {
    try {
        const response = await api.delete(`${domain}/delete_post_by_id/${data.id}`,)

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const editPost = async (data) => {
    try {
        const response = await api.put(`${domain}/edit_post_by_id/${data.postId}`, data)

        return response.data
    } catch (error) {
        console.error(error)
    }
}