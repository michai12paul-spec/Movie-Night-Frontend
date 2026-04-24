import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ShowMovie from "./Components/VeiwShow"
function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/show" element={<ShowMovie/>} />
      </Routes>
    </>
 
  )}
export default App
