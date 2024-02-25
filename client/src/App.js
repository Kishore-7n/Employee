
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/pages/Home';
import EmpTable from "./Components/pages/EmpTable";
import Hometwo from "./Components/pages/Hometwo";
function App() {
  return (

  <Router>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/form2' element={<Hometwo/>}></Route>
      <Route path='/employees' element={<EmpTable/>}></Route>
    </Routes>
  </Router>
    
  );
}

export default App;
