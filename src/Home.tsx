import { Game } from './components/Game';
import Header from './components/Header';
import { Footer } from './Footer';

function Home() {
  return (
    <div className="App bg-dark-950">
      <Header />
      <body className="App-body">
        <Game />
      </body>
      <Footer />
    </div>
  );
}

export default Home;
