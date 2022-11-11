import React from 'react';
import "react-router-dom";


import Asistente from './Components/Asistente';
import NavSinLog from './Components/NavSinLog';
import NavAdmin from './Components/NavAdmin';
import NavUser from './Components/NavUser';
import Footer from './Components/Footer';

//import Colorlayer from './Components/Colorlayer';

import Login from './Pages/Login';
import Registrarse from "./Pages/Registrarse";
import Pregunta from './Pages/Pregunta';
import AdministrarPreguntas from './Pages/AdministrarPreguntas'

import MenuAdministrativo from './Pages/MenuAdministrativo';
import MenuUsuario from './Pages/MenuUsuario';
import Perfil from './Pages/Perfil';
import ObservarUser from './Pages/ObservarUser';
import OpcionesAdministrativas from './Pages/OpcionesAdministrativas';
import ListarExposicionesVirtuales from './Pages/ListarExposicionesVirtuales';
import AdministrarExposiciones from './Pages/AdministrarExposiciones';

import ExposicionesVirtuales from './Pages/ExposicionesVirtuales';
import CrearExposicionesVirtuales from './Pages/CrearExposicionesVirtuales';
import EditarExposicionesVirtuales from './Pages/EditarExposicionesVirtuales';


import CrearJuegos from './Pages/CrearJuegos';
import AdministrarJuegos from './Pages/AdministrarJuegos';


import AsignarGradosYCursos from './Pages/AsignarGradosYCursos';
import AdministrarGrados from './Pages/AdministrarGrados';
import CrearGrados from './Pages/CrearGrados';

//usuario
import VerAdministrarGrados from './Pages/VerAdministrarGrados';
import VerAdministrarCursos from './Pages/VerAdministrarCursos';
import VerAdministrarJuegos from './Pages/VerAdministrarJuegos';
///

import AdministrarCursos from './Pages/AdministrarCursos';
import CrearCursos from './Pages/CrearCursos';

import Inicio from './Pages/Inicio';
import Kit from './Pages/Kit';
import CrearKits from './Pages/CrearKits';
import EditarKit from './Pages/EditarKit';
import AdministrarKit from './Pages/AdministrarKit';

//import FondoApp from "../public/FondoApp.jpeg";
import { Route, Switch } from "wouter";

import Cookies from 'universal-cookie';
import './App.css';
const cookies2 = new Cookies();

var document=cookies2.get('document');
var rol_id=cookies2.get('rol_id');

//const id_ser3 = parseInt(cookies2.get('idUser'));
//const id_expo = parseInt(cookies2.get('idexpo'));

//console.log('document: '+ document);
//console.log('TipoUsuario: '+ rol_id);

//console.log("id_ usuario:"+id_ser3)
//console.log("id_ exposicion:"+id_expo)

if(document==null){
    document="SinDocumento";
    rol_id=0;

    //console.log('document '+ document);
    //console.log('es administrador '+ rol_id);

}else{
  console.log("inicio de sesion")
}

//{console.log("rol_id:",rol_id)}

class App extends React.Component {



  constructor(props) {
        super(props);
        this.state = {
            rol_user:rol_id,
            Navres:NavSinLog,
            FondoApp:"FondoEstudiante"

        };

        // Indicarle a las funciones a quién nos referimos con "this"
       
        this.componentDidMount = this.componentDidMount.bind(this)

  }

  componentDidMount(){
    if(rol_id==="1") {
      this.setState({
        rol_user : rol_id,
        Navres: NavUser,
        FondoApp: "FondoEstudiante"
      });
    }
    if(rol_id==="2"){
      this.setState({                     
        rol_user : rol_id,
        Navres : NavUser,
        FondoApp: "FondoApp"
      });
    }
    if(rol_id==="3"){
      this.setState({                     
        rol_user : rol_id,
        Navres : NavAdmin,
        FondoApp: "FondoApp"
      });
    }
    
    if(rol_id==="0") {
      this.setState({                     
        rol_user : 0,
        Navres : NavSinLog,
        FondoApp: "FondoEstudiante"
      });
    }
        
  }

  

  incrementarC=(e)=>{
    this.setState({
      rol_user : this.state.rol_user,
      Navres : this.state.Navres,
      con: this.state.con+1
    });
    
  }


