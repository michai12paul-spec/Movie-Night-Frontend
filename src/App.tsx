import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
// import ShowMovie from "./Components/VeiwMovie"
import ViewSerie from "./Components/ViewSerie"
import NavBar from "./Components/NavBar"
import ViewSeries from "./pages/ViewSeries"
import FavesPage from "./pages/FavesPage"
import ViewMovie from "./Components/ViewMovie"
import ViewMovies from "./pages/ViewMovies"
function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/movie/:id" element={<ViewMovie />} />
        <Route path="/series/:id" element={<ViewSerie />} />

        <Route path="/series" element={<ViewSeries />} />
        <Route path="/:type" element={<ViewMovies />} />

        <Route path="/faves/series" element={<FavesPage />} />

      </Routes>
    </>

  )
}
export default App