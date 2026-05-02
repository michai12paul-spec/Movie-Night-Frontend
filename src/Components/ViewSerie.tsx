import { useNavigate } from "react-router-dom";

interface SerieType {
    _id: string;
    title: string;
    plot: string;
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
            <div>Movie: {serie.title}</div>
            <div>Plot: {serie.plot}</div>
            <div>Genre: {serie.genres}</div>
        </div>
    );
};

export default ViewSerie;