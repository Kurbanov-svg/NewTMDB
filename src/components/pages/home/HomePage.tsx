import Popular from "./section/popular/Popular";
import TopRated from "./section/topRated/TopRated";
import Trending from "./section/Trending/Trending";
import Welcome from "./section/welcome/Welcome";

const HomePage = () => {
  return (
    <div>
      <Welcome />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default HomePage;
