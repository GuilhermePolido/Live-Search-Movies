import styled from "styled-components";

const MatchAll = {
    Content: styled.a`
      display: flex;
      flex-grow: 1;
      height: 100%;
      padding: 10px 10px 10px 8px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      text-decoration: none;
    `,
    Informations: styled.div`
      display: flex;
      flex-direction: column;
      height: 100%;
      margin: 0 0 0 8px;
      gap: 8px;
    `,
    InformationLine: styled.div<{ gap: number }>`
      display: flex;
      gap: ${(props) => props.gap ?? 0}px;
    `,
    NormalText: styled.div`
      font-family: "Work Sans", sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: #8e8e8e;
    `,
    Gender: styled.div``,
    Image: styled.img`
      height: 80px;
      width: auto;
      border-radius: 4px;
    `,
  };

  export const StyledMoviesSearch = {
    MatchAll
  }