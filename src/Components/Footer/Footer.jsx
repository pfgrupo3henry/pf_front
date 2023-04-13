import React from "react";
import "./Footer.css";





function Footer() {



    return (

        <footer className="footer">

            <div className="footer-content">

                <h3>Video Juegos</h3>

                <p>
                    Jugar es una nueva habilidad , adorna tu tiempo con Video Juegos y añade diversión a tu vida
                </p>

                <ul className="socials">

                    <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                        <ion-icon name="logo-facebook" size="large"></ion-icon>
                    </a></li>
                    <li><a href="https://github.com/" target="_blank" rel="noreferrer">
                        <ion-icon name="logo-github" size="large"></ion-icon>
                    </a></li>
                    <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                        <ion-icon name="logo-linkedin" size="large"></ion-icon>
                    </a></li>
                    <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        <ion-icon name="logo-instagram" size="large"></ion-icon>
                    </a></li>
                    <li><a href="https://twitter.com/?lang=es" target="_blank" rel="noreferrer">
                        <ion-icon name="logo-twitter" size="large"></ion-icon>
                    </a></li>

                </ul>

            </div>

            <div className="footer-bottom">

                <p>copyrigth &copy;2023. designed by <span>nethunt</span></p>

            </div>

        </footer>

    );

};


export default Footer;