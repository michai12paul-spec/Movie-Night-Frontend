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
        console.log("id:", id);

        fetch(`http://localhost:2811/series/view/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("series data:", data);
                setSerie(data);
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!serie) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6">
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
            </p>

            <p className="mt-3">
                Rating: {serie.imdb.rating}
            </p>

            <p>
                Genres:
                {" "}
                {serie.genres}
            </p>
        </div>
    );
};

export default SeriesPage;