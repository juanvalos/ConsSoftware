import { Routes, Route } from 'react-router';
import Register from './assets/register/Register';
import Dashboard from './assets/dashboard/Dashboard';
import Users from './views/users/Users';


function App() {

  return (
    <Routes>

      <Route path="/" element={<Dashboard/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/users/:id" element ={<Users/>} />

    </Routes>
  );
}

export default App