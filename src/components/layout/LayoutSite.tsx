import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import css from "./LayoutSite.module.css";

const LayoutSite = () => {
  return (
    <div className={css.Layout}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutSite;
