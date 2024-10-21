import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledDefaultLayout = {
    Container: styled.div`
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        user-select: none;
        background-color: #d8d4d8;
        align-items: center;
    `,
    Header: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #006eff;
        height: 80px;
        box-shadow: 0px 12px 16px -4px #10182814;
        width: 100%;
    `,
    Content: styled.div`
        display: flex;
        height: 100%;
        flex-grow: 1;
        max-width: 1200px;
        background-color: #fff;
        box-shadow: 0px 12px 16px -4px #10182814;
        width: 100%;
    `,

    HeaderContent: styled.div`
        display: flex;
        height: 100%;
        flex-grow: 1;
        max-width: 1200px;
    `,
    Title: styled.div`
        font-family: 'Work Sans', sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        color: #fff;
    `,
    Logo: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-right: 20px;
    `,
    Menu: styled.div`
        display: flex;
    `,
    MenuItem: styled(NavLink)`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0 30px;
        cursor: pointer;

        font-family: 'Work Sans', sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        color: #fff;
        user-select: none;
        text-decoration: none;

        &:hover {
            background-color: #2784fd;
        }
        &:active {
            background-color: #0968e4;
        }
        &.active {
            background-color: #3b81f1;
            font-weight: bold;
        }
    `,
};
