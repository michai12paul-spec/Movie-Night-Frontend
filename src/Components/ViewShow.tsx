import { format } from "date-and-time";

interface ShowType {
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

const ViewShow = ({ show }: { show?: ShowType }) => {
    if (!show) {
        return <div>No show data</div>;
    }

    const handleViewShows = () => {
        fetch(`http://localhost:5173/shows/${show._id}`)
            .then(res => res.json())
            .then(msg => {
                console.log(msg);
            });
    };

    return (
        <div className="mb-3 p-3 border-2 w-75 cursor-pointer" onClick={handleViewShows}>
            <div>Movie: {show.title}</div>
            <div>Plot: {show.plot}</div>
            <div>
                Release Date: {format(new Date(show.released), 'MMM DD YYYY')}
            </div>
            <div>Genre: {show.genres.join(', ')}</div>
            <div>IMDb Rating: {show.imdb.rating}</div>
            <div>IMDb Votes: {show.imdb.votes}</div>
        </div>
    );
};

export default ViewShow;