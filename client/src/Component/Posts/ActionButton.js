import { DeleteIcon, EditIcons, PlayBtn } from '../../assets/Icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PostContext } from '../../Context/PostContext';

const ActionButton = ({ id, url }) => {
    const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext);

    const updatePost = (postId) => {
        findPost(postId);
        setShowUpdatePostModal(true);
    };

    return (
        <>
            <Link to={url} target="_blank" className="mr-3 btn-scale-animation">
                <PlayBtn />
            </Link>
            <div className="mr-3 btn-scale-animation" onClick={updatePost.bind(this, id)}>
                <EditIcons />
            </div>
            <div className="btn-scale-animation" onClick={deletePost.bind(this, id)}>
                <DeleteIcon />
            </div>
        </>
    );
};

export default ActionButton;
