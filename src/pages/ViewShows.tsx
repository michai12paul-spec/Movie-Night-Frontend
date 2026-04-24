import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ViewShow from "../Components/ViewShow";

const ViewShows = () => {
    interface ShowType {
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

     const [allShows, setAllShows] = useState<ShowType[]>([])

     const { type } = useParams() // _id is the account number
    const getShowsURL = `http://localhost:5173/shows/${type}`
    const getShowsReq = new Request(
        getShowsURL, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    useEffect(() => {
        fetch(getShowsReq)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setAllShows(data)
            })
    },)

     return (
        <>
            <div>ShowShows</div>
            {allShows.length > 0 ?
                <ViewShow show={allShows[0]} />
                :
                <p>No Shows Found!</p>
            }
        </>
    )

}


export default ViewShows