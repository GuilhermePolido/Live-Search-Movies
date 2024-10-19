import DefaultLayout from "../../components/defaultlayout/DefaultLayout";
import MoviesSearch from "../../components/moviessearch/MoviesSearch";
import { StyledMovie } from "./Movies.Styled";

export default function Movies() {
  return (
    <DefaultLayout
    >
      <StyledMovie.Content>
        <MoviesSearch />
      </StyledMovie.Content>
    </DefaultLayout>
  );
}
