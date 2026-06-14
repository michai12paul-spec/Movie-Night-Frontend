import { useEffect, useState } from "react";
import ViewSerie from "../Components/ViewSerie";
import ViewMovie from "../Components/ViewMovie";

interface MediaType {
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

const HomePage = () => {
    // const [media, setMedia] = useState<MediaType[]>([]);
    const [filteredMedia, setFilteredMedia] = useState<MediaType[]>([]);
    const [pageNum, setPageNum] = useState<number>(1);
    const [filter, setFilter] = useState("all");

    const fetchMedia = async (pgNum: number) => {
        let data: MediaType[] = [];

        if (filter === "movies" || filter === "all") {
            const movies = await fetch(
                `http://localhost:2811/movie/pg${pgNum}`
            ).then(res => res.json());

            data = [...data, ...movies];
        }

        if (filter === "series" || filter === "all") {
            const series = await fetch(
                `http://localhost:2811/series/pg${pgNum}`
            ).then(res => res.json());

            data = [...data, ...series];
        }

        console.log("Fetched data:", data);

        const shuffled = data.sort(
            () => Math.random() - 0.5
        );

        setMedia(shuffled);
        setFilteredMedia(shuffled);
    };

    useEffect(() => {
        fetchMedia(pageNum);
    }, [pageNum, filter]);

    const handlePageNext = () => {
        setPageNum(pg => pg + 1);
    };

    const handlePagePrev = () => {
        setPageNum(pg => (pg - 1 <= 0 ? 1 : pg - 1));
    };

    return (
        <div>
            <h1>HomePage</h1>

            <div className="ml-3 mt-3">
                <label className="mr-2 font-bold">
                    Filter:
                </label>

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="all">
                        All
                    </option>

                    <option value="movies">
                        Movies
                    </option>

                    <option value="series">
                        Series
                    </option>
                </select>
            </div>

            {filteredMedia.length > 0 ? (
                <div className="ml-3 grid grid-cols-4 gap-4 mt-2">
                    {filteredMedia.map((item) =>
                        item.type === "series" ? (
                            <ViewSerie
                                key={item._id}
                                serie={item}
                            />
                        ) : (
                            <ViewMovie
                                key={item._id}
                                movie={item}
                            />
                        )
                    )}
                </div>
            ) : (
                <p>No Media Found!</p>
            )}

            <div className="flex justify-around mt-3">
                <div
                    className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300"
                    onClick={handlePagePrev}
                >
                    Prev
                </div>

                <div>Page {pageNum}</div>

                <div
                    className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300"
                    onClick={handlePageNext}
                >
                    Next
                </div>
            </div>
        </div>
    );
};

export default HomePage;