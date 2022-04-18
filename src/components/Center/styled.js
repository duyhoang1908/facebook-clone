import styled from "@emotion/styled";

export const CenterBar = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const Box = styled.div`
  display: flex;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #fff;
  align-items: center;
`;
export const Content = styled.div`
  margin: 0 auto;
  width: 500px;
`;

export const Option = styled.div`
  background-color:#fff;
  border-radius:10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

export const OptionBtn = styled.button`
  width: 100%;
  padding: 10px 15px;
  text-align: start;
  &:hover{
    background-color: RGB(240, 242, 245);
    cursor:pointer
}
`;
