import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../Reducer/postReducer';
import { apiURL } from './UrlApi';
import axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postReducer, {
        post: { title: '', description: '', url: '', status: '' },
        posts: [],
        isPostLoading: true,
    });

    const [showNewPost, setShowNewPost] = useState(false);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiURL}/posts`);

            if (response.data.success) {
                dispatch({ type: 'POST_LOADED_SUCCESS', payload: response.data.posts });
            }
        } catch (error) {
            dispatch({ type: 'POST_LOADED_FAIL' });
        }
    };

    const addPosts = async (newPost) => {
        try {
            const response = await axios.post(`${apiURL}/posts`, newPost);

            if (response.data.success) {
                dispatch({ type: 'CREATE_POST_SUCCESS', payload: response.data.post });
            }
            return response.data;
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'server error' };
        }
    };

    const updatePost = async (dataUpdate) => {
        try {
            const response = await axios.put(`${apiURL}/posts/${dataUpdate._id}`, dataUpdate);

            if (response.data.success) {
                dispatch({ type: 'UPDATE_POST_SUCCESS', payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'server error' };
        }
    };

    const findPost = (postId) => {
        const post = postState.posts.find((post) => post._id === postId);
        dispatch({ type: 'FIND_POST_TO_CREATE', payload: post });
    };

    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiURL}/posts/${postId}`);

            if (response.data.success) {
                dispatch({ type: 'DELETE_POST_SUCCESS', payload: postId });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const postContextData = {
        postState,
        getPosts,
        addPosts,
        deletePost,
        showCreatePostModal,
        setShowCreatePostModal,
        updatePost,
        findPost,
        showUpdatePostModal,
        setShowUpdatePostModal,
        setShowNewPost,
        showNewPost,
    };
    return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
