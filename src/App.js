import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hrlogin from "./pages/hrlogin/Hrlogin";
import Dashboard from "./pages/dashboard/Dashboard"
import Editemployee from './pages/editemployee/Editemployee';
import Addemployee from './pages/addemployee/Addemployee';
import LeaveRecord from './pages/leaverecord/LeaveRecord';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hrlogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editemployee/:id' element={<Editemployee />} />
        <Route path='/addemployee' element={<Addemployee />} />
        <Route path="/leaverecord/:id" element={<LeaveRecord/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
