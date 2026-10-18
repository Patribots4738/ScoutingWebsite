import './CSS/Standard.css';
import Container from './Container';
import HubPage from './pages/HubPage';
import {PitIdPage, QaulIdPage, QauntIdPage} from './pages/IdentificationPage';
import { Route, Router, Switch } from "wouter";

export default function App() {
    
    return (
     <Router>
        <Switch>
            <Route path="/" component={HubPage}/>
            <Route path="/PitScout" component={PitIdPage}/>
            <Route path="/QaulScout" component={QaulIdPage}/>
            <Route path="/QuantScout" component={QauntIdPage}/>
        </Switch>
     </Router>
    );
}
