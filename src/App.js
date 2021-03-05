import { Switch, Route } from "react-router";
import Dashboard from "./pages/dashboard/Index";
import Trades from "./pages/trades";

function App() {
  return (
    <Switch>
      <Route path="/trade" component={Trades} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
}

export default App;
