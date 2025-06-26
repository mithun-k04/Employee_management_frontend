import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hrlogin from "./pages/hrlogin/Hrlogin";
import Dashboard from "./pages/dashboard/Dashboard"
import Editemployee from './pages/editemployee/Editemployee';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hrlogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editemployee/:id' element={<Editemployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
