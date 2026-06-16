import { useEffect, useState } from "react";
import ViewSerie from "../Components/ViewSerie";

interface SeriesType {
    _id: string;
    title: string;
    type: string;
    plot: string;
    poster: string;
    released: string;
    genres: string[];
    imdb: {
        rating: number;
        votes: number;
    };
}
const FavesPage = () => {

    const [allSeries, setAllSeries] = useState<SeriesType[]>([]);

    useEffect(() => {
        const getFavesURL = `http://localhost:2811/faves/all`;

        fetch(getFavesURL, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("API data:", data);
                setAllSeries(data);
            })
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    return (
        <>
            <div>Your Favourites!</div>

            {allSeries.length > 0 ? (
                <div className="ml-3 flex flex-col gap-2 mt-2">
                    {allSeries.map((serie) => (
                        <ViewSerie key={serie._id} serie={serie} />
                    ))}
                </div>
            ) : (
                <p>No favourites found!</p>
            )}
        </>
    );
};

export default FavesPage;