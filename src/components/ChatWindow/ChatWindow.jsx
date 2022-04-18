import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  listRoomSelector,
  roomSelector
} from "../../store/selector";
import RoomContent from "./RoomContent";


const ChatWindow = () => {
  const roomlist = useSelector(listRoomSelector);
  const roomId = useSelector(roomSelector);
  const selectedRoom = useMemo(() => {
    const room = roomlist.find((room) => room.id === roomId);
    return room;
  }, [roomId, roomlist]);

  return (
    <>
    {roomId && selectedRoom && <RoomContent selectedRoom={selectedRoom}/>}
    </>
  );
};

export default ChatWindow;
