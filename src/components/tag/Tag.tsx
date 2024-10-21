import { ReactNode } from 'react';
import { StyledTag } from './Tag.Styled';

type TagProps = {
    children: ReactNode;
};

export default function Tag({ children }: TagProps) {
    return <StyledTag>{children}</StyledTag>;
}
