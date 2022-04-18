import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostWithUid, getUserWithUid } from "../../firebase/services";
import AuthInfo from "./AuthInfo";
import AuthPost from "./AuthPost";

const AuthPage = () => {
  const param = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserWithUid(param.id).then((data) => setUser(data));
    getPostWithUid(param.id).then((data) => setPosts(data));
  }, []);

  return (
    <div
      style={{
        width: "70%",
        margin: "auto",
      }}
    >
      {user && <AuthInfo user={user} />}
      {posts && <AuthPost posts={posts} />}
    </div>
  );
};

export default AuthPage;
