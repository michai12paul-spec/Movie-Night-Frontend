import { useState } from "react";
import ViewSerie from "../Components/ViewSerie";

const FavesPage = () => {
    interface SeriesType {
        _id: string;
        title: string;
        type: string;
        plot: string;
        released: string;
        genres: string[];
        imdb: {
            rating: number;
            votes: number;
        };
    }

     const [allSeries, setAllSeries] = useState<SeriesType[]>([]);
    
    
        const getSeriesURL = `http://localhost:2811/faves/series`;
        const getSeriesReq = new Request(getSeriesURL, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        fetch(getSeriesReq)
            .then((res) => res.json())
            .then((data) => {
                console.log("API data:", data);
                //console.log(data);
                setAllSeries(data);
            });
    

    

    return (
        <>
            <div>Your Favourites!</div>

            {allSeries && allSeries.length > 0 ? (
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




export default FavesPage