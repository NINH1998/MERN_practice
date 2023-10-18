export const postReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'POST_LOADED_SUCCESS':
            return { ...state, posts: payload, isPostLoading: false };
        case 'CREATE_POST_SUCCESS':
            return { ...state, posts: [...state.posts, payload] };
        case 'UPDATE_POST_SUCCESS':
            return {
                ...state,
                posts: state.posts.map((post) => (post._id === payload._id ? payload : post)),
            };
        case 'FIND_POST_TO_CREATE':
            return { ...state, post: payload };
        case 'DELETE_POST_SUCCESS':
            return { ...state, posts: state.posts.filter((post) => post._id !== payload) };
        case 'POST_LOADED_FAIL':
            return { ...state, posts: [], isPostLoading: false };
        default:
            return state;
    }
};
