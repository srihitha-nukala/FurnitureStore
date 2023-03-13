import React from 'react';
import { Link } from 'react-router-dom';
import './coreCss/Base.css'
import Menu from './Menu';

const Base=({
    title="My Title",
    description="My Description",
    className="bg-dark text-white p-4",
    children
})=> {
  return (
        <div>
        {/* NavBar */}
        <Menu />
        <div>
            <div className={className}>{children}</div>
        </div>

        
        <footer className="footer text-white  bg-dark mt-auto">
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-sm-6 col-md-3 item">
                    <h3>Services</h3>
                        <ul>
                            <li><a href="/">Designing</a></li>
                            <li><a href="/">Comfort</a></li>
                            <li><a href="/">Cleaning</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3 item">
                        <h3  >About</h3>
                        <ul>
                            <li><a href="/">Furniture</a></li>
                            <li><a href="/">Team</a></li>
                            <li><a href="/">Careers</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6 item ">
                        <h3>Furiture For Everything</h3>
                        <p>Furniture is something that makes home beautiful and bright. Choose furniture with love and comfort. Shop here to make home and family happy. Make your home a happy place to live with best furniture. </p>
                    </div>
                    <div className="col item social py-4">
                        <Link href="/"><i className="icon ion-social-facebook"></i></Link>
                        <Link href="/"><i className="icon ion-social-twitter"></i></Link>
                        <Link href="/"><i className="icon ion-social-snapchat"></i></Link>
                        <Link href="/"><i className="icon ion-social-instagram"></i></Link>
                    </div>
                    <p className="copyright text-white twxt-muted py-1">Company Name © 2022</p>
                </div>
                </div>
        </footer>
    </div>
)
}

export default Base;