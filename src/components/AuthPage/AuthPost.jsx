import React from "react";
import Post  from "../Center/Post";


const AuthPost = ({posts}) => {
  return (
    <>
      {posts.length ?
        posts.map((data) => {
          return (
            <Post key={data.id} post={data} />
          );
        }):""}
    </>
  );
};

export default AuthPost;
