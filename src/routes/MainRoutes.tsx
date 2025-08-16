import { Route, Routes } from "react-router-dom";
import LayoutSite from "../components/layout/LayoutSite";
import DetalisPages from "../components/pages/home/Detal/DetalisPages";
import HomePage from "../components/pages/home/HomePage";
import ActorBio from "../components/pages/home/ActorBio/ActorBio";
import Films from "../components/pages/home/films/Films";
import TWshow from "../components/pages/home/twShow/TWshow";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutSite />}>
        <Route path="/home" index element={<HomePage />} />
        <Route path=":type/:id" element={<DetalisPages />} />
        <Route path="/actor/:id" element={<ActorBio />} />
        <Route path="/film" element={<Films />} />
        <Route path="/tw" element={<TWshow />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
