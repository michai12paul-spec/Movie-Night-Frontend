import { useEffect, useState } from "react";
import ViewSerie from "../Components/ViewSerie";

const ViewSeries = () => {
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
    const [pageNum, setPageNum] = useState<number>(1);

    const fetchSeries = (pgNum: number) => {
        const getSeriesURL = `http://localhost:2811/series/pg${pgNum}`;
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
    };

    useEffect(() => {
        fetchSeries(pageNum);
    }, [pageNum]);

    const handlePageNext = () => {
        setPageNum(pg => pg + 1)
    }
    const handlePagePrev = () => {
        setPageNum(pg => pg - 1 <= 0 ? 1 : pg - 1)
    }

    return (
        <>
            <div>Series to watch!</div>

            {allSeries && allSeries.length > 0 ? (
                <div className="ml-3 flex flex-col gap-2 mt-2">
                    {allSeries.map((serie) => (
                        <ViewSerie key={serie._id} serie={serie} />
                    ))}
                </div>
            ) : (
                <p>No Series Found!</p>
            )}

            <div className="flex justify-around mt-3">
                <div className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300" onClick={handlePagePrev}>Prev</div>
                <div className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300" onClick={handlePageNext}>Next</div>
            </div>

        </>
    );
};

export default ViewSeries;