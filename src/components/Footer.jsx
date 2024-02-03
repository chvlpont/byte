import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-contatiner">
        <div className="footer-icons">
          <a href="">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-google-plus"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
        <div className="footer-nav">
          <ul>
            <li>
              <a href="">Call Us</a>
            </li>
            <li>
              <a href="">Mail Us</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
