import '../css/template.css'
import img from '../images/covid19.png'
import Dropdown from '../components/dropdown'

export default function Template({ title, options, setData }) {
    const updateOption = async (data, optionSelected) => {
        setData(optionSelected)
        return "Realizado"
    }
    
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src={img} alt="" width="80" height="70" /> {title}
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                      data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" 
                      aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                      <div className="navbar-nav">
                        <a className="nav-link" href="/">Continents</a>
                        <a className="nav-link" href="/countries">Countries</a>
                      </div>
                    </div>
                </div>
            </nav>
            <div className="graphics-container">
                <Dropdown id={"dataSelected"} variables={options} change={updateOption} />
            </div>
        </>
    )
}