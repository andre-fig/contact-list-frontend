import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PersonList from './pages/PersonList';
import PersonDetail from './pages/PersonDetail';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<PersonList />} />
        <Route path='/person/:id' element={<PersonDetail />} />
        <Route path='/person/:id/contact/new' element={<ContactForm />} />
      </Routes>
    </div>
  );
}

export default App;
