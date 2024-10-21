import { StyledHighlight } from './Highlight.Styled';

type HighlightProps = {
    children: string;
    term: string;
};

export default function Highlight({ children, term }: HighlightProps) {
    const lowerText = children.toLowerCase();
    const lowerSearchTerm = term.toLowerCase();

    const startIndex = lowerText.indexOf(lowerSearchTerm);
    if (startIndex === -1) {
        return <StyledHighlight.Text>{children}</StyledHighlight.Text>;
    }

    const beforeMatch = children.slice(0, startIndex);
    const match = children.slice(startIndex, startIndex + term.length);
    const afterMatch = children.slice(startIndex + term.length);

    return (
        <StyledHighlight.Text>
            {beforeMatch}
            <StyledHighlight.Highlight>{match}</StyledHighlight.Highlight>
            {afterMatch}
        </StyledHighlight.Text>
    );
}