  render() {
    return(

      <div className="">

        <div className={this.state.FondoApp} >

          <div className="navproyect">  
            <this.state.Navres></this.state.Navres>
            {/*<Colorlayer></Colorlayer>*/}          
          </div> 
                 
             
          <Route path="/">     
              <br></br>
              <br></br>
              <br></br>             
              <div className="bodyproyectLogin">
                <Inicio/> 
                {/*<Asistente show="Login"></Asistente>*/}
              </div>                              
          </Route>

          <Switch>

            <Route path="/Inicio">     
              <br></br>     
              <br></br>
              <br></br>           
              <div className="bodyproyectLogin">
                <Inicio/> 
                {/*<Asistente show="Login"></Asistente>*/}
              </div>                              
            </Route>

            <Route path="/Kit">     
              <br></br>
              <br></br>               
              <div className="bodyproyectLogin">
                <Kit/> 
                {/*<Asistente show="Login"></Asistente>*/}
              </div>                              
            </Route>

            <Route path="/EditarKit">     
              <br></br>    
              <br></br>
              <br></br>             
              <div className="bodyproyectLogin">
                <EditarKit/> 
                {/*<Asistente show="Login"></Asistente>*/}
              </div>                              
            </Route>

            <Route path="/CrearKits">     
              <br></br>      
              <br></br>
              <br></br>           
              <div className="bodyproyectLogin">
                <CrearKits/> 
                {/*<Asistente show="Login"></Asistente>*/}
              </div>   
              <br></br>                           
            </Route>

            <Route path="/AdministrarKit">     
              <br></br>  
              <br></br>
              <br></br>               
              <div className="bodyproyectLogin">
                <AdministrarKit/> 
                {/*<Asistente show="Login"></Asistente>*/}
              </div>      
              <br></br>                        
            </Route>



            <Route path="/Login">
              <br></br>  
              <br></br>
              <br></br> 
              <center>  
                <h1 className="loginletraTitulo" >WE LEARN BY PLAYING</h1> 
              </center> 
              <div className="bodyproyectLogin">
                <Login/> 
                {/*<Asistente show="Login"></Asistente>*/}
              </div>  
            </Route>

            <Route path="/Registrarse">
              <br></br>
              <br></br>
              <div className="bodyproyectRegister">  
                <Registrarse/>
                {/*<Asistente show="Registrarse"></Asistente>*/}
              </div>
            </Route>           

            <Route path="/Pregunta">
              <br></br>
              <br></br>
              <div className="bodyproyectLogin">  
                <Pregunta/>
                {/*<Asistente show="Pregunta"></Asistente>*/}            
              </div>
            </Route>

            <Route path="/Perfil">
              <br></br>
              <br></br>
                <div className="bodyproyectLogin">
                  <br></br>
                  <br></br>  
                  <Perfil/>   
                  {/*<Asistente show="Perfil"  style={{color: "#black" , height:"100vh", backgroundColor:"#fde2e4"}}></Asistente>  */}                             
                </div>
              </Route>

              <Route path="/ObservarUser">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">
                  <br></br>
                  <br></br>  
                  <ObservarUser/>   
                  {/*<Asistente show="ObservarUser"  style={{color: "#black" , height:"100vh", backgroundColor:"#fde2e4"}}></Asistente>  */}                             
                </div>
              </Route>

              <Route path="/MenuAdministrativo">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <MenuAdministrativo/>     
                  {/*<Asistente show="MenuAdministrativo"></Asistente>*/}            
                </div>
              </Route>

              <Route path="/OpcionesAdministrativas">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <OpcionesAdministrativas/>  
                  {/*<Asistente show="OpcionesAdministrativas"></Asistente>*/}  
                </div>
              </Route>

              

              <Route path="/MenuUsuario">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <br></br>
                  <br></br>
                  <MenuUsuario/>    
                  {/*<Asistente show="MenuUsuario"></Asistente>*/}              
                </div>
              </Route>

              <Route path="/ListarExposicionesVirtuales">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <ListarExposicionesVirtuales/>   
                  {/*<Asistente show="ListarExposicionesVirtuales"></Asistente>*/}               
                </div>
                <br></br>
              </Route>

              <Route path="/AdministrarExposiciones">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <AdministrarExposiciones/>   
                  {/*<Asistente show="AdministrarExposiciones"></Asistente>   */}             
                </div>
                <br></br>
              </Route>


              <Route path="/ExposicionesVirtuales">

                <div className="bodyproyectLogin">  
                  <ExposicionesVirtuales/>   
                  {/*<Asistente show="ExposicionesVirtuales"></Asistente>   */}             
                </div>
              </Route>

              <Route path="/CrearExposicionesVirtuales">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <CrearExposicionesVirtuales/>   
                  {/*<Asistente show="CrearExposicionesVirtuales"></Asistente>   */}             
                </div>
                <br></br>
              </Route>

              <Route path="/EditarExposicionesVirtuales">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <EditarExposicionesVirtuales/>   
                  {/*<Asistente show="EditarExposicionesVirtuales"></Asistente>*/}                
                </div>
              </Route>

              <Route path="/CrearJuegos">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <CrearJuegos/>  
                </div>
                <br></br>
              </Route>

              <Route path="/AdministrarJuegos">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <AdministrarJuegos/>  
                </div>
                <br></br>
              </Route>
              

              <Route path="/AdministrarGrados">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <AdministrarGrados/>   
                  {/*<Asistente show="AsignarGradosYCursos"></Asistente>*/}               
                </div>
                <br></br>
              </Route>

              <Route path="/CrearGrados">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <CrearGrados/>  
                </div>
                <br></br>
              </Route>

              <Route path="/AdministrarCursos">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <AdministrarCursos/>   
                  {/*<Asistente show="AsignarGradosYCursos"></Asistente>*/}               
                </div>
                <br></br>
              </Route>

              <Route path="/CrearCursos">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <CrearCursos/>  
                </div>
                <br></br>
              </Route>

              <Route path="/AsignarGradosYCursos">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <AsignarGradosYCursos/>   
                  {/*<Asistente show="AsignarGradosYCursos"></Asistente>*/}               
                </div>
              </Route>

              <Route path="/VerAdministrarJuegos">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <VerAdministrarJuegos/>  
                </div>
                <br></br>
                <br></br>
              </Route>

              <Route path="/VerAdministrarCursos">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <VerAdministrarCursos/>   
                  {/*<Asistente show="AsignarGradosYCursos"></Asistente>*/}               
                </div>
                <br></br>
              </Route>

              <Route path="/VerAdministrarGrados">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <VerAdministrarGrados/>   
                  {/*<Asistente show="AsignarGradosYCursos"></Asistente>*/}               
                </div>
                <br></br>
              </Route>

              

              <Route path="/AdministrarPreguntas">
                <br></br>
                <br></br>
                <div className="bodyproyectLogin">  
                  <AdministrarPreguntas/>   
                  {/*<Asistente show="AdministrarPreguntas"></Asistente>*/}                
                </div>
              </Route>


              
          </Switch>
          <br></br>

          <div className="footerproyect">               
            <Footer></Footer>              
          </div>
          
        </div>
      </div>

    );        
  }


}

export default App;