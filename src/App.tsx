import { Route, BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';

import './styles/global.scss'
import { Anime } from './pages/Anime/Slug';

function App() {
  
  return (
    <BrowserRouter>
      <Header/>
      <Route path="/" exact component={ Home } />
      <Route path="/anime/:slug" component={ Anime }/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
