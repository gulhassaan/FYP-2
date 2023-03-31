import React from 'react';
import './App.css';
import logo from '../images/logo1.png';
import "@fontsource/montserrat";

function Footer() {
  return (
    <div className='main-footer'>
      <div className='container'>
      <div class="manage-footer">
      <div className='row'>
            {/*column1*/}
            <div className='col '>

              <ul className='list-unstyled'>
                <img className='logo' id='logo' src={logo} alt="" />
              </ul>
            </div>
            {/*column2*/}
            <div className='col'>
              <h4>About Us</h4>
              <ul className='list-unstyled'>
                <li>Our Blog</li>
                <li>Our Services</li>
              </ul>
            </div>
            {/*column3*/}
            <div className='col'>
              <h4>Need Help?</h4>
              <ul className='list-unstyled'>
                <li>FAQ</li>
                <li>Contact Us</li>
                <li>Gamingstan for Business</li>
              </ul>
            </div>
            {/*column4*/}
            <div className='col'>
              <h4>Gamingstan</h4>
              <ul className='list-unstyled'>
                <li>Terms Of Use</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div className='lower-footer'>
        <div className='row'>
          <hr />
          <p className='col-sm'>

            &copy;{new Date().getFullYear()} Gamingstan  Inc. | All  Right  Reserved |  Privacy.
          </p>
        </div>
      </div>
    </div>
    /* <div>
        <footer class="footer">
      <div class="container">
         <div class="row">
           <div class="footer-col">
             <img src={logo}/>
         	
           </div>
           <div class="footer-col">
             <h4>About Us</h4>
            <ul>
            <li><a href="#">Our Blog</a></li>
               <li><a href="#">Our services</a></li>
             </ul>
           </div>
           <div class="footer-col">
             <h4>Need Help?</h4>
             <ul>
               <li><a href="#">FAQ</a></li>
               <li><a href="#">Contact Us</a></li>
               <li><a href="#">Gamingstan For Business</a></li>
             </ul>
           </div>
           <div class="footer-col">
             <h4>Gamingstan</h4>
             {/*<div class="social-links">
               <a href="#"><i class="fab fa-facebook-f"></i></a>
               <a href="#"><i class="fab fa-twitter"></i></a>
               <a href="#"><i class="fab fa-instagram"></i></a>
               <a href="#"><i class="fab fa-linkedin-in"></i></a>
             </div>*/
    /*<ul>
        <li><a href="#">Terms Of Use</a></li>
        <li><a href="#">Privacy Policy</a></li>				
</ul>
    </div>
  </div>
</div>
</footer>
 
</div>*/
  );
}

export default Footer;

