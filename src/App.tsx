import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./component/Header";
import Plp from "./page/Plp";

function App() {
  return (
    <Router basename={import.meta.env.PROD ? "/test" : "/"}>
      <Header />
      <Routes>
        <Route path="/" element={<Plp />} />
      </Routes>
    </Router>
  );
}

export default App;
