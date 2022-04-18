import React from "react";
import { Avatar } from "../navigation/styled";
import {
  friends,
  community,
  market,
  watch,
  memory,
} from "../../images/link";
import {  Box, Leftbar } from "./styled";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selector";


const LeftBar = () => {
  const user = useSelector(userSelector)
  return (
    <Leftbar>
      <Box>
        <Avatar src={user.photoURL} />
        {user.displayName}
      </Box>
      <Box>
        <Avatar src={friends} />
        Bạn bè
      </Box>
      <Box>
        <Avatar src={community} />
        Cộng đồng
      </Box>
      <Box>
        <Avatar src={market} />
        Market
      </Box>
      <Box>
        <Avatar src={watch} />
        Watch
      </Box>
      <Box>
        <Avatar src={memory} />
        Kỷ niệm
      </Box>
    </Leftbar>
  );
};

export default LeftBar;
