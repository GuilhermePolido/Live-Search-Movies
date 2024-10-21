import { StyledInputHelper } from './InputHelper.Styled';

type InputHelperProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function InputHelper({ children, ...props }: InputHelperProps) {
    return <StyledInputHelper {...props}>{children}</StyledInputHelper>;
}
