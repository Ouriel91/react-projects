import logo from "../images/react-icon-small.png"
import '../styles/Navbar.css'

function Navbar({darkMode, toggleDarkMode}) {
    return (
         <nav 
            className={darkMode ? "dark": ""}
        >
            <img 
                className="nav-logo_icon"
                src={logo}
                alt="logo-icon"
            />
            <h3 className="nav-logo_text">ReactFacts</h3>
            
            <div 
                className="toggler" 
            >
                <p className="toggler-light">Light</p>
                <div 
                    className="toggler-slider"
                    onClick={toggleDarkMode}
                >
                    <div className="toggler-slider-circle"></div>
                </div>
                <p className="toggler-dark">Dark</p>
            </div>
        </nav>
    )
}

export default Navbar