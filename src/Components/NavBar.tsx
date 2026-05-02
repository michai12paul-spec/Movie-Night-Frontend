import { Link } from "react-router"

const NavBar = () => {
    return (
        <div className="flex items-center justify-center py-3 border-b-2 bg-slate-900 text-fuchsia-200">
            <div className="font-bold text-xl p-2 text-shadow-lg"></div>
            <Link className="font-bold text-xl p-2 text-left" to="/">Home</Link>
            <Link className="font-bold text-xl p-2" to="/series">View All Series</Link>
            <Link className="font-bold text-xl p-2" to="/movie">View All Movies</Link>
        </div>
    )
}

export default NavBar