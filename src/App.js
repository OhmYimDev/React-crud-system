import Navbar from './components/navbar';
import Users from './components/users';
import UserCreate from './components/userCreate';
import { Routes, Route} from "react-router-dom";
import UserEdit from './components/userEdit';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="create" element={<UserCreate />} />
        <Route path="edit/:id" element={<UserEdit />} />
      </Routes>
    </div>
  );
}

export default App;
