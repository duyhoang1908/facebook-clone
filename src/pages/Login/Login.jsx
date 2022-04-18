import styled from "@emotion/styled";
import React, { useState } from "react";
import { auth } from "../../firebase/config";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {

  Text,
  Container,
  Button,
  Input,
  Box,

  BorderLine,
} from "../styled";
import { useDispatch, useSelector } from "react-redux";
import Resgister from "./Resgister";
import { registerSelector } from "../../store/selector";
import { modalSlice } from "../../store/Slice/modalSlice";


const Content = styled.div`
  display: flex;
  max-width: 1200px;
  padding: 112px 0;
  display: flex;
  align-item: center;
  margin: auto;
`;

const Layout = styled.div``;

const Item = styled.div`
  flex: 1;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = useSelector(registerSelector)

  const dispatch = useDispatch();

  const handleSetModal = () => {
    dispatch(modalSlice.actions.setRegister(!register))
  }

  const handleLogIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = auth.currentUser;
        if (user !== null) {
        }
      })
      .catch((error) => {
        const notify = () => toast("Tài khoản hoặc mật khẩu không chính xác");
        notify();
      });
  };

  return (
    <Layout style={{ backgroundColor: "#f0f2f5",width:"100%", height:"100vh" }}>
      <ToastContainer />
      <Content>
        <Item>
          <Layout style={{ padding: "120px 0 16px" }}>
            <img
              style={{ height: "106px", margin: "-28px" }}
              src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
              alt=""
            />
          </Layout>
          <Text style={{ fontSize: "20px", fontWeight: "500" }}>
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </Text>
        </Item>

        <Box>
          <Container>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email hoặc số điện thoại"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
            />
            <Button
              onClick={handleLogIn}
              style={{ width: "100%", backgroundColor: "#1877f2" }}
            >
              Đăng nhập
            </Button>
            <Text
              style={{
                marginTop: "10px",
                fontSize: "14px",
                color: "#1877f2",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Quên mật khẩu ?
            </Text>
            <BorderLine />
            <Layout style={{ display: "flex" }}>
              <Button onClick={handleSetModal} style={{ margin: "auto" }}>
                Tạo tài khoản
              </Button>
            </Layout>
          </Container>
        </Box>
      </Content>

      <Resgister />
    </Layout>
  );
};

export default Login;
