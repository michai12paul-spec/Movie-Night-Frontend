import { useEffect, useState, type ChangeEvent } from "react";
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
    const [media, setMedia] = useState<MediaType[]>([]);
    const [filteredMedia, setFilteredMedia] = useState<MediaType[]>([]);
    const [selectedGenre, setSelectedGenre] = useState('all')
    const [pageNum, setPageNum] = useState<number>(1);
    const [filter, setFilter] = useState("all");




    // Find all unique genres from the media data
    const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const genre = event.target.value
        setSelectedGenre(genre)

        setFilteredMedia(
            media.filter(item =>
                genre === 'all' ? true : item.genres.includes(genre)
            )
        )
    }










    // Fetch both movies and series based on the filter
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
        <div className="bg-zinc-600">
            <h1 className="flex flex-col p-2 ml-135 font-bold text-white text-xl">Golden Movie Night</h1>

            <div className="ml-3 mt-3 ">



                {/* Genre filter  */}
                <div>
                    <label className="mr-2 font-bold text-white text-lg ">
                        Genre Filter:
                    </label>

                    <select
                        value={selectedGenre}
                        onChange={handleGenreChange}
                        className="border rounded p-2 cursor-pointer text-black bg-mauve-400 mb-2"
                    >
                        <option value="all">All Genres</option>

                        {Array.from(
                            new Set(media.flatMap((m) => m.genres))
                        ).map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>

                </div>


                {/* Film filter Sereis/Movies */}
                <div>
                    <label className="mr-2 font-bold text-white text-lg ">
                        Film Filter:
                    </label>

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border rounded p-2 cursor-pointer text-black bg-mauve-400"
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
            </div>







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