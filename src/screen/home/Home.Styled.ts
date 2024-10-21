import styled from 'styled-components';

export const StyledHome = {
    Container: styled.div`
        display: flex;
        width: 100%;
        padding: 20px;
        flex-direction: column;
        gap: 20px;
        box-sizing: border-box;
    `,

    Overflow: styled.div`
        display: flex;
        flex-grow: 1;
        flex-basis: 0;
        overflow: hidden;
    `,

    Table: styled.table`
        width: 100%;
        border-collapse: collapse;

        font-family: 'Work Sans', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: #464646;

        thead {
            background-color: #006eff;
            color: white;
        }

        th,
        td {
            padding: 10px;
            text-align: left;
            cursor: pointer;
        }

        tr:nth-child(even) {
            background-color: #eee;
        }
    `,

    Tbody: styled.tbody`
        display: block;
        max-height: calc(100vh - 270px);
        overflow-y: auto;
        width: 100%;
    `,

    Thead: styled.thead`
        display: table;
        width: 100%;
        table-layout: fixed;
    `,

    TbodyTr: styled.tr`
        display: table;
        width: 100%;
        table-layout: fixed;
    `,

    Poster: styled.img`
        height: 80px;
        width: auto;
        border-radius: 4px;
    `,
};
