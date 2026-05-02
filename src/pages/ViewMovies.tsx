import { useEffect, useState, type ChangeEvent } from 'react'
import ViewMovie from '../Components/VeiwMovie'

interface MovieType {
    _id: string
    title: string
    director: string
    genres: string[]
    year: number
    runtime: number
    poster: string
}

const ViewMovies = () => {
    const [allMovies, setAllMovies] = useState<MovieType[]>([])
    const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([])
    const [page, setPage] = useState(1)
    const [selectedGenre, setSelectedGenre] = useState('all')

    const handlePageNext = () => {
        setPage((currentPage) => currentPage + 1)
    }

    const handlePagePrev = () => {
        setPage((currentPage) => Math.max(1, currentPage - 1))
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase()
        setFilteredMovies(
            allMovies?.filter((movie) => {
                console.log(searchTerm, movie)
                if (movie.title.toLowerCase().includes(searchTerm) ||
                    // movie.director.toLowerCase().includes(searchTerm) ||
                    // movie.genres.toLowerCase().includes(searchTerm)
                    movie.genres.some((genre) => genre.toLowerCase().includes(searchTerm))
                ) {
                    return movie
                }
            }),
        )
    }

    
const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value
    setSelectedGenre(genre)

    setFilteredMovies(
        allMovies.filter(movie =>
            genre === 'all' ? true : movie.genres.includes(genre)
        )
    )
}

    

    useEffect(() => {
        const getMoviesUrl = `http://localhost:4040/movie/p${page}`
        // const getMoviesUrl2 = `http://localhost:4040/series/p${page}`
        //  http://localhost:4040/movie/p6
        fetch(getMoviesUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data: MovieType[]) => {
                setAllMovies(data)
                setFilteredMovies(data)
            })
    }, [page])

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="mb-4 border-b-2 text-center text-xl font-bold">MOVIES</div>
                <input
                    type="text"
                    placeholder="Search by title, director, or genre"
                    className="mb-4 w-full rounded-lg border p-2"
                    onChange={handleSearch}
                />
                <select
                    value={selectedGenre}
                    onChange={handleGenreChange}
                    className="mb-4 w-full rounded-lg border p-2"
                >
                    <option value="all">All Genres</option>
                    {Array.from(new Set(allMovies.flatMap(m => m.genres))).map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-3 items-center border-b-2 p-4 text-center text-xl font-bold">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => <ViewMovie key={movie._id} movie={movie} />)
                ) : (
                    <p>No movies found</p>
                )}
            </div>
            <div className="mt-4 flex justify-between gap-4">
                <button className="w-24 cursor-pointer rounded-lg border p-3" onClick={handlePagePrev}>Prev</button>
                <button className="w-24 cursor-pointer rounded-lg border p-3" onClick={handlePageNext}>Next</button>
            </div>
        </>
    )
}

export default ViewMovies