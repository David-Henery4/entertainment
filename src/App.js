import "./styles/index.scss";
import { Dashboard, LogInSignUp, ProtectedRoute } from "./pages";
//
import { Route, Routes } from "react-router-dom";
import { Home, Bookmarked, Movies, TvSeries } from "./pages";
import { useSelector } from "react-redux";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  //
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv" element={<TvSeries />} />
          <Route path="bookmarked" element={<Bookmarked />} />
        </Route>
      </Route>
      <Route path="login" element={<LogInSignUp/>} />
    </Routes>
  );
}

export default App;
