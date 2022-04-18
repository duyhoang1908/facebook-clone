import React, { Fragment, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import { getUserWithUid } from "../../firebase/services";
import useFireStore from "../../hook/useFireStore";
import { roomSlice } from "../../store/Slice/roomSlice";
import { userSlice } from "../../store/Slice/userSlice";

const Home = ({props}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserWithUid(props).then((data) => {
      const {displayName, photoURL, email, uid, id ,friendList } = data
      dispatch(userSlice.actions.setUser({
        displayName,
        photoURL,
        email,
        uid
      }))
      dispatch(userSlice.actions.setFriendList(friendList));
      dispatch(userSlice.actions.setId(id));
    });
  },[props])

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      value: props,
    };
  }, [props]);

  const rooms = useFireStore("rooms", roomsCondition);

  useEffect(() => {
    dispatch(roomSlice.actions.setRooms(rooms));
  }, [rooms]);

  return (
    <Fragment>
      <Navigation />
      <Outlet />
    </Fragment>
  );
};

export default Home;
