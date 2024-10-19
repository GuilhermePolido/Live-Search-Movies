import { StyledLabel } from "./Label.Styled";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label({ children, ...props }: LabelProps) {
  return (
    <StyledLabel {...props}>
      {children}
    </StyledLabel>
  );
}
