import { Switch, Route } from "react-router";
import Dashboard from "./pages/dashboard/Index";
import Trades from "./pages/trades";
import AddScrip from "./pages/scrips/AddScrip";
import Login from "./pages/login";
import AddTrade from "./pages/trades/addTrade";
import EditTrade from "./pages/trades/EditTrade";
import ScripTrade from "./pages/scrips/ScripTrade";
import CompletedTrades from "./pages/trades/CompletedTrades";
import CompleteTrade from "./pages/trades/CompleteTrade";

function AllRoutes() {
  return (
    <Switch>
      <Route path="/trade" component={Trades} exact />
      <Route path="/trade/completed" component={CompletedTrades} exact />
      <Route path="/trade/add" component={AddTrade} />
      <Route path="/trade/edit/:id" component={EditTrade} />
      <Route path="/trade/complete/:id" component={CompleteTrade} />
      <Route path="/scrips/add" component={AddScrip} />
      <Route path="/trade/:id" component={ScripTrade} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={Login} />
    </Switch>
  );
}

export default AllRoutes;
