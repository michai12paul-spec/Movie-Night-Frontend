import { format } from "date-and-time";

interface MovieType {
    _id: string;
    title: string;
    plot: string;
    released: string;
    genres: string[];
    imdb: {
        rating: number;
        votes: number;
    };
}

const ShowMovie = ({ movie }: { movie?: MovieType }) => {
    if (!movie) {
        return <div>No movie data</div>;
    }

    return (
        <div className="mb-3 p-3 border-2 w-75">
            <div>Movie: {movie.title}</div>
            <div>Plot: {movie.plot}</div>
            <div>
                Release Date: {format(new Date(movie.released), 'MMM DD YYYY')}
            </div>
            <div>Genre: {movie.genres.join(', ')}</div>
            <div>IMDb Rating: {movie.imdb.rating}</div>
            <div>IMDb Votes: {movie.imdb.votes}</div>
        </div>
    );
};

export default ShowMovie;