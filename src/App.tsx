import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ShowMovie from "./Components/VeiwMovie"
import ViewShow from "./Components/ViewShow"
import NavBar from "./Components/NavBar"
import ViewShows from "./pages/ViewShows"
function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/:type/:id" element={<ShowMovie/>} />
        <Route path="/:type/:id" element= {<ViewShow/>}/>

        <Route path="/:type" element={<ViewShows/>} />
        {/* <Route path="/:type" element={<ViewMovies/>} /> */}

      </Routes>
    </>
 
  )}
export default App
