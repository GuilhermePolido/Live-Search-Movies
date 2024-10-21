import { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../components/defaultlayout/DefaultLayout';
import { StyledHome } from './Home.Styled';
import Input from '../../components/input/Input';
import { Genre, Movie } from '../../models/MovieModel';
import MovieResource from '../../resources/MovieResource';
import { LocalStorageKeys } from '../../utils/LocalStorageKeys';
import Highlight from '../../components/highlight/Highlight';
import { Label } from '../../components/label/Label';

const baseUrlImage = import.meta.env.VITE_BASE_URL_IMG;
const baseUrlMovie = import.meta.env.VITE_BASE_URL_MOVIE;
const pageSize = 10;

export default function Home() {
    const [search, setSearch] = useState('');
    const [genres, setGenres] = useState<Genre[]>([]);
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [results, setResults] = useState<Movie[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalFinded, setTotalFinded] = useState<number>(1);

    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        getGenres();
        getFavorites();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search) {
                filterResults(search);
            } else {
                setResults(favorites.slice(0, currentPage * pageSize));
                setTotalFinded(favorites.length);
                setIsFetching(false);
                setTotalPages(Math.ceil(favorites.length / pageSize));
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, favorites, currentPage]);

    function handleScroll() {
        if (listRef.current && !isFetching) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;

            if (
                scrollTop + clientHeight >= scrollHeight - 10 &&
                scrollTop > 0 &&
                currentPage < totalPages
            ) {
                setIsFetching(true);
                setCurrentPage((prevPage) => prevPage + 1);
            }
        }
    }

    function filterResults(searchTerm: string) {
        const filtered = favorites.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setResults(filtered.slice(0, currentPage * pageSize));
        setTotalPages(Math.ceil(filtered.length / pageSize));
        setTotalFinded(filtered.length);
        setIsFetching(false);
    }

    function getGenres() {
        MovieResource.listGenres().then((response) => {
            setGenres(response.data.genres);
        });
    }

    function getFavorites() {
        const savedFavorites = localStorage.getItem(
            LocalStorageKeys.movieFavorites
        );
        if (savedFavorites) {
            const favoriteMovies = JSON.parse(savedFavorites);

            setFavorites(favoriteMovies);
            setResults(favoriteMovies.slice(0, pageSize));
            setTotalFinded(favoriteMovies.length);
            setTotalPages(Math.ceil(favoriteMovies.length / pageSize));
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (listRef.current) {
            listRef.current.scrollTop = 0;
        }

        setSearch(e.target.value);
        setCurrentPage(1);
    }

    function handleRowClick(movieId: number) {
        const externalUrl = `${baseUrlMovie}/${movieId}`;
        window.open(externalUrl, '_blank');
    };

    return (
        <DefaultLayout>
            <StyledHome.Container>
                <Input
                    placeholder="Buscar filme..."
                    value={search}
                    onChange={handleInputChange}
                />
                <Label>{`Mostrando ${results.length} de ${totalFinded} itens`}</Label>
                <StyledHome.Overflow>
                    <StyledHome.Table>
                        <StyledHome.Thead>
                            <tr>
                                <th>Poster</th>
                                <th>Título</th>
                                <th>Ano</th>
                                <th>Gêneros</th>
                            </tr>
                        </StyledHome.Thead>
                        <StyledHome.Tbody ref={listRef} onScroll={handleScroll}>
                            {results.map((movie, index) => (
                                <StyledHome.TbodyTr
                                    key={index}
                                    onClick={() => handleRowClick(movie.id)}
                                >
                                    <td>
                                        <StyledHome.Poster
                                            src={`${baseUrlImage}/${movie.poster_path}`}
                                            alt={`${movie.title} Poster`}
                                        />
                                    </td>
                                    <td>
                                        <Highlight term={search}>
                                            {movie.title}
                                        </Highlight>
                                    </td>
                                    <td>
                                        {new Date(
                                            movie.release_date
                                        ).getFullYear()}
                                    </td>
                                    <td>
                                        {movie.genre_ids
                                            .map(
                                                (gid) =>
                                                    genres.find(
                                                        (gen) => gid === gen.id
                                                    )?.name
                                            )
                                            .join(', ')}
                                    </td>
                                </StyledHome.TbodyTr>
                            ))}
                        </StyledHome.Tbody>
                    </StyledHome.Table>
                </StyledHome.Overflow>
            </StyledHome.Container>
        </DefaultLayout>
    );
}
