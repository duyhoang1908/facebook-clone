import { db } from "./config";
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { nanoid } from "@reduxjs/toolkit";
import { async } from "@firebase/util";

export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createAt: Date.now(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addRoomChat = (roomData) => {
  addDocument("rooms", roomData);
};

export const addPost = (postData) => {
  addDocument("posts", postData);
};

export const getUserWithUid = async (uid) => {
  let data = {};
  const q = query(collection(db, "user"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = { ...doc.data(), id: doc.id };
  });
  return data;
};

export const getPostWithUid = async (uid) => {
  let data = [];
  const q = query(collection(db, "posts"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const handleOpenMess = (user, guest) => {
  addRoomChat({
    name: [user.displayName, guest.displayName],
    members: [user.uid, guest.uid],
    id: nanoid(),
  });
};

export const updatePost = async (authImg,text,id) => {
  const postRef = doc(db,"posts",id)
  await updateDoc(postRef,{
    caption:text
  })
}

export const getUserWithName = async(name) => {
  let data = {};
  const q = query(collection(db, "user"), where("displayName", "==", name));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = { ...doc.data(), id: doc.id };
  });
  return data;
}