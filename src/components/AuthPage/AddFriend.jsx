import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { handleOpenMess } from "../../firebase/services";
import {
  friendListSelector,
  listRoomSelector,
  userIdSelector,
} from "../../store/selector";
import { db } from "../../firebase/config";
import { Button } from "./styled";
import { toast, ToastContainer } from "react-toastify";

const AddFriend = ({ curentUser, user }) => {
  const [list, setList] = useState(useSelector(friendListSelector));
  const [isFriend, setIsFriend] = useState(false);
  const USERID = useSelector(userIdSelector);
  const rooms = useSelector(listRoomSelector);
  const history = useNavigate();

  console.log(list);

  useEffect(() => {
    list.forEach((guest) => {
      if (guest.uid === user.uid) {
        setIsFriend(true);
        return;
      }
    });
  }, [list, user]);

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

  const addFriend = async (user) => {
    const userRef = doc(db, "user", USERID);
    await updateDoc(userRef, {
      friendList: [...list, user],
    });
    const notify = () => toast("Thêm bạn thành công")
    notify()
    setList([...list, user]);
  };


  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ToastContainer />
      <Button
        style={{
          display: isFriend ? "none" : "block",
          backgroundColor: "RGB(27, 116, 228)",
          color: "white",
        }}
        onClick={() => addFriend(user)}
      >
        <i class="fa-solid fa-user-plus"></i> Thêm bạn bè
      </Button>
      <Button onClick={() => createMess(curentUser, user)}>
        <i className="fa-brands fa-facebook-messenger"></i> Nhắn tin
      </Button>
    </div>
  );
};

export default AddFriend;
