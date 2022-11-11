import React from 'react';
import "bulma/css/bulma.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Styles/footer.css';



class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [], text: '' 
    };
    
  }

  render() {
    return (

      <center>

        <footer className="footer">
          <div className="container">
            <nav>
              <ul>
                <li>
                    <a href=" " target="_blank">
                      Created for we learn by playing ...
                    </a>

                </li>

                <span> </span>
                
                <li>
                  <a rel="noreferrer" href="https://docs.google.com/presentation/d/1SZDga0dFYcwW-WlC87ekxJqKXjR0vjijSqPSVFuiHIo/edit#slide=id.g14bef4c4aea_0_0" target="_blank">
                    MANUAL we learn by playing
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              © 2022, Designed and Coded by  
              <span> </span>
              <a rel="noreferrer" style={{color: "white"}} href="https://www.linkedin.com/in/jeison-garces-casta%C3%B1eda-134b931b2/" target="_blank">
                Jeison Garces
              </a>
              <span> </span>
              and
              <span> </span>
              <a rel="noreferrer" style={{color: "white"}} href="https://www.linkedin.com/in/santiflo" target="_blank">
                Santiago Florian
              </a>
            </div>

            <div >
              Contacto:   
              <span> </span>
              <a rel="noreferrer" style={{color: "white"}} href="https://wa.me/+573165666293" target="_blank">
                +57 3165666293
              </a>
              <span> </span>
              /
              <span> </span>
              <a rel="noreferrer" style={{color: "white"}} href="https://wa.me/+573226849437" target="_blank">
                +57 3226849437
              </a>
            </div>


          </div>
        </footer>
      </center>

        
    );
  }

  
}



export default Footer;