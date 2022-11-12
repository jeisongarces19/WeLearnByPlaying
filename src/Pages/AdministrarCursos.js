
import React,{useState} from 'react';
//import Constantes from "../Constantes";

import '../Styles/Administrarcursos.css';
import '../Styles/administrarExposiciones.css';

import swal from 'sweetalert';
import {Paginacion} from '../Components/Paginacion';
//import {Pokemons} from '../Data/Pokemons';
import styles from '../styles.module.scss';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

//const email3 = cookies.get('email');
//const admin3 = cookies.get('adminis');
const id_ser3 = parseInt(cookies.get('idUser'));


function ObservarDirecto(props) { 
    cookies.set('idexpo', props, {path: "/"});
    const continuar = () =>{
        swal({
          title: "¡Congratulations!",
          text: "¡Now you can access this course!"+props+ "",
          icon: "success",                        
        }).then(function() {            
            window.location = "/AdministrarExposiciones";            
        });
    }

    continuar()
    
}



function PaginasExposiciones(props) {
  const [pagina, setPagina] = useState(1);
  
  var tam;
  var mq = window.matchMedia( "(min-width: 600px)" );

  if(mq.matches) {
    tam=3;
  }else {
    tam=2;
  }

  //console.log("tamaño",tam)

  var [porPagina] = useState (tam);


  const Expo=props.todo;
  //console.log("Lo que llega a paginar paginas",Expo)

  const maximo = Expo.length / porPagina;

  //console.log("maximo",maximo)

  return (
    <div className={styles.container}>
      <div className={styles.containerPoke}>
      {Expo.slice (
        (pagina - 1) * porPagina,
        (pagina - 1) * porPagina + porPagina
      ).map ((Expo, i) => (
        <div key={i} className={styles.pokeContainer}>


            <button id="expo" onClick={() => ObservarDirecto(Expo.id)}>

              <h3>ID: {Expo.id}</h3>  
              <div className={styles.imgContainer}>
                <img src={Expo.picture_course} alt={Expo.name_course} />
              </div>
              <p>{Expo.name_course}</p>
              <p>{Expo.describe}</p>  

            </button>

        </div>
      ))}
      </div>

      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </div>
  );
}


