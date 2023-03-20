import React from "react";
import "./Footer.css";





function Footer() {



    return (

        <footer className="footer">

            <div className="footer-content">

                <h3>code opacity</h3>

                <p>
                    Using HTML and CSS, I show you how to make simple footer
                    that always sticks to the bottom of the webpage.
                </p>

                <ul className="socials">

                    <li><a href="#">
                        <ion-icon name="logo-facebook" size="large"></ion-icon>
                    </a></li>
                    <li><a href="#">
                        <ion-icon name="logo-github" size="large"></ion-icon>
                    </a></li>
                    <li><a href="#">
                        <ion-icon name="logo-linkedin" size="large"></ion-icon>
                    </a></li>
                    <li><a href="#">
                        <ion-icon name="logo-instagram" size="large"></ion-icon>
                    </a></li>
                    <li><a href="#">
                        <ion-icon name="logo-twitter" size="large"></ion-icon>
                    </a></li>

                </ul>

            </div>

            <div className="footer-bottom">

                <p>copyrigth &copy;2023 codeOpacity. designed by <span>nethunt</span></p>

            </div>

        </footer>

    );

};


export default Footer;