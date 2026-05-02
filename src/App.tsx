import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
// import ShowMovie from "./Components/VeiwMovie"
import ViewSerie from "./Components/ViewSerie"
import NavBar from "./Components/NavBar"
import ViewSeries from "./pages/ViewSeries"
function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route index element={<HomePage/>} />
        {/* <Route path="/movie/:id" element={<ShowMovie/>} /> */}
        <Route path="/series/:id" element= {<ViewSerie/>}/>

        <Route path="/series" element={<ViewSeries/>} />
        {/* <Route path="/:type" element={<ViewMovies/>} /> */}

      </Routes>
    </>
 
  )}
export default App