class AdministrarCursos extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          data: {
            "id": "", 
            "busqueda": "",
            "Exposiciones": [],
            "BusquedaExposicion": [],
          },
        };

        this.componentDidMount1 = this.componentDidMount1.bind(this);
        this.componentDidMount2 = this.componentDidMount2.bind(this);
        this.manejarCambio = this.manejarCambio.bind(this);  
        this.observarExposicion = this.observarExposicion.bind(this);
        this.eliminarExposicion = this.eliminarExposicion.bind(this);      
        
    }

    async componentDidMount1() {

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Course`, 
        {
            method: "GET",    
        });            
        
        var existe;
        var statusr=respuesta.status;  

        if (statusr===200) {
            existe= await respuesta.json(); 

            //console.log(existe)
            
            this.setState({
                data: {
                    id:  this.state.data.id, 
                    Exposiciones:  existe,  
                    busqueda: this.state.data.busqueda,
                    BusquedaExposicion: this.state.data.BusquedaExposicion,                         
                }
            });
        }
    }



    async componentDidMount2() {

        if (this.state.data.busqueda==="") {
            
            var respuesta2 = await fetch(`https://fun-english-cali.herokuapp.com/Course`, 
            {
                method: "GET",    
            });            
            
            var existe2;
            var statusr=respuesta2.status;  

            if (statusr===200) {
                existe2= await respuesta2.json(); 
                console.log(existe2)
                
                this.setState({
                    data: {
                        id:  this.state.data.id, 
                        Exposiciones:  this.state.data.Exposiciones,  
                        busqueda: this.state.data.busqueda,
                        BusquedaExposicion: existe2,                         
                    }
                });
            }

        }else{        
            var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Course/Search/name_course/`+this.state.data.busqueda, 
            {
                method: "GET",    
            });            
            
            var existe;
            var statusrr;
            statusrr=respuesta.status;  

            if (statusrr===200) {
                existe= await respuesta.json();                 
                this.setState({
                    data: {
                        id:  this.state.data.id, 
                        Exposiciones:  this.state.data.Exposiciones,  
                        busqueda: this.state.data.busqueda,
                        BusquedaExposicion: existe,                         
                    }
                });
            }
        }

    }


    render() {
        return (
    
            <div className="columns central">

              <div className="column"></div>

                <div className="column is-two-thirds" >

                    <div className="cardAdmCursos">
                    <center>

                        <h1 className="adminExpoletra"> ¡COURSES🎓! </h1>   

                        <br></br>

                        <div className="form-group">                                
                            <input autoFocus required placeholder="Search By Name" type="text" id="busqueda" className="FondoInput" onChange={this.manejarCambio} value={this.state.data.busqueda}>
                            </input>
                        </div>

                        <div className="form-group">
                            <button className="button is-success mt-2" onClick={this.componentDidMount2}>
                                Show Courses
                            </button>
                        </div>

                        {this.state.data.BusquedaExposicion.length===0 ?(
                            <h3>Loading...Push me</h3>
                            ):( 
                                <PaginasExposiciones todo={this.state.data.BusquedaExposicion}></PaginasExposiciones>                                                      
                            )
                        } 

                        <br></br>
                        
                        <div className="form-group">                                
                            <input autoFocus required placeholder="Write the ID: " type="number" id="id" className="FondoInput" onChange={this.manejarCambio} value={this.state.data.id}>
                            </input>
                        </div>
                                             

                        <div className="form-group">
                            <button className="button is-success mt-2" onClick={this.observarExposicion}>
                                See Courses
                            </button>
                        </div>



                        <div className="form-group">
                            <button className="button is-primary mt-2">
                                <a rel="noreferrer" href="/CrearCursos">Create Courses</a>
                            </button>
                        </div>


                        <div className="form-group">
                            <button className="button is-success mt-2" onClick={this.eliminarExposicion}>
                                Dalete Course
                            </button>
                        </div>

                                                 
            
                    </center>
                    </div>
                </div>
                
                <div className="column" >
                    
                </div>

            </div>
            
        );
    }




    async eliminarExposicion(evento){
        evento.preventDefault();
        
        const continuar = () =>{
            swal({
              title: "¡Remove!",
              text: "¡Deleting Course!",
              icon: "success",                        
            }).then(function() {
                window.location = "/AdministrarGrados";                            
            });
        }

        const detener = () =>{
            swal({
              title: "¡Error!",
              text: "¡There is no Course!",
              icon: "error",
              timer: 6000,
            });
        }    

        //console.log("respuesta de todo",id_ser3+`/`+this.state.data.id) 
        

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Course/Delete/`+parseInt(this.state.data.id), 
        {
            method: "DELETE",    
        });

        //console.log("respuesta de todo",respuesta) 
                
        var statusr=respuesta.status;

        //console.log("status",respuesta) 
                
          
        if (statusr===200) {
            
            this.setState({
                data: {
                    id: "", 
                    Exposiciones: this.state.data.Exposiciones,  
                    busqueda: this.state.data.busqueda,
                    BusquedaExposicion: this.state.data.BusquedaExposicion, 
                }
            });            
            continuar(); 
        } else {
            detener();
        }
    }



    async observarExposicion(evento){
        evento.preventDefault();

        const continuar = () =>{
            swal({
                title: "!Congratulations!",
                text: "¡Now you can access this Course!",
                icon: "success",                        
            }).then(function() {
                    
                    window.location = "/AdministrarExposiciones";
                    
                });
        }

        const detener = () =>{
            swal({
              title: "¡Error!",
              text: "¡This Course does not exist!",
              icon: "error",
              timer: 6000,
            });
        }  

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Course/Search/id/`+parseInt(this.state.data.id), 
        {
            method: "GET",    
        });   

        var existe;
        existe= await respuesta.json();   

        if (Object.keys(existe).length === 0) {            
            detener()
        }else{
            cookies.set('idexpo', this.state.data.id, {path: "/"});
            continuar()
        }           
        
    }




  

    manejarCambio(evento) {

        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const dataActualizado = state.data;            
            dataActualizado[clave] = valor;
            return {
                data: dataActualizado,
            }
        });
    }
    
}

export default AdministrarCursos;