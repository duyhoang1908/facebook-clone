import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db } from "../../firebase/config";
import { TypograpyText } from "../ChatWindow/ChatSideBar";
import { Box, ModalLayout } from "../../pages/styled";
import { useDispatch, useSelector } from "react-redux";
import { userIdSelector, userSelector } from "../../store/selector";
import { userSlice } from "../../store/Slice/userSlice";
import { UpdateBtn } from "./styled";

const UpdateProfile = () => {
  const [fileImage, setFileImage] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const dispatch = useDispatch();

  const USERID = useSelector(userIdSelector);
  const user = useSelector(userSelector);

  useEffect(() => {
    return () => {
      fileImage && URL.revokeObjectURL(fileImage.preview);
    };
  }, [fileImage]);

  const handleSetImg = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const resetImg = () => {
    setFileImage(null);
    setImgPreview(null);
  };

  const handleUpdateAvatar = () => {
    if (fileImage) {
      const storage = getStorage();
      const storageRef = ref(storage, `avatar/${fileImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const userRef = doc(db, "user", USERID);
            await updateDoc(userRef, {
              photoURL: downloadURL,
            });
            dispatch(
              userSlice.actions.setUser({
                ...user,
                photoURL: downloadURL,
              })
            );
            setIsModal(false);
          });
        }
      );
      resetImg();
    }
  };

  return (
    <div>
      <TypograpyText
        style={{ cursor: "pointer" }}
        onClick={() => setIsModal(true)}
      >
        Cập nhập ảnh đại diện
      </TypograpyText>

      <ModalLayout style={{ display: isModal ? "block" : "none" }}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            transform: "translate(-50%,-50%)",
            left: "50%",
            backgroundColor: " #fff",
            color: "#000",
            textAlign: "center",
            display:"flex",
            flexDirection:"column"
          }}
        >
          <UpdateBtn>
            <label style={{ cursor: "pointer" }} htmlFor="file-upload">
              Chọn ảnh từ thiết bị
            </label>
            <input
              onChange={handleSetImg}
              id="file-upload"
              type="file"
              style={{ display: "none" }}
            />
          </UpdateBtn>

          {imgPreview && (
            <div style={{ position: "relative", padding: "0 20px" }}>
              <img
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
                src={imgPreview}
                alt=""
              />
              <i
                onClick={resetImg}
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "#000",
                  borderRadius: "50%",
                  padding: "8px",
                  fontSize: "6px",
                  cursor: "pointer",
                }}
                className="fa-solid fa-x"
              ></i>
            </div>
          )}

          {fileImage && <UpdateBtn onClick={handleUpdateAvatar}>Thay đổi</UpdateBtn>}

          <UpdateBtn onClick={() => setIsModal(false)}>Hủy</UpdateBtn>
        </Box>
      </ModalLayout>
    </div>
  );
};

export default UpdateProfile;
