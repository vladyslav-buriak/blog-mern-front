import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch } from "react-redux";
import { fetchAllPosts, fetchTags } from "../redux/slices/posts";
import { useSelector } from "react-redux";
import { fetchAllComments } from "../redux/slices/comments";


export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const userId = useSelector((state) => state.auth.data);
  const { comment } = useSelector((state) => state.comment);
  const isPostsLoading = posts.status === "loading";
  const istagsLoading = tags.status === "loading";
  const [value, setValue] = React.useState(0);


  const handleChange = (SyntheticEvent, newValue) => {
    setValue(newValue)
  }
  useEffect(() => {
    let typeSort = {}
    switch (value) {
      case 0:
        typeSort = {
          "createdAt": -1
        }
        break;
      case 1:
        typeSort = {
          "viewCount": -1
        }
        break;
    }

    
    dispatch(fetchAllPosts(typeSort));
    dispatch(fetchTags())
    dispatch(fetchAllComments())
 
  }, [value]);


  return (
    <>
      <Tabs
        onChange={handleChange}
        style={{ marginBottom: 15 }}
        value={value}
        aria-label="basic tabs example"
      >
        <Tab value={0} label="Новые" />
        <Tab value={1} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((p, index) => {
            return isPostsLoading ? (
              <Post isLoading={true} key={index} />
            ) : (

              <Post
                id={p._id}
                title={p.title}
                imageUrl={p.imageUrl ? `${process.env.REACT_APP_API_URL}${p.imageUrl}` : ""}
                // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                user={p.user}
                createdAt={p.createdAt}
                viewsCount={p.viewCount}
                commentsCount={3}
                tags={p.tags}
                isEditable={userId?._id === p.user._id}
              />
            );
          })}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items}
            isLoading={istagsLoading}
          />
          <CommentsBlock
            items={comment}
            isLoading={isPostsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
