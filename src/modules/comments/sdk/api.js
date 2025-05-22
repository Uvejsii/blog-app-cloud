import api from '@/stores/axios.js'

const domain = 'https://k3htr4drac.execute-api.us-east-1.amazonaws.com/Dev/api/Comment'

export const getCommentsByPost = async (postId) => {
    try {
        const response = await api.get(`${domain}/get_comments_by_post/${postId}`)

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const createComment = async (data) => {
    try {
        const response = await api.post(`${domain}/create_comment`, data)

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const editComment = async (data) => {
    try {
        const response = await api.put(`${domain}/edit_comment_by_id/${data.commentId}`, data)

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const deleteComment = async (commentId) => {
    try {
        const response = await api.delete(`${domain}/delete_comment_by_id/${commentId}`)

        return response.data
    } catch (error) {
        console.error(error)
    }
}