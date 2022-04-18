import React, { useEffect, useState } from "react";
import { logo } from "../../images/link";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selector";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Form, Icon, Nav, Text } from "./styled";
import { getUserWithName } from "../../firebase/services";

const Navigation = () => {
  const user = useSelector(userSelector);

  const [box, setBox] = useState(false);
  const [search, setSearch] = useState("");
  const [listUser, setListUser] = useState([]);

  const history = useNavigate();

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        history("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchUser = () => {
    getUserWithName(search).then((data) => console.log(data));
  };

  return (
    <Nav>
      <Box style={{ width: "25%", justifyContent: "start" }}>
        <Link to="/home/post">
          <img
            style={{ width: "40px", marginRight: "15px" }}
            src={logo}
            alt=""
          />
        </Link>
        <Form style={{ postion: "relative" }}>
          <i onClick={searchUser} className="fa-solid fa-magnifying-glass"></i>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            style={{
              backgroundColor: "unset",
              outline: "none",
              marginLeft: "5px",
              fontSize: "14px",
            }}
            type="text"
          />
          {listUser.length !== 0 && (
            <Box style={{ position: "absolute" }}>
              
            </Box>
          )}
        </Form>
      </Box>

      <Box style={{ width: "50%", padding: "0 20px" }}>
        <Icon style={{ flex: "1" }}>
          <i className="fa-solid fa-house"></i>
        </Icon>
        <Icon style={{ flex: "1" }}>
          <i className="fa-solid fa-circle-play"></i>
        </Icon>
        <Icon style={{ flex: "1" }}>
          <i className="fa-solid fa-store"></i>
        </Icon>
        <Icon style={{ flex: "1" }}>
          <i className="fa-solid fa-users"></i>
        </Icon>
        <Icon style={{ flex: "1" }}>
          <i className="fa-solid fa-gamepad"></i>
        </Icon>
      </Box>

      <Box style={{ width: "25%" }}>
        <Link to={`/home/auth/${user.uid}`}>
          <Icon
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
            }}
          >
            <Avatar src={user.photoURL} />
            <p>{user.displayName}</p>
          </Icon>
        </Link>
        <Icon>
          <i className="fa-solid fa-bars"></i>
        </Icon>
        <Icon>
          <Link to="/home/messages">
            <i className="fa-brands fa-facebook-messenger"></i>
          </Link>
        </Icon>
        <Icon>
          <i className="fa-solid fa-bell"></i>
        </Icon>
        <Icon style={{ position: "relative" }}>
          <i
            onClick={() => setBox(!box)}
            className="fa-solid fa-caret-down"
          ></i>
          <Box
            style={{
              display: box ? "block" : "none",
              flexDirection: "column",
              position: "absolute",
              top: "55px",
              right: "0",
              zIndex: "50",
              userSelect: "none",
              backgroundColor: "#fff",
              width: "360px",
              borderRadius: "10px",
              padding: "0 8px",
            }}
          >
            <Box
              style={{
                padding: "8px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Link
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                to={`/home/auth/${user.uid}`}
              >
                <Avatar src={user.photoURL} />
                <Box
                  style={{
                    flexDirection: "column",
                    textAlign: "left",
                    flex: "1",
                    marginLeft: "10px",
                  }}
                >
                  <Text>{user.displayName}</Text>
                  <Text>Xem trang cá nhân của bạn</Text>
                </Box>
              </Link>
            </Box>

            <Box style={{ padding: "8px" }}>
              <button onClick={logOut}>Đăng xuất</button>
            </Box>
          </Box>
        </Icon>
      </Box>
    </Nav>
  );
};

export default Navigation;
