import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface SerieType {
    _id: string;
    title: string;
    plot: string;
    poster: string;
    genres: string[];
    imdb: {
        rating: number;
        votes: number;
    };
}

const SeriesPage = () => {
    const { id } = useParams();

    const [serie, setSerie] =
        useState<SerieType | null>(null);

    useEffect(() => {
        if (!id) return;

        console.log(
            "id:",
            id
        );

        if (!id) return;

        fetch(
            `http://localhost:2811/series/view/${id}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(
                    "series data:",
                    data
                );

                setSerie(data);
            })
            .catch((err) =>
                console.log(err)
            );
    }, [id]);

    const addToFavorites = async () => {
        try {
            const res = await fetch(
                `http://localhost:2811/faves/add/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            

            const data = await res.json();

            alert(data.message);
        }
        catch (err) {
            console.log(err);
            alert("Failed to add to favourites");
        }
    };

    if (!serie) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-8 flex flex-col items-center bg-zinc-600">
            <div className="bg-zinc-700 p-6 rounded-lg shadow-lg shadow-amber-400 max-w-3xl w-full text-white">
                <img
                    src={serie.poster}
                    alt={serie.title}
                    className="w-80 rounded-lg"
                />

                <h1 className="text-3xl font-bold mt-4">
                    {serie.title}
                </h1>

                <p className="mt-3">
                    {serie.plot}

                    {(!serie.plot) && (
                        <p>
                            No plot available.
                        </p>
                    )}

                </p>

                <p className="mt-3">
                    Rating:
                    {" "}
                    {serie.imdb?.rating}
                </p>

                <p className="mt-3">
                    Genres:
                    {" "}
                    {serie.genres.join(", ")}
                </p>

                <button
                onClick={addToFavorites}
                className="mt-4 bg-stone-600 border border-2 border-amber-400 text-black px-4 py-2 rounded hover:bg-amber-400 hover:text-white transition-colors duration-300 hover:border-amber-700"
            >
                Add to Favourites
            </button>
            </div>
        </div>
    );
};

export default SeriesPage;