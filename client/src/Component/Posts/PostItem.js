import ActionButton from './ActionButton';

const PostItem = ({ post: { _id, title, description, url, status } }) => {
    const switchBorderStatus =
        status === 'TO LEARN' ? 'border-red-400' : status === 'LEARNED' ? 'border-green-400' : 'border-yellow-400';

    const switchBackGroundStatus =
        status === 'TO LEARN' ? 'bg-red-400' : status === 'LEARNED' ? 'bg-green-400' : 'bg-yellow-400';

    const switchBackGround =
        status === 'TO LEARN' ? 'bg-red-100' : status === 'LEARNED' ? 'bg-green-100' : 'bg-yellow-100';
    return (
        <li
            className={`leading-8 mx-4 mt-8 ${switchBackGround}  w-[100% - 16px] gap-4 border-[3px] ${switchBorderStatus} rounded-md shadow-lg shadow-slate-300`}
        >
            <div className="relative p-3">
                <h4 className="font-semibold uppercase mb-2">{title}</h4>
                <span className={`${switchBackGroundStatus} p-1.5 rounded-md text-white font-semibold`}>{status}</span>
                <p className="mt-4">{description}</p>
                <button className="absolute flex items-center top-3 right-8">
                    <ActionButton id={_id} url={url} />
                </button>
            </div>
        </li>
    );
};

export default PostItem;
