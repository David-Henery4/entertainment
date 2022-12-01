import "./styles/index.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Navbar, SearchInput,Trending} from "./components";
import {Home, Bookmarked, Movies, TvSeries} from "./pages";

function App() {
  return (
    <div className="App font-outfit font-light bg-darkBlue text-white">
      <main className="pb-14 smTab:pt-6 w-full min-h-screen grid grid-cols-mobBleed gap-y-6 smTab:grid-cols-tabBleed smTab:gap-y-8 lg:grid-cols-deskBleed xl:grid-cols-lrgDeskBleed">
      <Navbar/>
      <SearchInput/>
      <Home/>
      {/* <Movies/> */}
      {/* <TvSeries/> */}
      {/* <Bookmarked/> */}
      </main>
    </div>
  );
}

export default App;
