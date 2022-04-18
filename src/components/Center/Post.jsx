import styled from "@emotion/styled";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditPost from "./EditPost";
import { Content, Option } from "./styled";
import { TypograpyText, TypograpyTitle } from "../ChatWindow/ChatSideBar";
import { Form, Icon } from "../navigation/styled";
import { timeSince } from "../../utils";
import Comments from "./Comments";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selector";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";

export const Flex = styled.div`
  display: flex;
`;

const Post = ({ post }) => {
  const { nameAuth, imgAuth, image, caption, comment, time, like, id, uid } =
    post;
  const user = useSelector(userSelector);
  const [text, setText] = useState("");
  const [commentList, setCommentList] = useState(comment);
  const [showMoreCmt, setShowMoreCmt] = useState(1);
  const [likeList, setLikeList] = useState([...like]);
  const [isLike, setLike] = useState(false);
  const [cmt, setCmt] = useState(false);
  const [option, setOption] = useState(false);

  useEffect(() => {
    const check = likeList.some((data) => data === user.uid);
    if (check) setLike(true);
  }, [likeList, user.uid]);
  const isAuth = uid === user.uid;

  const handleComment = async (e) => {
    e.preventDefault();
    const postRef = doc(db, "posts", id);
    const data = [
      ...commentList,
      {
        id: nanoid(),
        time: Date.now(),
        uid: user.uid,
        name: user.displayName,
        img: user.photoURL,
        comment: text,
      },
    ];
    setText("");
    await updateDoc(postRef, {
      comment: data,
    });
    setCommentList(data);
  };

  const handleCmtMore = () => {
    return commentList.length > 1 && showMoreCmt === 1 ? (
      <div
        style={{ padding: "5px", color: "#000" }}
        onClick={() => setShowMoreCmt(commentList.length)}
      >
        Xem tất cả bình luận
      </div>
    ) : (
      <div
        style={{ padding: "5px", color: "#000" }}
        onClick={() => setShowMoreCmt(1)}
      >
        Ẩn bớt bình luận
      </div>
    );
  };

  const handleLike = async () => {
    const postRef = doc(db, "posts", id);
    const check = likeList.some((data) => data === user.uid);
    if (check) {
      const data = likeList.filter((id) => id !== user.uid);
      await updateDoc(postRef, {
        like: data,
      });
      setLikeList(data);
      setLike(false);
    } else {
      const data = [...likeList, user.uid];
      await updateDoc(postRef, {
        like: data,
      });
      setLikeList(data);
      setLike(true);
    }
  };

  const toggleOption = () => {
    setOption(!option);
  };

  return (
    <Content
      key={id}
      style={{
        padding: "12px 0",
        borderRadius: "8px",
        backgroundColor: "#fff",
        marginTop: "30px",
      }}
    >
      <Flex style={{ padding: "0 16px" }}>
        <Avatar src={imgAuth} />
        <Flex
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flex: "1",
          }}
        >
          <Flex style={{ flexDirection: "column", marginLeft: "5px" }}>
            <Link to={`/home/auth/${uid}`}>
              <TypograpyTitle>{nameAuth}</TypograpyTitle>
            </Link>
            <TypograpyText>{timeSince(time)}</TypograpyText>
          </Flex>
          <TypograpyTitle
            onClick={toggleOption}
            style={{
              cursor: "pointer",
              display: isAuth ? "block" : "none",
              position: "relative",
            }}
          >
            <i className="fa-solid fa-ellipsis"></i>

            <EditPost option={option} post={post} />
          </TypograpyTitle>
        </Flex>
      </Flex>
      <TypograpyText style={{ padding: "10px 16px" }}>{caption}</TypograpyText>
      {image && (
        <Flex>
          <img
            src={image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Flex>
      )}
      <Flex
        style={{
          padding: "5px",
          justifyContent: "space-between",
          borderTop: "1px solid #ccc",
          borderBottom: "1px solid #ccc",
        }}
      >
        <TypograpyText>{Object.keys(likeList).length} thích</TypograpyText>
        <TypograpyText>
          {Object.keys(commentList).length} bình luận
        </TypograpyText>
      </Flex>
      <Flex
        style={{
          padding: "0 16px",
          color: "#fff",
          fontSize: "15px",
          marginTop: "12px",
        }}
      >
        <Icon
          onClick={handleLike}
          style={{ flex: "1", color: isLike ? "blue" : "#000" }}
        >
          <i
            style={{ marginRight: "5px", fontSize: "16px" }}
            className="fa-solid fa-thumbs-up"
          ></i>
          Thích
        </Icon>
        <Icon onClick={() => setCmt(!cmt)} style={{ flex: "1" }}>
          <i
            style={{ marginRight: "5px", fontSize: "16px" }}
            className="fa-solid fa-message"
          ></i>
          Bình luận
        </Icon>
        <Icon style={{ flex: "1" }}>
          <i
            style={{ marginRight: "5px", fontSize: "16px" }}
            className="fa-solid fa-share"
          ></i>
          Chia sẻ
        </Icon>
      </Flex>
      <Flex style={{ flexDirection: "column", display: cmt ? "flex" : "none" }}>
        <div
          style={{ display: "flex", padding: "15px 5px", alignItems: "center" }}
        >
          <Avatar src={imgAuth} />
          <Form
            style={{
              color: "#000",
              margin: "10px 0",
              display: "flex",
              alignItems: "center",
              flex: 1,
            }}
          >
            <input
              value={text}
              style={{
                backgroundColor: "unset",
                outline: "none",
                marginLeft: "5px",
                fontSize: "14px",
                flex: 1,
              }}
              type="text"
              placeholder="Viết bình luận"
              onChange={(e) => setText(e.target.value)}
            />
            <i onClick={handleComment} className="fa-solid fa-paper-plane"></i>
          </Form>
        </div>
        {commentList.slice(0, showMoreCmt).map((data) => {
          return <Comments data={data} />;
        })}
        {commentList.length !== 1 && handleCmtMore()}
      </Flex>
    </Content>
  );
};

export default Post;
