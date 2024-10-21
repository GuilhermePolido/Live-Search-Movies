import { Genre, Movie } from '../models/MovieModel';
import { getApi } from '../utils/api';

const ENDPOINT_SEARCH = '/search/movie';
const ENDPOINT_GENRE = '/genre/movie/list';

class MovieResource {
    list = (
        params: string
    ): Promise<{
        data: {
            page: number;
            results: Movie[];
            total_pages: number;
            total_results: number;
        };
    }> => {
        return getApi().get(`${ENDPOINT_SEARCH}?${params}`);
    };

    listGenres = (): Promise<{
        data: {
            genres: Genre[];
        };
    }> => {
        return getApi().get(ENDPOINT_GENRE);
    };
}

export default new MovieResource();
