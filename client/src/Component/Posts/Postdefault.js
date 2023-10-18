import { useContext } from 'react';
import { PostContext } from '../../Context/PostContext';

const CreatePost = () => {
    const { setShowCreatePostModal } = useContext(PostContext);

    const showCreatePost = () => {
        setShowCreatePostModal(true);
    };
    return (
        <div
            onClick={showCreatePost}
            className="leading-8 mx-8 my-8 w-1/3 gap-4 border-2 border-teal-400 rounded-md bg-transparent hover:scale-105 transform ease-out duration-300 cursor-pointer"
        >
            <div className="relative p-3 btn-animation">
                <h2 className="uppercase text-center text-teal-400">create your post</h2>
                <div className="flex justify-center mt-4 ">
                    <svg
                        className="h-12 w-12 text-teal-400 "
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" /> <line x1="12" y1="8" x2="12" y2="16" />{' '}
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
