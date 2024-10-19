import styled from "styled-components";

const Input = styled.input`
  font-family: "Work Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #464646;
  line-height: 20px;

  width: 100%;
  height: 40px;
  padding: 10px 12px;

  border: 1px solid #616161;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #8E8E8E;
    font-weight: 400;
  }

  &:focus {
    border-color: #006EFF;
  }
`;

export const StyledInput = {
  Input,
};
