import { Link } from 'wouter';
import '../CSS/HubPage.css';

export default function HubPage() {

    return(
        <div className="background">
            <h1 className="header title">Patribots Scouting Website</h1>
            <div className="scouter-id-box">
                <input type="text" placeholder="Name"></input>
                <select>
                    <option>Patribots</option>
                    <option>Aluminum Narwhalls</option>
                </select>
            </div>
            <Link className="temp-link" to="/PitScout">High I exist Pit</Link>
            <Link className="temp-link" to="/QaulScout">High I exist Qual</Link>
            <Link className="temp-link" to="/QuantScout">High I exist Qaunt</Link>
        </div>
    )
}