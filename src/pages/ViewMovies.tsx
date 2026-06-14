import { useEffect, useState } from "react";
import ViewMovie from "../Components/ViewMovie";

const ViewMovies = () => {
    interface MoviesType {
        _id: string;
        title: string;
        type: string;
        plot: string;
        released: string;
        poster: string;
        genres: string[];
        imdb: {
            rating: number;
            votes: number;
        };
    }

    const [allMovies, setAllMovies] = useState<MoviesType[]>([]);
    const [pageNum, setPageNum] = useState<number>(1);

    const fetchMovies = (pgNum: number) => {
        const getMoviesURL = `http://localhost:2811/movie/pg${pgNum}`;
        const getMoviesReq = new Request(getMoviesURL, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        fetch(getMoviesReq)
            .then((res) => res.json())
            .then((data) => {
                console.log("API data:", data);
                //console.log(data);
                setAllMovies(data);
            });
    };

    useEffect(() => {
        fetchMovies(pageNum);
    }, [pageNum]);

    const handlePageNext = () => {
        setPageNum(pg => pg + 1)
    }
    const handlePagePrev = () => {
        setPageNum(pg => pg - 1 <= 0 ? 1 : pg - 1)
    }

    return (
        <>
            <div>Movies to watch!</div>

             {allMovies && allMovies.length > 0 ? (
                <div className="ml-3 grid grid-cols-4 gap-4 mt-2">
                    {allMovies.map((movie) => (
                        <ViewMovie key={movie._id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p>No Movies Found!</p>
            )}

            {/* {allMovies && allMovies.length > 0 ? (
                <div className="ml-3 flex flex-col gap-2 mt-2">
                    {allMovies.map((movie) => (
                        <ViewMovie key={movie._id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p>No Movies Found!</p>
            )} */}

            <div className="flex justify-around mt-3">
                <div className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300" onClick={handlePagePrev}>Prev</div>

                <div>Page {pageNum}</div>

                <div className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300" onClick={handlePageNext}>Next</div>
            </div>

        </>
    );
};

export default ViewMovies;