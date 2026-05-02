import { useState } from "react";
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
    const [data] = useState<SerieType | null>(serie || null);
    const navigate = useNavigate();

    if (!data) {
        return <div>No serie data</div>;
    }

    const handleViewSerie = () => {
        navigate(`/series/${data._id}`);
    };

    return (
        <div
            className="bg-gray-300 border-2 w-95 text-bold cursor-pointer"
            onClick={handleViewSerie}
        >
            <div>Movie: {data.title}</div>
            <div>Plot: {data.plot}</div>
            <div>Genre: {data.genres.join(", ")}</div>
        </div>
    );
};

export default ViewSerie;