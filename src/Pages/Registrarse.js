import React from 'react';
//import Constantes from "../Constantes";
import swal from 'sweetalert';
import '../Styles/registrarse.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


//const email3 = cookies.get('email');
const rol_id = cookies.get('rol_id');



class Registrarse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                "name": "" ,
                "last_name_1": "",
                "last_name_2": "",  
                "type_document": "",                
                "document": "",
                "password": "",                  
                "rol_id": "",                           
                "picture":"",
                "describe": "", 
                
            },
            control:{
                'mirar':false,
            },
        };
        // Indicarle a las funciones a quién nos referimos con "this"
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
        this.manejarCambio = this.manejarCambio.bind(this);
        
    }

    
    render() {
        if(rol_id===undefined) {
            //console.log("entro",rol_id);
            this.state.data.rol_id=2;
            this.state.control.mirar=false;
        }

        return (

            <div className="columns centralReg">
                <div className="column"></div>

                <div className="column" >

                    <div className="cardRegistrarse">
                        <center>

                        <h1 className="registerletra">REGISTER</h1>                
                      
                        <form className="" onSubmit={this.manejarEnvioDeFormulario}>

                            <div className="form-group">
                                <input autoFocus required placeholder="🆎 Names " type="text" id="name" className="FondoInputReg"  onChange={this.manejarCambio} value={this.state.data.name} >
                                </input> 
                            </div>

                            <div className="form-group">
                                <input autoFocus placeholder="🅰️ Surname " type="text" id="last_name_1" className="FondoInputReg"  onChange={this.manejarCambio} value={this.state.data.last_name_1} >
                                </input>
                            </div>

                            <div className="form-group">
                                <input autoFocus  placeholder="🅱️ Second surname " type="text" id="last_name_2"className="FondoInputReg"  onChange={this.manejarCambio} value={this.state.data.last_name_2} >
                                </input>
                            </div>   

                            <div className="form-group">
                                <input autoFocus required placeholder="🆔 Type document (CC,TI) ✔" type="text" id="type_document" className="FondoInputReg"  onChange={this.manejarCambio} value={this.state.data.type_document} >
                                </input>                      
                            </div>                         
                                   
                            <div className="form-group">
                                <input autoFocus required placeholder="🆔 Id document ✔" type="text" id="document" className="FondoInputReg"  onChange={this.manejarCambio} value={this.state.data.document} >
                                </input>                      
                            </div>

                            <div className="form-group">
                                <input autoFocus required placeholder="🔑 Password ✔" type="text" id="password" className="FondoInputReg"  onChange={this.manejarCambio} value={this.state.data.password}>
                                </input> 
                            </div>

                            

                            <div className="form-group">
                                <input autoFocus required disabled={(this.state.control.mirar)} placeholder="🆎 rol_id  ✔" type="number" max="3" id="rol_id" className="FondoInputReg"  onChange={this.manejarCambio} value={this.state.data.rol_id} >
                                </input> 
                            </div>

                        
                            <div className="form-group">
                                <input autoFocus placeholder="📷 Photo(Url) Formal photo " type="text" id="picture" className="FondoInputReg"  onChange={this.manejarCambio} value={this.state.data.picture} >
                                </input>
                            </div>     

                            {/*
                            <div className="form-group">
                                <input autoFocus required placeholder="🆎 Grade ✔" type="text" id="grade" className="FondoInputReg"  onChange={this.manejarCambio} value={this.state.data.grade} >
                                </input> 
                            </div>
                            */}

                            {/*
                            <div className="form-group">
                                <input autoFocus required placeholder="🆎 Curse ✔" type="text" id="curse" className="FondoInputReg"  onChange={this.manejarCambio} value={this.state.data.curse} >
                                </input> 
                            </div>
                            */}    

                            <div className="form-group">
                                <textarea placeholder="☕ Personal Description" className="FondoInputReg" id="describe"  onChange={this.manejarCambio} value={this.state.data.describe}></textarea>
                            </div> 

                            {/*
                            <div className="form-group">
                                <input autoFocus required placeholder="📅 Fecha de Nacimiento ✔" type="datetime-local" id="born_date" className="FondoInputReg"  onChange={this.manejarCambio} value={this.state.data.born_date}  >
                                </input>
                            </div> 
                            */}

                            <div className="form-group">
                                <button className="button is-primary mt-2">
                                    Register
                                </button>

                                
                            </div>    

                            <h3> Required fields (✔) </h3>                
                        
                        </form>
                        </center>
                    </div>
                </div>

                <div className="column"></div>

            </div>

        );
    }
    

   


    async manejarEnvioDeFormulario(evento) {

        const continuar = () =>{
            swal({
              title: "Record!!",
              text: "User has been created",
              icon: "success",              
            }).then(function() {
                window.location = "/Registrarse";
            });
        }

        const detener = () =>{
            swal({
              title: "¡Error!",
              text: "An error occurred while creating the user",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again?");
              }
            });
        }


        evento.preventDefault();
       
        const cargaUtil = JSON.stringify(this.state.data);

        console.log(cargaUtil);   

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/User/Create`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });

        console.log("respuesta de todo",respuesta) 


       
        var statusr=respuesta.status;     

        if (statusr===201) {
           
            this.setState({
                data: {
                    "name": "" ,
                    "last_name_1": "",
                    "last_name_2": "",  
                    "type_document": "",                
                    "document": "",
                    "password ": "",                  
                    "rol_id": "",                           
                    "picture":"",
                    "describe": "",                       
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
            if(clave === "rol_id") {
                valor = parseInt(valor);
            }                
            const dataActualizado = state.data;            
            dataActualizado[clave] = valor;
            return {
                data: dataActualizado,
            }
        });
    }


    
        
}

export default Registrarse;