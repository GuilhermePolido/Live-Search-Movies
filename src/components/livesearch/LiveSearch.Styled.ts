import styled from "styled-components";
import OrignalInput from "../input/Input";

const Content = styled.div`
  position: relative;
  width: 100%;
`;

const InputContent = styled.div`
  position: relative;
`;

const ArrowContent = styled.div`
  position: absolute;
  top: 0px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  right: 0px;
`;

const Suggestion = styled.span<{ offset: number }>`
  font-family: "Work Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #8e8e8e;

  position: absolute;
  top: 50%;
  left: ${(props) => props.offset}px;

  transform: translateY(-50%);
  pointer-events: none;
`;

const Input = styled(OrignalInput)`
  padding-right: 45px;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 84px;
  left: 0;
  right: 0;
  max-height: 320px;
  min-height: 80px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #8e8e8e;
  border-radius: 8px;
  list-style-type: none;
  margin: 0;
  padding: 8px 0;
  z-index: 10;

  box-shadow: 0px 12px 16px -4px #10182814;
`;

const ListItem = styled.li<{ matchAll: boolean; navigationIsHere: boolean }>`
  display: flex;
  align-items: center;
  height: 40px;
  margin: 0 6px;
  box-sizing: border-box;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    ${(props) => {
      if (!props.matchAll) {
        return `
          background-color: #d2d2d2;
        `;
      }
    }}
  }

  ${(props) => {
    if (props.matchAll) {
      return `
          background-color: #e1f2ff;
          height: 100px;
          border: 1px solid ${props.navigationIsHere ? '#abd0ed' : '#e1f2ff'}
        `;
    }

    if (props.navigationIsHere) {
      return `
          background-color: #d2d2d2;
        `;
    }
  }}
`;

const ListItemFavorite = styled.div`
  margin-right: 10px;
`;

const ListItemTitle = styled.span`
  font-family: "Work Sans", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #464646;
  white-space: pre;
`;

const Highlight = styled.span`
  color: #0092ff;
  white-space: pre;
`;

const ListItemEmpty = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  margin: 0 6px;
  box-sizing: border-box;

  font-family: "Work Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #8e8e8e;
`;

export const StyledLiveSearch = {
  Content,
  InputContent,
  ArrowContent,
  Input,
  Suggestion,
  Dropdown,
  ListItem,
  ListItemTitle,
  Highlight,
  ListItemEmpty,
  ListItemFavorite,
};
