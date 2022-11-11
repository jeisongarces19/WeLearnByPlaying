
import React,{useState} from 'react';
//import Constantes from "../Constantes";

import 'react-toastify/dist/ReactToastify.css';
import '../Styles/listarExposicionesVirtuales.css';

import swal from 'sweetalert';
import {Paginacion} from '../Components/Paginacion';
//import {Pokemons} from '../Data/Pokemons';
import styles from '../styles.module.scss';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const rol_id = cookies.get('rol_id');
const idexpo = parseInt(cookies.get('idexpo'));


//const email3 = cookies.get('email');
//const admin3 = cookies.get('adminis');

function ObservarDirecto(props) { 
    cookies.set('idexpo', props, {path: "/"});
    const continuar = () =>{
        swal({
          title: "Hello!",
          text: "Now you can see the activity "+props+ "",
          icon: "success",                        
        }).then(function() {            
            window.location = "/ExposicionesVirtuales";            
        });
    }

    continuar()
    
}


function PaginasExposiciones (props) {
  const [pagina, setPagina] = useState (1);


  var mq = window.matchMedia( "(min-width: 600px)" );
  var tam;
  
  if(mq.matches) {
    tam=3;
  }else {
    tam=2;
  }
  
  const [porPagina] = useState (tam);
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
                <img src={Expo.picture} alt={Expo.title} />
              </div>
              <p >{Expo.title}</p>  
            </button>

            

        </div>
      ))}
      </div>

      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </div>
  );
}



class ListarExposicionesVirtuales extends React.Component {
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
       
        this.componentDidMount2 = this.componentDidMount2.bind(this);
        this.manejarCambio = this.manejarCambio.bind(this);        
        this.observarExposicion = this.observarExposicion.bind(this);
    }


    async componentDidMount2() {

        {/*var Accesso;
        console.log("rol_id",rol_id)
        console.log("idexpo",idexpo)
        if (rol_id===undefined) {
            Accesso=`https://fun-english-cali.herokuapp.com/Lesson/Search/course_id/`+idexpo+``;
        } else {
            Accesso=`https://fun-english-cali.herokuapp.com/Lesson/Search/lesson_type_id/`+4+``;
        } 
        */}

        if (this.state.data.busqueda==="") {
            
            var respuesta2 = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Search/course_id/`+idexpo+``, 
            {
                method: "GET",    
            });            
            
            var existe2;
            var statusr=respuesta2.status;  

            if (statusr===200) {
                existe2= await respuesta2.json(); 
                
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
            var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Search/title/`+this.state.data.busqueda, 
            {
                method: "GET",    
            });            
            
            var existe;
            var statusrr=respuesta.status;  

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
    
            <div className="columns">

              <div className="column"></div>

                <div className="column is-two-thirds" >

                    <div className="cardListarExposic">
                    <center>

                        <h1 className="adminExpoletra"> ¡ACTIVITYS! </h1>   

                        <br></br>

                        <div className="form-group">                                
                            <input autoFocus required placeholder="Search Title" type="text" id="busqueda" className="FondoInput" onChange={this.manejarCambio} value={this.state.data.busqueda} >
                            </input>
                        </div>

                        <div className="form-group">
                            <button className="button is-success mt-2" onClick={this.componentDidMount2}>
                                See Activity
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
                            <input autoFocus required placeholder="write the ID" type="text" id="id" className="FondoInput" onChange={this.manejarCambio} value={this.state.data.id} >
                            </input>
                        </div>
                                             

                        <div className="form-group">
                            <button className="button is-success mt-2" onClick={this.observarExposicion}>
                                See Activity
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


    async observarExposicion(evento){
        evento.preventDefault();

        const continuar = () =>{
                swal({
                  title: "Hello!",
                  text: "Now you can see the activities "+this.state.data.id+ "",
                  icon: "success",                        
                }).then(function() {
                    
                    window.location = "/ExposicionesVirtuales";
                    
                });
        }

        const detener = () =>{
            swal({
              title: "Error",
              text: "There is no such activity",
              icon: "error",
              timer: 6000,
            });
        }  

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Search/id/`+parseInt(this.state.data.id), 
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

export default ListarExposicionesVirtuales;