import { Link } from 'wouter';
import undo from "../images/undo.png";

export default function BackButton(lastPage: string) {
    return (
        <Link className="back-btn" to={"/" + lastPage}><img src={undo} className="undo-img"/></Link>
    )
}