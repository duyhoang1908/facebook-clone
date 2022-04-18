import React from "react";
import styled from "@emotion/styled";
import { Form, Avatar } from "../navigation/styled";
import { avatar } from "../../images/link";
import { useDispatch, useSelector } from "react-redux";
import { listRoomSelector, userSelector } from "../../store/selector";
import { roomSlice } from "../../store/Slice/roomSlice";

const SideBar = styled.div`
  width: 25%;
  border-right: 1px solid #ccc;
  padding: 10px;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TypograpyTitle = styled.p`
  font-size: 16px;
  color: #000;
`;
export const TypograpyText = styled.p`
  font-size: 14px;
  color: #000;
`;

export const ChatRoom = styled.div`
  display: flex;
`;

const ChatSideBar = () => {
  const user = useSelector(userSelector);
  const rooms = useSelector(listRoomSelector)

  const dispatch = useDispatch();
  const handleSetRoomId = (id) => {
    dispatch(roomSlice.actions.setRoomId(id));
  };

  return (
    <SideBar>
      <Box>
        <Box>
          <TypograpyTitle style={{ fontSize: "24px", fontWeight: "bold" }}>
            Chat
          </TypograpyTitle>
          <Form
            style={{
              color: "#000",
              margin: "10px 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              style={{
                backgroundColor: "unset",
                outline: "none",
                marginLeft: "5px",
                fontSize: "14px",
                flex: 1,
              }}
              type="text"
              placeholder="Tìm kiếm trên Messenger"
            />
          </Form>
        </Box>

        <Box style={{ overflowY: "auto", flex: "1" }}>
          {rooms.map((room) => {
            return (
              <ChatRoom
                style={{
                  padding: "8px",
                  alignItems: "center",
                  justifyContent: "start",
                  cursor: "pointer",
                }}
                key={room.id}
                onClick={() => handleSetRoomId(room.id)}
              >
                <Avatar src={avatar} />
                <Box style={{ flexDirection: "column", textAlign: "left" }}>
                  <TypograpyTitle>
                    {room.name[0] === user.displayName
                      ? room.name[1]
                      : room.name[0]}
                  </TypograpyTitle>
                  <TypograpyText style={{ opacity: "0.7" }}>
                    Hãy cùng nhắn tin
                  </TypograpyText>
                </Box>
              </ChatRoom>
            );
          })}
        </Box>
      </Box>
    </SideBar>
  );
};

export default ChatSideBar;
