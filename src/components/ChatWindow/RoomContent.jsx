import React, { useMemo, useState } from "react";
import { Box, TypograpyTitle, TypograpyText, ChatRoom } from "./ChatSideBar";
import { Form, Avatar } from "../navigation/styled";
import { avatar } from "../../images/link";
import styled from "@emotion/styled";
import { addDocument } from "../../firebase/services";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selector";
import useFireStore from "../../hook/useFireStore";
import { nanoid } from "@reduxjs/toolkit";
import { timeSince } from "../../utils";

const Page = styled.div`
  flex: 1;
  padding: 10px;
  position: relative;
`;

const Window = styled.div`
  height: 80%;
  overflow-y: auto;
  padding: 10px;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  flex-direction: column;
`;

const RoomContent = ({ selectedRoom }) => {
  const [text, setText] = useState("");

  const user = useSelector(userSelector);

  const handleSendMess = () => {
    addDocument("messages", {
      id: nanoid(),
      text,
      uid: user.uid,
      photoURL: user.photoURL,
      roomId: selectedRoom?.id,
      displayName: user.displayName,
    });
    setText("");
  };

  const messCondition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      value: selectedRoom.id,
    };
  }, [selectedRoom.id]);
  const mess = useFireStore("messages", messCondition);

  return (
    <Page>
      <Box style={{ borderBottom: "1px solid #ccc", height: "10%" }}>
        <ChatRoom
          style={{
            padding: "8px",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Avatar src={avatar} />
          <Box style={{ flexDirection: "column", textAlign: "left" }}>
            <TypograpyTitle>{selectedRoom.name[0] === user.displayName ? selectedRoom.name[1]: selectedRoom.name[0]}</TypograpyTitle>
            <TypograpyText style={{ opacity: "0.7" }}>
              Hãy cùng nhắn tin
            </TypograpyText>
          </Box>
        </ChatRoom>
      </Box>
      <Window>
        {mess.map((mes) => {
          return (
            <Message
              key={mes.id}
              style={{
                alignItems: user.uid === mes.uid ? "flex-end" : "flex-start",
              }}
            >
              <TypograpyText
                style={{ fontSize: "12px", opacity: "0.7", marginRight: "5px" }}
              >
                {mes.displayName}
              </TypograpyText>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  style={{ width: "25px", height: "25px" }}
                  src={mes.photoURL}
                />
                <TypograpyText
                  style={{
                    backgroundColor: "RGB(0, 132, 255)",
                    borderRadius: "15px",
                    display: "inline-block",
                    padding: "3px 5px",
                  }}
                >
                  {mes.text}
                </TypograpyText>
              </div>
              <TypograpyText
                style={{ fontSize: "12px", opacity: "0.7", marginRight: "5px" }}
              >
                {timeSince(mes.createAt)}
              </TypograpyText>
            </Message>
          );
        })}
      </Window>

      <Box style={{ borderTop: "1px solid #ccc" }}>
        <Form
          style={{
            color: "#000",
            margin: "10px 0",
            display: "flex",
            alignItems: "center",
            height: "15%",
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
            placeholder="Tìm kiếm trên Messenger"
            onChange={(e) => setText(e.target.value)}
          />
          <i onClick={handleSendMess} className="fa-solid fa-paper-plane"></i>
        </Form>
      </Box>
    </Page>
  );
};

export default RoomContent;
