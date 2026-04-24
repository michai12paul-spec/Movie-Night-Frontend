import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ShowMovie from "./Components/VeiwMovie"
import ShowtheShow from "./Components/VeiwShow"
import NavBar from "./Components/NavBar"
function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/movie" element={<ShowMovie/>} />
        <Route path="/show" element= {<ShowtheShow/>}/>
      </Routes>
    </>
 
  )}
export default App
