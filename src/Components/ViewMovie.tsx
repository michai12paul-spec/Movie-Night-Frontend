import { useNavigate } from "react-router-dom";

interface MovieType {
    _id: string;
    title: string;
    plot: string;
    poster: string;
    genres: string[];
    imdb: {
        rating: number;
        votes: number;
    };
}

const ViewMovie = ({ movie }: { movie?: MovieType }) => {

    console.log("movie:", movie);
    const navigate = useNavigate();

    if (!movie) {
        return <div>No movie data</div>;
    }

    const handleViewMovie = () => {
        navigate(`/movie/${movie._id}`);
    };

    return (
        <div
            className="bg-gray-300 border-2 w-95 text-bold cursor-pointer"
            onClick={handleViewMovie}
        >
            <div>Movie: {movie.title}</div>
            <div>Plot: {movie.plot}</div>
            <div>Genre: {movie.genres.join(", ")}</div>
            {/* <div>Rating: {movie.imdb.rating}</div> */}
            <div><img src={movie.poster} alt={`${movie.title} poster`} className="w-55 h-auto" /></div>
        </div>
    );
};

export default ViewMovie;