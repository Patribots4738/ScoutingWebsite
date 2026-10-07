import './CSS/Standard.css';
import Container from './Container';
import HubPage from './pages/HubPage'

export default function App() {
    var page
    const currentPage: string = location.href
    const extension: string = currentPage.substring(currentPage.lastIndexOf('/') + 1)
    switch(extension) {
        case 'Hub':
            page = (<HubPage />)
            console.log(extension)
        break;
        default:
            page = (<Container />)
            console.log(extension)
    }
    return (
        <div>
            {page}
        </div>
    );
}
