import React from 'react'
import styled from "@emotion/styled";
import LeftBar from '../LeftBar/LeftBar';
import Center from '../Center/Center';
import RightBar from '../RightBar/RightBar';


const HomePages = styled.div`
  background-color: RGB(240, 242, 245);
  padding-top:70px;
  display:flex;
  min-height:100vh
`

const HomePage = () => {
  return (
    <HomePages>
        <LeftBar />
        <Center />
        <RightBar />
    </HomePages>
  )
}

export default HomePage