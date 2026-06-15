import { useEffect, useState } from "react";
import ViewSerie from "../Components/ViewSerie";


interface SeriesType {
    _id: string;
    title: string;
    poster: string;
    type: string;
    plot: string;
    released: string;
    genres: string[];
    imdb: {
        rating: number;
        votes: number;
    };
}

const ViewSeries = () => {

    const [allSeries, setAllSeries] = useState<SeriesType[]>([]);
    const [pageNum, setPageNum] = useState<number>(1);

    const fetchSeries = (pgNum: number) => {
        const getSeriesURL = `http://localhost:2811/series/paginate/${pgNum}`;
        const getSeriesReq = new Request(getSeriesURL, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        fetch(getSeriesReq)
            .then((res) => res.json())
            .then((data) => {

                const seriesArray =
                    data.series ||
                    data.data ||
                    data;

                console.log(
                    "Actual Array:",
                    seriesArray
                );

                setAllSeries(seriesArray);
            })

            .catch((err) =>
                console.log(err)
            );
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

            {allSeries.length > 0 ? (
                <div className="ml-3 grid grid-cols-4 gap-4 mt-2">

                    {allSeries.map((series) => (

                        <div
                            key={series._id}

                            
                            // onClick={() =>
                            //     window.location.href =
                            //     `/series/${series._id}`
                            // }

                            
                            className="cursor-pointer"
                        >

                            
                            <ViewSerie
                                serie={series}
                            />

                        </div>

                    ))}

                </div>
            ) : (
                <p>No Series Found!</p>


            )}

            <div className="flex justify-around mt-3">
                <div className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300" onClick={handlePagePrev}>Prev</div>

                <div>Page {pageNum}</div>

                <div className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300" onClick={handlePageNext}>Next</div>
            </div>

        </>
    );
};

export default ViewSeries;