import React, { useState } from "react";
import {
  GridLayout,
  Text,
  Container,
  Button,
  Input,
  Box,
  ModalLayout,
} from "../styled";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { avatar } from "../../images/link";
import { addDocument } from "../../firebase/services";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerSelector } from "../../store/selector";
import { modalSlice } from "../../store/Slice/modalSlice";

const Resgister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerInEmail, setRegisterInEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const dispatch = useDispatch();

  const register = useSelector(registerSelector);

  const handleSetModal = () => {
    dispatch(modalSlice.actions.setRegister(!register));
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setRegisterInEmail("");
    setRegisterPassword("");
  };

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(
      auth,
      registerInEmail,
      registerPassword
    )
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: firstName + " " + lastName,
          photoURL: avatar,
        });

        addDocument("user", {
          displayName: firstName + " " + lastName,
          photoURL: avatar,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          providerId: userCredential.user.providerId,
          friendList:[]
        });

        const notify = () => toast("Đăng ký thành công");
        notify();
        handleSetModal();
        resetForm();
      })
      .catch((error) => {
        console.log(error);
        const notify = () => toast("Đăng ký thất bại");
        notify();
      });
  };

  return (
    <ModalLayout style={{ display: register ? "block" : "none" }}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(-50%,-50%)",
          left: "50%",
        }}
      >
        <Container>
          <Text
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              padding: "10px 15px",
              fontWeight: "bold",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={handleSetModal}
          >
            x
          </Text>
          <Text style={{ fontSize: "30px", fontWeight: "bold" }}>Đăng ký</Text>
          <Text style={{ fontSize: "16px" }}>Nhanh chóng và dễ dàng</Text>
        </Container>

        <Container>
          <GridLayout>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Họ"
            />
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Tên"
            />
          </GridLayout>
          <Input
            value={registerInEmail}
            onChange={(e) => setRegisterInEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            placeholder="Mật khẩu"
          />
          <Button onClick={handleRegister}>Đăng ký</Button>
        </Container>
      </Box>
    </ModalLayout>
  );
};

export default Resgister;
