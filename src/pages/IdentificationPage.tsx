import '../CSS/IdPage.css';
import BackButton from "../components/BackButton";


function PitIdPage() {
    return(
        <div className="background">
            {BackButton("")}
            <h2 className="header subtitle">Identification</h2>
            <div className="pit-box">
                <div>
                    <h3 className="header texttitle">Team Number</h3>
                    <input type="number" className="num-box" placeholder="Team Number"></input>
                </div>
            </div>
        </div>
    )
}

function QaulIdPage() {
    return(
        <div className="background">
            {BackButton("")}
            <h2 className="header subtitle">Papers Please</h2>
            
        </div>
    )
}

function QauntIdPage() {
    return(
        <div className="background">
            {BackButton("")}
            <h2 className="header subtitle">Identification</h2>
            <div className="sue-box">
                <div>
                    <h3 className="header texttitle">Match Number</h3>
                    <input type="number" className="num-box" placeholder="Match Number"></input>   
                </div>
                <div>
                    <h3 className="header texttitle">Team Number</h3>
                    <input type="number" className="num-box" placeholder="Team Number"></input>
                </div>
                <div>
                    <h3 className="header texttitle">Alliance</h3>   
                    <select className="alliance-select">
                        <option className='red-opt'>RED</option>
                        <option className='blue-opt'>BLUE</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export {PitIdPage, QaulIdPage, QauntIdPage};