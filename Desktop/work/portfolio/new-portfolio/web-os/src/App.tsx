import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/landing.tsx';
import OptionsPage from './components/OptionsPage.tsx';
import WebPage from './components/web.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/options' element={<OptionsPage/>}/>
        <Route path='/web' element={<WebPage/>}/>
      </Routes>
    </Router>
    
  )
}

export default App
