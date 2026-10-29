import { Link } from 'wouter';
import '../CSS/HubPage.css';

export default function HubPage() {

    return(
        <div className="background">
            <h1 className="header title">Patribots Scouting Website</h1>
            <div className="scouter-id-box">
                <input type="text" className="txt-box" placeholder="Name"></input>
                <select className="select-box">
                    <option>Patribots</option>
                    <option>Aluminum Narwhalls</option>
                </select>
            </div>
            <div className="link-box">
                <Link className="nav-btns" to="/PitScout">Pit</Link>
                <Link className="nav-btns" to="/QaulScout">Qualitative</Link>
                <Link className="nav-btns" to="/QuantScout">Quantitative</Link>
            </div>
        </div>
    )
}