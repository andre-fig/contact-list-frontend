import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PersonList from './pages/PersonList';
import PersonDetail from './pages/PersonDetail';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<PersonList />} />
        <Route path='/person/:id' element={<PersonDetail />} />
      </Routes>
    </div>
  );
}

export default App;
