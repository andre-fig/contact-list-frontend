import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PersonList from './pages/PersonList';
import PersonDetail from './pages/PersonDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<PersonList />} />
        <Route path='/person/:id' element={<PersonDetail />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
