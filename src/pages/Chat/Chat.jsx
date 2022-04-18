import React from 'react'
import styled from '@emotion/styled'
import ChatSideBar from '../../components/ChatWindow/ChatSideBar'
import ChatWindow from '../../components/ChatWindow/ChatWindow'

const ChatPage = styled.div`
    display:flex;
    width:100%;
    height:100vh;
    background-color:#fff;
    padding-top:70px
`

const Chat = () => {
  return (
    <ChatPage>
        <ChatSideBar />
        <ChatWindow />
    </ChatPage>
  )
}

export default Chat