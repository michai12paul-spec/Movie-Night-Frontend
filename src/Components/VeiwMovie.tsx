

interface MovieType {
  _id: string,
  title: string,
  director: string,
  genres: string[],
  year: number,
  runtime: number
  poster: string

}

const ViewMovie = ({ movie }: { movie: MovieType }) => {
  console.log(movie)
  return (
    <>
    {/* <Link to={`/transactions/${customer._id}`}> */}
      <div key={movie._id} className="mb-4 p-4 border rounded shadow bg-gray-100 hover:bg-gray-250 w-100 h-115">
        <div className="flex justify-center mb-2">
        <div><img src={movie.poster} alt={`${movie.title} poster`} className="w-55 h-auto" /></div>
        </div>
        <p>{`${movie.title} (${movie.year})`}</p>
        <p>{movie.director}</p>
        <div>
          <p>{movie.genres?.join(', ')}</p>
        </div>
        {/* <p>{movie.releaseDate}</p> */}
        <p>{movie.runtime}</p>
        {/* <p>ID: {movie._id}</p> */}
      </div>
    {/* </Link> */}
    </>
  )

  
}

export default ViewMovie