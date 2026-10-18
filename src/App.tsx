import './CSS/Standard.css';
import Container from './Container';
import HubPage from './pages/HubPage';
import IdentificationPage from './pages/IdentificationPage';
import { Link, Route, Router, Switch } from "wouter";

export default function App() {
    
    return (
     <Router>
        <Switch>
            <Route path="/" component={HubPage}>
                <Route path="/Identification" component={IdentificationPage}></Route>
            </Route>
        </Switch>
     </Router>
    );
}
