import React,{useState} from 'react';
//import Constantes from "../Constantes";

import '../Styles/VerAdministrarjuegos.css';

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
    //cookies.set('idexpo', props, {path: "/"});
    //console.log("los props",props);
    const continuar = () =>{
        swal({
          title: "¡Congratulations!",
          text: "¡Now you can access this game!",
          icon: "success",                        
        });
    }

    continuar()
    
}


function PaginasExposiciones (props) {
  const [pagina, setPagina] = useState (1);
  
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


            <button id="expo">
              {/*console.log("ingreso")*/} 
              <h3>ID: {Expo.id}</h3>  
              <div className={styles.imgContainer}>
                <a href={Expo.url}>
                    <img src={Expo.picture} alt={Expo.title} />
                </a>
              </div>
              <p >{Expo.title}</p>
              <p >{Expo.description}</p>  
            </button>

        </div>
      ))}
      </div>

      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </div>
  );
}




class VerAdministrarJuegos extends React.Component {
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
        //this.editarExposicion = this.editarExposicion.bind(this);
        this.observarExposicion = this.observarExposicion.bind(this);
        this.eliminarExposicion = this.eliminarExposicion.bind(this);      
        
    }

    async componentDidMount1() {

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Search/lesson_type_id/`+1, 
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
            
            var respuesta2 = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Search/lesson_type_id/`+1, 
            {
                method: "GET",    
            });            
            
            var existe2;
            var statusr=respuesta2.status;  

            if (statusr===200) {
                existe2= await respuesta2.json(); 
                {/*console.log(existe2);*/}
                
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
            var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Search/title/`+this.state.data.busqueda+`/lesson_type_id/`+1, 
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
    
            <div className="columns centralJuego">

              <div className="column"></div>

                <div className="column is-two-thirds" >

                    <div className="cardJuego">
                    <center>

                        <h1 className="adminExpoletraJuego"> ¡GAMES 🎮! </h1>   
                        <br></br>
                        <h3 className="letraSubTituloVideos">In this section you will find educational games related to topics that are seen in the classes</h3>                
                    
                        <br></br>

                        <div className="form-group">                                
                            <input autoFocus required placeholder="Search By Title" type="text" id="busqueda" className="FondoInputJuego" onChange={this.manejarCambio} value={this.state.data.busqueda} >
                            </input>
                        </div>

                        <div className="form-group">
                            <button className="button is-success mt-2" onClick={this.componentDidMount2}>
                                Show Games
                            </button>
                        </div>

                        {this.state.data.BusquedaExposicion.length===0 ?(
                            <h3>Loading...Push me</h3>
                            ):( 
                                <PaginasExposiciones todo={this.state.data.BusquedaExposicion}></PaginasExposiciones>                                                      
                            )
                        } 

                        <br></br>
                        

                                                 
            
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
              text: "¡Remove Game!",
              icon: "success",                        
            }).then(function() {
                window.location = "/AdministrarJuegos";                            
            });
        }

        const detener = () =>{
            swal({
              title: "¡Error!",
              text: "¡There is no game! You are not the owner!",
              icon: "error",
              timer: 6000,
            });
        }    

        //console.log("respuesta de todo",id_ser3+`/`+this.state.data.id) 
        

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Delete/`+parseInt(id_ser3)+`/`+parseInt(this.state.data.id), 
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
                text: "¡Now you can access this game!",
                icon: "success",                        
            }).then(function() {
                    
                    window.location = "/";
                    
                });
        }

        const detener = () =>{
            swal({
              title: "¡Error!",
              text: "¡This game does not exist!",
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

export default VerAdministrarJuegos;