import styled from "@emotion/styled";

export const ModalLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index:10;
  top: 0;
  left: 0;
  right: 0;
`;

export const Box = styled.div`
  margin: auto;
  width: 450px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const Text = styled.div`
  color: #000;
`;

export const Input = styled.input`
  width: 100%;
  padding: 11px;
  border: 1px solid #000;
  border-radius: 8px;
  margin-top: 10px;
  font-size: 14px;
`;
export const Button = styled.button`
  margin-top: 10px;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  background-color: #42b72a;
`;

export const GridLayout = styled.div`
  display: grid;
  column-gap: 0.25rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

export const Container = styled.div`
  padding: 20px;
`;

export const BorderLine = styled.span`
  display: block;
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin:16px 0;
`;
