import { Link } from 'react-router'; 
import logo from '../assets/images/logo.svg';

function Header( {handleLogout, isAuthenticated} ) {
    
    return (
        <header className='bg-[#5F8B4C] flex justify-between items-center p-4 shadow-lg px-32 mb-12'>
            <div className=''> 
                <Link to="/">
                    <img src={logo} width={100} alt="Logo" />
                </Link>
            </div>
            <div> {/*login/logout button sates change depending if theres a user logged in or not */}
                {isAuthenticated ? <button onClick={handleLogout} className='text-white font-semibold hover:text-orange-200 hover:scale-[105%] transition'>Log Out</button> : <Link to="signin" className='text-white font-semibold hover:text-orange-200 hover:scale-[105%] transition'>Log In</Link>}
            </div>
        </header>
    );
}

export default Header;