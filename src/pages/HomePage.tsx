import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const [filteredMedia, setFilteredMedia] = useState<MediaType[]>([]);
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [ratingSearch, setRatingSearch] = useState("");
    const [pageNum, setPageNum] = useState<number>(1);
    const [filter, setFilter] = useState("all");

    // function for handling genre filter
    const handleGenreChange = (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedGenre(event.target.value);
    };

    // function for handling rating filter
    const handleRatingSearch = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setRatingSearch(event.target.value);
    };

    // function for applying all filters together
    const applyFilters = () => {
        let filtered = [...media];

        // genre filter
        if (selectedGenre !== "all") {
            filtered = filtered.filter((item) =>
                item.genres.includes(selectedGenre)
            );
        }

        // rating filter
        if (ratingSearch !== "") {
            filtered = filtered.filter((item) => {
                const rating = Number(item.imdb?.rating ?? 0);

                return rating >= Number(ratingSearch);
            });
        }

        setFilteredMedia(filtered);
    };

    // fetch for movies and series
    const fetchMedia = async (pgNum: number) => {
        let data: MediaType[] = [];

        if (
            filter === "movies" ||
            filter === "all"
        ) {
            const movies = await fetch(
                `http://localhost:2811/movie/paginate/${pgNum}`
            ).then((res) => res.json());

            data = [...data, ...movies];
        }

        if (
            filter === "series" ||
            filter === "all"
        ) {
            const series = await fetch(
                `http://localhost:2811/series/paginate/${pgNum}`
            ).then((res) => res.json());

            data = [...data, ...series];
        }

        console.log("Fetched data:", data);

        const shuffled = data.sort(
            () => Math.random() - 0.5
        );

        setMedia(shuffled);
    };

    // fetch media when page/filter changes
    useEffect(() => {
        fetchMedia(pageNum);
    }, [pageNum, filter]);

    // run filters whenever media or filters change
    useEffect(() => {
        applyFilters();
    }, [
        media,
        selectedGenre,
        ratingSearch,
    ]);

    // pagination handlers
    const handlePageNext = () => {
        setPageNum((pg) => pg + 1);
    };

    const handlePagePrev = () => {
        setPageNum((pg) =>
            pg - 1 <= 0 ? 1 : pg - 1
        );
    };

    return (
        <div className="bg-zinc-600">
            <h1 className="flex flex-col p-2 ml-135 font-bold text-white text-xl">
                Golden Movie Night
            </h1>

            <div className="ml-3 mt-3">

                {/* Genre filter */}
                <div>
                    <label className="mr-2 font-bold text-white text-lg">
                        Genre Filter:
                    </label>

                    <select
                        value={selectedGenre}
                        onChange={
                            handleGenreChange
                        }
                        className="border rounded p-2 cursor-pointer text-black bg-mauve-400 mb-2"
                    >
                        <option value="all">
                            All Genres
                        </option>

                        {Array.from(
                            new Set(
                                media.flatMap(
                                    (m) =>
                                        m.genres
                                )
                            )
                        ).map((genre) => (
                            <option
                                key={genre}
                                value={genre}
                            >
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Rating filter */}
                <div>
                    <label className="mr-2 font-bold text-white text-lg">
                        Rating Filter:
                    </label>

                    <input
                        type="number"
                        placeholder="Ex: 8"
                        min="0"
                        max="10"
                        step="0.1"
                        value={ratingSearch}
                        onChange={
                            handleRatingSearch
                        }
                        className="border rounded p-2 text-black mb-2"
                    />
                </div>

                {/* Film filter Movies/Series */}
                <div>
                    <label className="mr-2 font-bold text-white text-lg">
                        Film Filter:
                    </label>

                    <select
                        value={filter}
                        onChange={(e) =>
                            setFilter(e.target.value)} className="border rounded p-2 cursor-pointer text-black bg-mauve-400">
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

                {/* Media grid */}
                {filteredMedia.length >
                    0 ? (
                    <div className="ml-3 grid grid-cols-4 gap-4 mt-2">
                        {filteredMedia.map((item) => (

                            <div
                                key={item._id}

                                // ✅ NEW
                                onClick={() =>
                                    navigate(

                                        item.type ===
                                            "series"

                                            ? `/movie/${item._id}`

                                            : `/series/${item._id}`
                                    )
                                }

                                // ✅ NEW
                                className="cursor-pointer"
                            >

                                {item.type ===
                                    "series" ? (

                                    <ViewSerie
                                        serie={item}
                                    />

                                ) : (

                                    <ViewMovie
                                        movie={item}
                                    />

                                )}

                            </div>

                        ))}

                    </div>
                ) : (
                    <p>
                        No Media Found!
                    </p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-around mt-3 p-4">
                <div
                    className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-amber-400"
                    onClick={
                        handlePagePrev
                    }
                >
                    Prev
                </div>

                <div>
                    Page {pageNum}
                </div>

                <div
                    className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-amber-400"
                    onClick={
                        handlePageNext
                    }
                >
                    Next
                </div>
            </div>
        </div>
    );
};

export default HomePage;