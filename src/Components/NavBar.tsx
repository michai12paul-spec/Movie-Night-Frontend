import { Link } from "react-router"

const NavBar = () => {
    return (
        <div className="flex items-center justify-center py-3 border-b-2">
            <div className="font-bold text-xl">NavBar</div>
            <Link className="mx-3 underline" to="/">Home</Link>
            <Link className="mx-3 underline" to="/show">View All Shows</Link>
            <Link className="mx-3 underline" to="/movie">View All Movies</Link>
        </div>
    )
}

export default NavBar