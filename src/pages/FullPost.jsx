import React, { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from 'react-router-dom';
import axios from "../utils";
import ReactMarkDown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllComments } from "../redux/slices/comments";


export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams();
  const dispatch = useDispatch();
  const { comment} = useSelector((state) => state.comment);

  useEffect(() => {
    try {
      axios.get(`posts/${id}`).then(({ data }) => {
        setData(data)
        setIsLoading(false)
      }
      )
  dispatch(fetchAllComments())
    } catch (err) {
      console.log(err)
    }

  }, [])




  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }
  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        imageUrl={`http://localhost:9832${data.imageUrl}`}
        // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={{
          avatarUrl:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
          fullName: data.user.name,
        }}
        createdAt={"12 июня 2022 г."}
        viewsCount={data.viewCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkDown children={data.text} />
      </Post>
      <CommentsBlock

        // items={[
        //   {
        //     user: {
        //       fullName: "Вася Пупкин",
        //       avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
        //     },
        //     text: "Это тестовый комментарий 555555",
        //   },
        //   {
        //     user: {
        //       fullName: "Иван Иванов",
        //       avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
        //     },
        //     text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
        //   },
        // ]}
        isLoading={false}
        items={comment}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
