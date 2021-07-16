import {BrowserRouter as Router, Route,Switch,Redirect} from "react-router-dom"
import Signin from "./components/login.jsx";
import SignUp from "./components/registration.jsx"
import Home from "./router/home.jsx";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/signup">
                    <SignUp/>
                </Route>
                <Route exact path="/login">
                    <Signin/>
                </Route>
                <Route exact path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
