import f from './Footer.module.css';
import g from '../global.module.css';
import logo from '../assets/images/logo.svg';

function Footer () {
  return (
    <footer className={f['footer-bg']}>
        <div className={`${g['container']} ${f['footer-content']}`}>
            <img src={logo} width={50} alt="Lofi Tapes" />
            <p>© 2025</p>
        </div>
    </footer>
  );
}

export default Footer;