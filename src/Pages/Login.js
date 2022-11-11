
import React from 'react';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import '../Styles/login.css';


const cookies = new Cookies();


class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: {
                "document": "",
                "password": "",                               
            },
        };
        // Indicarle a las funciones a quién nos referimos con "this"
        
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
        //this.handleSwitchChange = this.handleSwitchChange.bind(this);


    }


    render() {
        return (

            <div className="columns centralLogin">
               

              <div className="column">

              </div>

                <div className="columnlogin" >
                 

                  <div className="cardimagLogin" >                  
                    <center>
                    <div className="cardlogin" >  
                      <h1 className="loginletra">WELCOME</h1> 
                      {/*<h3 className="loginletra">LOG IN</h3> */}            
                      
                      <form className="" onSubmit={this.manejarEnvioDeFormulario}>

                          <div className="form-group">                                
                            <input autoFocus required placeholder="🆔 Document" type="document" id="document" className="FondoInputL" onChange={this.manejarCambio} value={this.state.data.document} >
                              
                            </input>
                          </div>

                          <div className="form-group">
                              <input autoFocus required placeholder="🔑 PASSWORD" type="password" id="password" className="FondoInputL" onChange={this.manejarCambio} value={this.state.data.password} >
                              </input>
                          </div>

                          
                           {/*  <div className="form-group">
                            <label style={{color: 'black'}}> User <span> </span> 
                                <input type="checkbox" 
                                name="user" 
                                id="user" 
                                defaultChecked={!this.state.data.manager}
                                value={!this.state.data.manager}
                                ></input>
                                
                            </label>  
                            <span> </span>   


                            <label style={{color: 'black'}}> Manager 
                                <input type="checkbox"
                                    name="manager"
                                    id="manager"
                                    onChange={this.handleSwitchChange}
                                    value={this.state.data.manager} 
                                />                                
                            </label> 


                          </div>
                          
                          
                         

                          <label>
                                <input
                                  type="radio"
                                  id="name"
                                  checked={this.state.selectedOption === "Male"}
                                  onChange={this.onValueChange}
                                  value={this.state.data.name} 
                                />
                                Male
                            </label>


                            <div>
                            
                            <select id="blend-top" className="FondoInput" >
                              <option selected>User</option>
                              <option>manager</option>                             
                            </select>
                          </div>*/}
                    
                        
                          <div className="form-group">
                              <button className="button is-success mt-2">
                                Log in
                              </button>

                            &nbsp;
                            {/*<a href="/Registrarse" className="button is-primary mt-2">Registrarse</a>*/}
                          </div>
                       
                      </form>

                      {/*<a className="Recuperacion" href="http://#">Deseas recuperar tu clave?</a>*/}
                    </div>
                    </center>
                  </div>
                </div>
                
                <div className="column" >
                   
                </div>

            </div>
            
        );
    }

    /*async handleSwitchChange(event){

        if(event.target.checked === false){
            this.setState({
                data: {
                    document : this.state.data.document ,
                    password : this.state.data.password ,
                    manager: event.target.checked,                    
                }
            })
            
        }else{
            this.setState({
                data: {
                    document : this.state.data.document ,
                    password : this.state.data.password ,
                    manager: event.target.checked,                   
                    
                }
            })
        }
    }
    */

      
    async manejarEnvioDeFormulario(evento) {

        evento.preventDefault();  
        //callOtherDomain();
        


        const continuar = () =>{
            swal({
              title: "Hello!",
              text: "Start with the tour!",
              icon: "success",                        
            }).then(function() {
                if (rol_id===1) {    
                    //{props.incrementarC}
                    window.location = "/MenuUsuario";
                }
                else if (rol_id===2){    
                    //{props.incrementarC}
                    window.location = "/MenuAdministrativo";    
                }
                else if (rol_id===3){    
                    //{props.incrementarC}
                    window.location = "/MenuAdministrativo";    
                }
                else{
                    window.location = "/";
                }

                
            });
        }

        const detener = () =>{
            swal({
              title: "¡Error!",
              text: "I got an error! When trying to log in!",
              icon: "error",
              timer: 6000,
            });
        }
    
        

        const cargaUtil = JSON.stringify(this.state.data);
        
        //console.log(cargaUtil);

        //var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Login`, 

        
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Login`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });
  
        
        
        //console.log(respuesta)

        /*
        var GuardarUser;

        //const respuesta= 
        await axios({
          method: "POST",
          url:"https://proyecto-meca-cali.herokuapp.com/Login",
          headers: {
            'Content-Type' : 'application/json',
            'accept': 'application/json',
            'Access-Control-Allow-Origin' : 'POST',
            'Access-Control-Allow-Methods':'POST',
          }
        },{"document ":"santiflo17@gmail.com","password ":"hola1234"}).then((response) => {          
          console.log("respuesta",response)
          GuardarUser= response.data;   
           console.log("Datos",GuardarUser)
        }).catch((error) => {
          if (error.response) {
            console.log("error respuesta",error.response)
            console.log("status",error.response.status)
            console.log(error.response.headers)
            }
        });
        */
        

        /*

        await axios({
          method: "GET",
          url:"https://proyecto-meca-cali.herokuapp.com/Login",
          headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
        }).then((response) => {
          const res =response  
          console.log("respuesta1",res)    
        }).catch((error) => {
          if (error.response) {
            console.log("respuesta",error.response)
            console.log("status",error.response.status)
            console.log(error.response.headers)
            }
        });  

        */ 


        
                
        
        /*await fetch(`https://proyecto-meca-cali.herokuapp.com/Login`, {
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          method: 'GET',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
        }).then(response => response.json()){
            //then(function (response) {
            console.log("lo del respuesta",response);

            if (response.status === 200) {
              alert('Se pudo obtener los datos');
            } else {
              alert('Hay un error');
            }
            // you cannot parse your "success" response, since that is not a valid JSON
            // consider using valid JSON req/resp pairs.
            // return response.json();
        });*/

        var existe;
        var idUser=0;
        var statusr=respuesta.status;  //donde guarda el estatus 
        //var statusr=202;
        var rol_id=0;
          

        if (statusr===202) {
            existe= await respuesta.json();
            //console.log("GuardarUser",existe) 
            rol_id=existe.rol_id;
            //console.log("rol_id en login:",rol_id)

            idUser=existe.id;
            //console.log("Id user",idUser)

            if (rol_id===1) {
                cookies.set('document', this.state.data.document, {path: "/"});
                cookies.set('rol_id', rol_id, {path: "/"});
                cookies.set('idUser', idUser, {path: "/"});
            }
            else if (rol_id===2){
                cookies.set('document', this.state.data.document, {path: "/"});
                cookies.set('rol_id', rol_id, {path: "/"});
                cookies.set('idUser', idUser, {path: "/"});
            }
            else if(rol_id===3){
                cookies.set('document', this.state.data.document, {path: "/"});
                cookies.set('rol_id', rol_id, {path: "/"});
                cookies.set('idUser', idUser, {path: "/"});
            }
            else{
                cookies.set('document', this.state.data.document, {path: "/"});
                cookies.set('rol_id',0, {path: "/"});    
                cookies.set('idUser', idUser, {path: "/"});
            }
            
            this.setState({
                data: {
                    document: "",
                    password: "",
                    //manager: false,                   
                }
            });

            
            continuar(); 

        } else {
            detener();
        }


    }


    manejarCambio(evento) {

        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            //if(clave === "document") {
            //    valor = parseInt(valor);
            //}  
            const dataActualizado = state.data;            
            dataActualizado[clave] = valor;
            return {
                data: dataActualizado,
            }
        });
    }
    
}

export default Login;