import '../CSS/HubPage.css';

export default function HubPage() {

    return(
        <div>
            <h1 className="header title">Patribots Scouting Website</h1>
            <div className="scouter-id-box">
                <input type="text" placeholder="Name"></input>
                <select>
                    <option>Patribots</option>
                    <option>Aluminum Narwhalls</option>
                </select>
            </div>
            <button onClick={() => {location.href = "Test"}}>Hi another test</button>
            <button onClick={() => {location.href = "IdPage"}}>ID Page Button</button>
        </div>
    )
}