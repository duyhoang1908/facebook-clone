import React from 'react'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { Option, OptionBtn } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { statusSelector } from '../../store/selector';
import { modalSlice } from '../../store/Slice/modalSlice';
import { postSlice } from '../../store/Slice/postSlice';


const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
}

const EditPost = ({option,post}) => {
  const dispatch = useDispatch()
  const status = useSelector(statusSelector);
  const handleEditPost = () => {
    dispatch(postSlice.actions.setIsUpdate(true))
    dispatch(postSlice.actions.setCurrentPost(post))
    dispatch(modalSlice.actions.setSatus(!status))
  };

  return (
    <Option style={{ display: option ? "block" : "none" }}>
        <OptionBtn onClick={handleEditPost}><i class="fa-solid fa-pen"></i>  Chỉnh sửa bài viết</OptionBtn>
        <OptionBtn onClick={() => deletePost(post.id)} ><i class="fa-solid fa-trash-can"></i>  Xóa bài viết</OptionBtn>
    </Option>
  )
}

export default EditPost