import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import InvestmentForm from './ReactComponents/InvestmentForm'
import Instructions from './ReactComponents/Instructions'
import Header from './ReactComponents/Header'
import Footer from './ReactComponents/Footer'


function App() {
  return (
    <div className="App">
          <Header />
          <div className="App-body">
              <InvestmentForm />
              {/* <Instructions /> */}
          </div>
          <Footer />
    </div>
  );
}

export default App;
