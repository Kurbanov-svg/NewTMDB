import { BrowserRouter } from "react-router-dom";
import { AntdProviders } from "./provider/AntdProviders";
import ReactQueryProviders from "./provider/ReactQueryProviders";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AntdProviders>
        <ReactQueryProviders>
          <MainRoutes />
        </ReactQueryProviders>
      </AntdProviders>
    </BrowserRouter>
  );
};

export default App;
