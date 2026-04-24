import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ShowMovie from "./Components/VeiwMovie"
import ViewShow from "./Components/ViewShow"
import NavBar from "./Components/NavBar"
function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/:type" element={<ShowMovie/>} />
        <Route path="/:type" element= {<ViewShow/>}/>
      </Routes>
    </>
 
  )}
export default App
