import { useState } from "react";
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
    const [data, setData] = useState<ShowType | null>(show || null);

    if (!data) {
        return <div>No show data</div>;
    }

    const handleViewShows = async () => {
        try {
            const res = await fetch(`http://localhost:5173/show/${data._id}`);
            const result = await res.json();

            console.log(result);

            // ✅ update UI with fetched data
            setData(result);
        } catch (err) {
            console.error("Error fetching show:", err);
        }
    };

    return (
        <div
            className="mb-3 p-3 border-2 w-75 cursor-pointer"
            onClick={handleViewShows}
        >
            <div>Movie: {data.title}</div>
            <div>Plot: {data.plot}</div>
            <div>
                Release Date:{" "}
                {format(new Date(data.released), "MMM DD YYYY")}
            </div>
            <div>Genre: {data.genres.join(", ")}</div>
            <div>IMDb Rating: {data.imdb.rating}</div>
            <div>IMDb Votes: {data.imdb.votes}</div>
        </div>
    );
};

export default ViewShow;