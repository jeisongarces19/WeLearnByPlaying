import React from 'react';
//import Constantes from "../Constantes";
import '../App.css';
import '../Styles/perfil.css';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const idUser6 = cookies.get('UserMoment');


class ObservarUser extends React.Component {   

    constructor(props) {
        super(props);
        this.state = {
            data: {
                "id":"",
                "name": "" ,
                "last_name_1": "",
                "last_name_2": "",  
                "type_document": "",                
                "document": "",
                "password": "",                  
                "rol_id": "",                           
                "picture":"https://pngimage.net/wp-content/uploads/2018/05/administrador-icono-png-5.png",
                "describe": "", 
            },
        };

        this.componentDidMount = this.componentDidMount.bind(this)
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
       
    }

    cerrarSesion=()=>{
        cookies.remove('UserMoment', {path: "/ObservarUser"});

        window.location.href='./OpcionesAdministrativas';
    }



    async componentDidMount() {  

        
        //var respuesta = await fetch(`json/postres.json`+idUser6,
        //var respuesta = await fetch(`json/Users.json`,  
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/User/Search/id/`+idUser6, 
        {
            method: "GET",   
        });

        //var Users= await respuesta.json();
        //console.log(Users[0])

        var Users= await respuesta.json();
        //console.log(Users)
        //var Users= UsersT[0];


        //console.log(Users)

        var Name=Users.name;
        var Last_name_1=Users.last_name_1;
        var Last_name_2=Users.last_name_2;
        var Type_document=Users.type_document;
        var Document=Users.document;        
        var Password=Users.password;
        var Rol_id=Users.rol_id;
        var Describe=Users.describe;
        var Picture=Users.picture;        
        
        if (Name===null) {
          Name="";
        }
        if (Last_name_1===null) {
          Last_name_1="";
        }
        if (Last_name_2===null) {
          Last_name_2="";
        }
        if (Type_document===null) {
          Type_document="";
        } 
        if (Document===null) {
          Document="";
        }        
        if (Password===null) {
          Password="";
        }
        if (Rol_id===null) {
          Rol_id="";
        }
        if (Describe===null) {
          Describe="";
        }
        if (Picture===null) {
          Picture="";
        }

        this.setState({
          data: {
                id:idUser6,
                name:Name,
                last_name_1: Last_name_1,
                last_name_2: Last_name_2,  
                type_document: Type_document,              
                document: Document,
                password: Password,                  
                rol_id: Rol_id,   
                describe:Describe,           
                picture:Picture,
          }
        });
        
    }



    render() {
        let inputRol;
        //console.log(this.state.data.rol_id)
        if (this.state.data.rol_id===3) {
                inputRol = <div className="form-group">
                                <input disabled='disabled' autoFocus required placeholder="🆎 Role ✔" type="text" id="rol_id" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.rol_id} >
                                </input> 
                            </div>
        } else {
            inputRol = <div className="form-group">
                                <input autoFocus required placeholder="🆎 Role ✔" type="text" id="rol_id" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.rol_id} >
                                </input> 
                            </div>
        }
        return (

            <div className="columns central style={{padding: '40px 0px 30px'}}">
                <div className="column">
                    <center>

                        <div className="photo-container">
                            <img alt="..." src={this.state.data.picture}>
                            </img>
                        </div>
                    </center>


                </div>

                <div className="column" >

                    <div className="cardPerfil">
                        <center>
                    
                        

                        <h1 className="perfilletra">PROFILE</h1>  

                      
                        <form className="" onSubmit={this.manejarEnvioDeFormulario}>

                            <div className="columns central">

                                <div className="column" >

                                    <div className="form-group">
                                        <input autoFocus required placeholder="🆎 Names " type="text" id="name" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.name} >
                                        </input> 
                                    </div>

                                    <span> ◦◦◦ </span>

                                    <div className="form-group">
                                        <input autoFocus placeholder="🅰️ Surname " type="text" id="last_name_1" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.last_name_1} >
                                        </input>
                                    </div>

                                    <span> ◦◦◦ </span>
                                        

                                    <div className="form-group">
                                        <input autoFocus required placeholder="🆔 Type document ✔" type="text" id="type_document" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.type_document} >
                                        </input>                      
                                    </div>                          
                                           
                                    <span> ◦◦◦ </span>

                                    <div className="form-group">
                                        <input autoFocus required placeholder="🔑 Password ✔" type="text" id="password" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.password}>
                                        </input> 
                                    </div>

                                    <span> ◦◦◦ </span>

                                    <div className="form-group">
                                        <input autoFocus placeholder="📷 Photo(Url) Formal photo " type="text" id="picture" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.picture} >
                                        </input>
                                    </div>   

                                    <span> ◦◦◦ </span> 

                                    <div className="form-group">
                                        <textarea placeholder="☕ Personal description" className="FondoInput" id="describe"  onChange={this.manejarCambio} value={this.state.data.describe}></textarea>
                                    </div> 


                                     

                                </div>   

                                <div className="column" >
                                    <div style={{height: '30px'}}>
                                        🌐
                                    </div>

                                    <span> ◦◦◦ </span>

                                    <div className="form-group">
                                        <input autoFocus  placeholder="🅱️ Second surname " type="text" id="last_name_2"className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.last_name_2} >
                                        </input>
                                    </div>

                                    <span> ◦◦◦ </span>

                                    <div className="form-group">
                                        <input autoFocus required placeholder="🆔 Id document ✔" type="text" id="Document" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.document} >
                                        </input>                      
                                    </div>

                                    <span> ◦◦◦ </span>

                                    {/*Asi defino si quiero que se vea o no*/}
                                    {inputRol} 

                                    <span> ◦◦◦ </span> 

                                    <div className="form-group">
                                        <input autoFocus placeholder="🆎 Grade ✔" type="text" id="grade" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.grade} >
                                        </input> 
                                    </div> 

                                    <span> ◦◦◦ </span>
                                    
                                    <div className="form-group">
                                        <input autoFocus placeholder="🆎 Curse ✔" type="text" id="curse" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.curse} >
                                        </input> 
                                    </div>
                                       

                                    
                                </div>     
                            </div> 

                            <div className="form-group">
                                <button className="button is-primary mt-2" onClick={()=>this.cerrarSesion()} >
                                    Update Information
                                </button>                                
                            </div> 


                        </form>
                        </center>
                    </div>
                </div>

                <div className="column">  
                </div>
            </div>
        );
    }

    async manejarEnvioDeFormulario(evento) {

         const continuar = () =>{
            swal({
              title: "TO UPDATE",
              text: "Your username has been updated :) Congratulations!",
              icon: "success",              
            }).then(function() {
                window.location = "/Perfil";
            });
        }

        const detener = () =>{
            swal({
              title: "ERROR",
              text: "An error occurred while updating the user",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again!");
              }
            });
        }

        evento.preventDefault();

        const cargaUtil = JSON.stringify(this.state.data);
        //console.log(cargaUtil);

        
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/User/Update`, 
        {
            method: "PUT",            
            body: cargaUtil,   
        });

        //console.log("respuesta de todo",respuesta)
        var statusr;
       
        statusr=respuesta.status;     

        if (statusr===200) {
            continuar(); 
        } else {        
            detener();
        }

    }

    manejarCambio(evento) {
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const userActualizado = state.data;
            userActualizado[clave] = valor;
            return {
                data: userActualizado,
            }
        });
    }
    
}

export default ObservarUser;