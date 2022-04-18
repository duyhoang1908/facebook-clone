import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box } from "../LeftBar/styled";
import { Avatar } from "../navigation/styled";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { handleOpenMess } from "../../firebase/services";
import { useSelector } from "react-redux";
import { listRoomSelector, userSelector } from "../../store/selector";
import { useNavigate } from "react-router-dom";

const Rightbar = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const RightBar = () => {
  const [mess, setMess] = useState([]);

  const user = useSelector(userSelector);
  const rooms = useSelector(listRoomSelector);
  const history = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "user"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const friends = [];
      querySnapshot.forEach((doc) => {
        friends.push(doc.data());
      });
      setMess(friends);
    });

    return unsubscribe;
  }, []);
  const createMess = (user, guest) => {
    let checkRoom = true;
    rooms.forEach((room) => {
      room.members.forEach((member) => {
        if (member === guest.uid) checkRoom = false;
      });
    });
    if (checkRoom) {
      handleOpenMess(user, guest);
      history("/home/messages");
    } else history("/home/messages");
  };

  return (
    <Rightbar>
      <Box style={{ borderRadius: "0px", borderTop: "1px solid #ccc" }}>
        Người liên hệ
      </Box>
      {mess.map((mes) => {
        return (
          <Box onClick={() => createMess(user, mes)}>
            <Avatar src={mes?.photoURL} />
            {mes.displayName}
          </Box>
        );
      })}
    </Rightbar>
  );
};

export default RightBar;
