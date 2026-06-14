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
    const navigate = useNavigate();

    if (!movie) {
        return <div>No movie data</div>;
    }

    const handleViewMovie = () => {
        navigate(`/movie/${movie._id}`);
    };

    return (
        <div
            className="mt-6 cursor-pointer hover:scale-105 duration-200 border rounded shadow-lg overflow-hidden w-70"
            onClick={handleViewMovie}
        >
            <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="object-cover w-full shadow-lg"
            />
        </div>
    );
};

export default ViewMovie;