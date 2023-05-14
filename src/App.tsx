import { Home } from "./pages/home/Home";
import "./index.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <div className='app_wrapper'>
        <h1>Currency Converter</h1>
        <div className='window_converter'>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.link}
                exact
                path={route.link}
                component={route.element}
              />
            ))}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
