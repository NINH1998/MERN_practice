import { useContext, useState, Fragment } from 'react';
import { PostContext } from '../../Context/PostContext';
import { forwardRef } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';

const AddPostModal = forwardRef((props, forwardedRef) => {
    const { setShowCreatePostModal, showCreatePostModal, addPosts, setShowNewPost } = useContext(PostContext);

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });

    const { title, description, url } = newPost;

    const submitCreatePost = async (e) => {
        try {
            e.preventDefault();
            const { success } = await addPosts(newPost);
            resetInput();
            setShowNewPost(true);
            success ? toast.success('Created Success') : toast.error('Created Failure');
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeNewPost = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const closeModal = () => {
        resetInput();
    };

    const resetInput = () => {
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
        setShowCreatePostModal(false);
    };
    return (
        <>
            <div
                tabIndex="-1"
                className={`${
                    showCreatePostModal ? '' : 'hidden'
                } fixed flex justify-center items-center bg-black/[0.3] left-0 right-0 w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full`}
            >
                <Transition show={showCreatePostModal} as={Fragment}>
                    <Dialog
                        onClose={closeModal}
                        className="fixed flex justify-center items-center inset-0 z-10 overflow-y-auto"
                    >
                        <div className="px-4 text-center">
                            <Transition.Child
                                enter="transition duration-300 ease-out"
                                enterFrom="transform scale-50 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-100 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-75 opacity-0"
                                as={Fragment}
                            >
                                <div ref={forwardedRef} className="relative w-full max-w-xl min-w-[470px] max-h-full">
                                    <div className="relative bg-white rounded-lg shadow">
                                        <div className="flex items-start justify-between p-4 border-b-2 rounded-t mx-2">
                                            <h3 className="text-2xl font-semibold uppercase text-green-500">
                                                Create post
                                            </h3>
                                            <button
                                                onClick={closeModal}
                                                type="button"
                                                className="outline-none text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                                            >
                                                <svg
                                                    className="w-3 h-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 14"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <form onSubmit={submitCreatePost} className="flex m-6 items-center flex-col">
                                            <input
                                                type="text"
                                                name="title"
                                                value={title}
                                                placeholder="Title"
                                                className="w-full mx-4 my-4 p-2 border-2 rounded-lg outline-none"
                                                onChange={onChangeNewPost}
                                            ></input>
                                            <textarea
                                                type="text"
                                                name="description"
                                                value={description}
                                                placeholder="Description"
                                                className="w-full    mx-4 my-4 p-2 border-2 rounded outline-none"
                                                onChange={onChangeNewPost}
                                            ></textarea>
                                            <input
                                                type="text"
                                                name="url"
                                                value={url}
                                                placeholder="Url"
                                                className="w-full mx-4 my-4 p-2 border-2 rounded-lg outline-none"
                                                onChange={onChangeNewPost}
                                            ></input>
                                        </form>

                                        <div className="flex items-center justify-end p-2 space-x-2  ">
                                            <button
                                                onClick={closeModal}
                                                className="bg-red-500 uppercase text-white font-semibold px-4 py-2 rounded hover:bg-red-400 tranform ease duration-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={submitCreatePost}
                                                className="!bg-green-500 outline-none uppercase text-white font-semibold px-4 py-2 rounded hover:!bg-green-400 tranform ease duration-300"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
});

export default AddPostModal;
