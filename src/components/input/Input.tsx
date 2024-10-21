import { forwardRef } from 'react';
import { StyledInput } from './Input.Styled';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input(
    { type = 'text', ...props }: InputProps,
    ref: React.Ref<HTMLInputElement>
) {
    return <StyledInput.Input type={type} ref={ref} {...props} />;
}

export default forwardRef(Input);
