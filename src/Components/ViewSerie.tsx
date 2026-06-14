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
        className="mt-6 cursor-pointer hover:scale-105 duration-200 border rounded shadow-lg overflow-hidden w-70"
        onClick={handleViewSerie}
    >
        <img
            src={serie.poster}
            alt={`${serie.title} poster`}
            className="object-cover w-full shadow-lg"
        />
    </div>
);
};

export default ViewSerie;