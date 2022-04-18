import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  ModalLayout,
  Text,
  BorderLine,
  Input,
} from "../../pages/styled";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  statusSelector,
  userSelector,
  currentPostSelector,
  isUpdateSelector,
} from "../../store/selector";
import { modalSlice } from "../../store/Slice/modalSlice";
import { Button } from "@mui/material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addPost, updatePost } from "../../firebase/services";
import { postSlice } from "../../store/Slice/postSlice";

const StatusBox = () => {
  const status = useSelector(statusSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const currentPost = useSelector(currentPostSelector);
  const isUpdate = useSelector(isUpdateSelector);

  const [fileImage, setFileImage] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [loading, setLoading] = useState({ loading: false, progress: null });
  const [caption, setCaption] = useState("");

  console.log(isUpdate);
  console.log(currentPost);

  const handleSetModal = () => {
    setCaption("");
    resetImg()
    dispatch(postSlice.actions.setIsUpdate(false));
    dispatch(postSlice.actions.setCurrentPost({}));
    dispatch(modalSlice.actions.setSatus(!status));
  };
console.log(currentPost)
  useEffect(() => {
    if (isUpdate) {
      setCaption(currentPost.caption);
    }
    return () => {
      fileImage && URL.revokeObjectURL(fileImage.preview);
    };
  }, [fileImage, currentPost, isUpdate]);

  const handleSetImg = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const resetImg = () => {
    setFileImage(null);
    setImgPreview(null);
  };

  const handlePostStatus = () => {
    const postInfo = {
      nameAuth: user.displayName,
      imgAuth: user.photoURL,
      uid: user.uid,
      like: [],
      caption,
      image: "",
      comment: [],
      time: Date.now(),
    };

    if (caption && !imgPreview) {
      addPost(postInfo);
      handleSetModal();
      resetImg();
      setCaption("");
    } else {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${fileImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoading({ loading: true, progress: progress });
        },
        (error) => {
          setLoading({ loading: false, progress: null });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            postInfo.image = downloadURL;
            addPost(postInfo);
            setLoading({ loading: false, progress: null });
            handleSetModal();
          });
        }
      );
    }
  };

  const handleSubmit = () => {
    if(isUpdate){
      updatePost(user.photoURL,caption,currentPost.id)
      handleSetModal()
    }
    else{
      handlePostStatus()
    }
  }

  return (
    <ModalLayout style={{ display: status ? "block" : "none" }}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(-50%,-50%)",
          left: "50%",
          backgroundColor: " #fff",
          color: "#fff",
        }}
      >
        <Container>
          <Text
            style={{
              textAlign: "center",
              color: "#000",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Tạo bài viết
          </Text>
          <BorderLine />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar style={{ marginRight: "10px" }} src={user.photoURL} />
            {user.displayName}
          </div>
          <div>
            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={{
                backgroundColor: "unset",
                outline: "none",
                border: "none",
                color: "#000",
              }}
              type="text"
              placeholder={user.displayName + " ơi, bạn đang nghĩ gì thế?"}
            />
          </div>
          <div style={{display:isUpdate?"none":"block"}}>
            <label htmlFor="file-upload">
              <i
                className="fa-solid fa-images"
                style={{
                  color: "green",
                  fontSize: "20px",
                  padding: "10px",
                  cursor: "pointer",
                }}
              ></i>
            </label>
            <input
              onChange={handleSetImg}
              id="file-upload"
              type="file"
              style={{ display: "none" }}
            />
          </div>
        </Container>
        <Text
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            padding: "10px 15px",
            fontWeight: "bold",
            fontSize: "20px",
            cursor: "pointer",
            color: "#000",
          }}
          onClick={handleSetModal}
        >
          x
        </Text>
        {imgPreview && (
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              style={{ width: "200px", height: "150px", objectFit: "cover" }}
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
        <Button onClick={handleSubmit} style={{ width: "100%" }}>
          {loading.loading
            ? "Đang upload " + Math.floor(loading.progress) + " %"
            : "Chia sẻ"}
        </Button>
      </Box>
    </ModalLayout>
  );
};

export default StatusBox;
