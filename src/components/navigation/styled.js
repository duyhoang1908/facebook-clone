import styled from "@emotion/styled";

export const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: RGB(255, 255, 255);
  color: #000;
  padding: 10px;
  z-index: 100;
`;
export const Form = styled.form`
  background-color: #f0f2f5;
  border: none;
  border-radius: 20px;
  padding: 10px;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Icon = styled.div`
  text-align: center;
  height: 100%;
  border-radius: 10px;
  padding: 5px 10px;
  color: #000;
  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
`;

export const Text = styled.div``;
