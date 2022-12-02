import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, SearchInput, Trending } from "./components";
import { Home, Bookmarked, Movies, TvSeries } from "./pages";

function App() {
  return (
    <div className="App font-outfit font-light bg-darkBlue text-white">
      <main className="items-baseline pb-14 smTab:pt-6 w-full min-h-screen grid grid-cols-mobBleed gap-y-6 smTab:grid-cols-tabBleed smTab:gap-y-8 lg:grid-cols-deskBleed xl:grid-cols-lrgDeskBleed">
        <Navbar />
        <div className="grid grid-cols-mobBleed smTab:grid-cols-tabBleed lg:grid-cols-deskBleed col-start-1 col-end-13 gap-y-6 smTab:gap-y-8 xl:gap-y-9 xl:col-start-3 xl:col-end-lrgMainGridEnd">
          <SearchInput />
          <Home />
        </div>
        {/* <Movies/> */}
        {/* <TvSeries/> */}
        {/* <Bookmarked/> */}
      </main>
    </div>
  );
}

export default App;
