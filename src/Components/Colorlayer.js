import React from 'react';
import './Colorlayer.css';


class Colorlayer extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      fondo: "normal"    
    };

    this.manejarCambio = this.manejarCambio.bind(this);
    this.manejarCambio1 = this.manejarCambio1.bind(this);
    this.manejarCambio2 = this.manejarCambio2.bind(this);
  }  


  /*componentWillMount(){
    setTimeout(()=>{
      this.setState({ 
        fondo: 'Fondoc' 
      });
    },5000)
  }*/

  render() {
      return (
        <div className="posicion">

          <div className={this.state.fondo}>    
           
            <button className="afuera color" onClick={this.manejarCambio} >
                ⚪
            </button>
            <br></br>

            <button className="afuera color1" onClick={this.manejarCambio1} >
                ⚫
            </button>
            <br></br>

            {/*

            <button className="afuera color2" onClick={this.manejarCambio2} >
                🔵 
            </button>

            */}

            <br></br>

            <br></br>
            <br></br>
            
          </div>
        </div>
      );
    
  }

  manejarCambio() {  
    
    this.setState({ 
      fondo: "normal" 
    });
  }

   manejarCambio1() {  
    
    this.setState({ 
      fondo: "Fondoc" 
    });
  }

  manejarCambio2() {  
    
    this.setState({ 
      fondo: "Fondo2c" 
    });
  }



  
}
export default Colorlayer;