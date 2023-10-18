import { useContext, useEffect } from 'react';
import './dashboard.css';

import Loading from './Loading';
import PostItem from '../Component/Posts/PostItem';
import CreatePost from '../Component/Posts/Postdefault';
import AddPostModal from '../Component/Posts/AddPostModal';
import { PostContext } from '../Context/PostContext';
import { PlusIcon } from '../assets/Icons';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Toast from '../Component/Posts/Toast';
import UpdatePostModal from '../Component/Posts/UpdatePostModal';

const DashBoard = () => {
    const {
        postState: { post, posts, isPostLoading },
        getPosts,
        setShowCreatePostModal,
    } = useContext(PostContext);

    useEffect(() => {
        getPosts();
        // eslint-disable-next-line
    }, []);

    let body;

    if (isPostLoading) {
        body = <Loading />;
    } else if (posts.length === 0) {
        body = (
            <>
                <CreatePost />
                <AddPostModal />
                <div>
                    <div className="btn-floating" onClick={setShowCreatePostModal.bind(this, true)}>
                        <PlusIcon />
                    </div>
                </div>
            </>
        );
    } else {
        body = (
            <>
                <UpdatePostModal />
                <ul className="grid grid-cols-3">
                    {posts.map((post, index) => (
                        <CSSTransition key={index} timeout={0} classNames="fade">
                            <PostItem key={index} post={post} />
                        </CSSTransition>
                    ))}
                </ul>

                <div>
                    <div className="btn-floating" onClick={setShowCreatePostModal.bind(this, true)}>
                        <PlusIcon />
                    </div>
                </div>
                <AddPostModal />
                <Toast />
            </>
        );
    }

    return <>{body}</>;
};

export default DashBoard;
