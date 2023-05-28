import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { Post } from "../../components";
import { useEffect } from "react";
import { fetchAllPosts } from "../../redux/slices/posts";

export const TagsPage = () => {
    const { posts, tags } = useSelector((state) => state.posts);
    const isPostsLoading = posts.status === "loading";
    const { id } = useParams();
    const userId = useSelector((state) => state.auth.data);
    const dispatch = useDispatch();

    let filt = posts.items.filter(p => p.tags.includes(id))
    useEffect(() => {
        dispatch(fetchAllPosts());
    }, []);
    return (
        <>

            <h2>#{id}</h2>
            {(isPostsLoading ? [...Array(5)] : filt).map((p, index) => {
                return isPostsLoading ? (<Post isLoading={true} key={index} />) : (<Post
                    id={p._id}
                    title={p.title}
                    imageUrl={p.imageUrl ? `http://localhost:9832${p.imageUrl}` : ""}
                    // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                    user={p.user}
                    createdAt={p.createdAt}
                    viewsCount={p.viewCount}
                    commentsCount={3}
                    tags={p.tags}
                    isEditable={userId?._id === p.user._id}
                />)
            })}
        </>

    )
}