import Gnb from "./gnb"
import Logo from "./logo"

const Header = () =>{
    return(
        <header className="header">
            <Logo />
            <Gnb />
        </header>
    )
}

export default Header