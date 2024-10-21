import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Home from './screen/home/Home';
import Movies from './screen/movies/Movies';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/Movies" element={<Movies />} />
        </>
    )
);

export default function AppRoutes() {
    return <RouterProvider router={router} />;
}
