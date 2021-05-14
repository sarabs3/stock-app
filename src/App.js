import { Switch, Route } from "react-router";
import Dashboard from "./pages/dashboard/Index";
import Trades from "./pages/trades";
import AddScrip from "./pages/scrips/AddScrip";
import Login from "./pages/login";
import AddTrade from "./pages/trades/addTrade";

function App() {
  return (
    <Switch>
      <Route path="/trade" component={Trades} exact />
      <Route path="/trade/add" component={AddTrade} />
      <Route path="/scrips/add" component={AddScrip} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={Login} />
    </Switch>
  );
}

export default App;
