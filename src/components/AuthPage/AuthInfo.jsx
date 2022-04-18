import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selector";
import { TypograpyTitle } from "../ChatWindow/ChatSideBar";
import AddFriend from "./AddFriend";
import UpdateProfile from "./UpdateProfile";

const AuthInfo = ({ user }) => {
  const curentUser = useSelector(userSelector);

  const check = user.uid === curentUser.uid

  
  return (
    <Fragment>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            marginRight: "30px",
          }}
          src={check? curentUser.photoURL: user.photoURL}
          alt=""
        />
        <div>
        <TypograpyTitle style={{ fontSize: "32px", fontWeight: "bold" }}>
          {user.displayName}
        </TypograpyTitle>
        {check? <UpdateProfile /> :<AddFriend curentUser={curentUser} user={user}/>}
        </div>
      </div>
    </Fragment>
  );
};

export default AuthInfo;
