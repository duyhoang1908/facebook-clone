import React, { useEffect, useState } from "react";
import { Avatar } from "../navigation/styled";
import {CenterBar, Content, Box} from "./styled"
import StatusBox from "./StatusBox";
import { modalSlice } from "../../store/Slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { statusSelector, userSelector } from "../../store/selector";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { postSlice } from "../../store/Slice/postSlice";

const Center = () => {
  const [posts, setPosts] = useState([]);

  const status = useSelector(statusSelector);
  const user = useSelector(userSelector)

  const dispatch = useDispatch();
  const handleSetModal = () => {
    dispatch(modalSlice.actions.setSatus(!status))
  };

  useEffect(() => {
    const collectionRef = query(
      collection(db, "posts"),orderBy("time")
    );

    const unsubcribed = onSnapshot(collectionRef, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.unshift({...doc.data(), id:doc.id});
      });
      dispatch(postSlice.actions.setPostList(documents))
      setPosts(documents)
    });

    return unsubcribed;
  }, []);


  return (
    <CenterBar>
      <Content>
        <Box>
          <Avatar src={user.photoURL} />
          <div
            onClick={handleSetModal}
            style={{
              flex: "1",
              padding: "8px 12px",
              borderRadius: "20px",
              backgroundColor: "#RGB(240, 242, 245)",
              border: "none",
              outline: "none",
              cursor: "pointer",
              color:"#000"
            }}
          >
            {user.displayName} ơi, bạn đang nghĩ gì thế?
          </div>
        </Box>
      </Content>
      {posts && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {posts.map(post => <Post post={post}/>)}
        </div>
      )}
      <StatusBox />
    </CenterBar>
  );
};

export default Center;
