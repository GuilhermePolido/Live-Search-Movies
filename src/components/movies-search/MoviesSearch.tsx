import { StyledMoviesSearch } from "./MoviesSearch.Styled";
import { ReactNode, useEffect, useState } from "react";
import { Movie, Genre } from "../../models/MovieModel";
import Tag from "../tag/Tag";
import LiveSearch from "../livesearch/LiveSearch";
import { StyledLiveSearch } from "../livesearch/LiveSearch.Styled";
import MovieResource from "../../resources/MovieResource";

const baseUrlImage = import.meta.env.VITE_BASE_URL_IMG;
const baseUrlMovie = import.meta.env.VITE_BASE_URL_MOVIE;

export default function MoviesSearch() {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    getGenres();
  }, []);

  function getGenres() {
    MovieResource.listGenres().then((response) => {
      setGenres(response.data.genres);
    });
  }

  async function fetchData(query: string, page: number) {
    const params = new URLSearchParams({
      query,
      include_adult: "false",
      language: "en-US",
      page: String(page),
    });

    return MovieResource.list(params.toString());
  }

  function renderMatchAll(item: Movie, renderedTitle: ReactNode) {
    let year = "";

    if (item.release_date != null) {
      year = `(${new Date(item.release_date).getFullYear()})`;
    }

    return (
      <StyledMoviesSearch.MatchAll.Content href={`${baseUrlMovie}/${item.id}`} target="_blank">
        <StyledMoviesSearch.MatchAll.Image
          src={`${baseUrlImage}/${item.poster_path}`}
          alt={item.title}
        />
        <StyledMoviesSearch.MatchAll.Informations>
          <StyledMoviesSearch.MatchAll.InformationLine gap={4}>
            <StyledLiveSearch.ListItemTitle>
              {renderedTitle}
            </StyledLiveSearch.ListItemTitle>
            <StyledMoviesSearch.MatchAll.NormalText>
              {year}
            </StyledMoviesSearch.MatchAll.NormalText>
          </StyledMoviesSearch.MatchAll.InformationLine>
          <StyledMoviesSearch.MatchAll.InformationLine gap={8}>
            {item.genre_ids.map((gid) => (
              <Tag>{genres.find((gen) => gid === gen.id)?.name}</Tag>
            ))}
          </StyledMoviesSearch.MatchAll.InformationLine>
        </StyledMoviesSearch.MatchAll.Informations>
      </StyledMoviesSearch.MatchAll.Content>
    );
  }

  function renderItem(item: Movie, renderedTitle: ReactNode) {
    return (
      <StyledMoviesSearch.MatchAll.Content href={`${baseUrlMovie}/${item.id}`} target="_blank">
        {renderedTitle}
      </StyledMoviesSearch.MatchAll.Content>
    );
  }

  return (
    <LiveSearch<Movie>
      label="Pesquise um filme"
      placeholder="Ex: Star Wars"
      titleField="title"
      identifierField="id"
      renderMatchAll={renderMatchAll}
      renderItem={renderItem}
      handleSearch={fetchData}
    />
  );
}
