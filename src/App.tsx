import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdminRoom } from "./components/pages/AdminRoom";

import { Home } from "./components/pages/Home";
import { NewRoom } from "./components/pages/NewRoom";
import { Room } from "./components/pages/Room";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />

          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
