import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./component/Header";

function App() {
  return (
    <Router basename={import.meta.env.PROD ? "/test" : "/"}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex w-full justify-center p-4">
              <div className="border p-4 w-full">PLP go here</div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
