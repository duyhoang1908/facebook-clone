import styled from "@emotion/styled";

export const Leftbar = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const Box = styled.div`
  display: flex;
  padding: 8px;
  color: #000;
  font-size: 14px;
  align-items: center;
  border-radius: 8px;
  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
`;