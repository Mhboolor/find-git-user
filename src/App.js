import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import PopularRepo from "./components/popular/PopularRepo";

function App() {
  return (
    <div className="bg-gray-50 w-full h-screen">
      <header>
        <Header/>
      </header>
      <main className="container m-auto">
        <Routes>
          <Route path="/popular-most" element={<PopularRepo/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
