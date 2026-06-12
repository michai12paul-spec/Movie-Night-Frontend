import { useNavigate } from "react-router-dom";

interface SerieType {
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

const ViewSerie = ({ serie }: { serie?: SerieType }) => {

    console.log("serie:", serie);
    const navigate = useNavigate();

    if (!serie) {
        return <div>No serie data</div>;
    }

    const handleViewSerie = () => {
        navigate(`/series/${serie._id}`);
    };

    return (
        <div
            className="bg-gray-300 border-2 w-95 text-bold cursor-pointer"
            onClick={handleViewSerie}
        >
            <div>Series: {serie.title}</div>
            <div>Plot: {serie.plot}</div>
            <div>Genre: {serie.genres.join(", ")}</div>
            <div><img src={serie.poster} alt={`${serie.title} poster`} className="w-55 h-auto" /></div>
        </div>
    );
};

export default ViewSerie;