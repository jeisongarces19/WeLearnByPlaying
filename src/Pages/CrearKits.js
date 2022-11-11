import React from 'react';

import '../Styles/crearjuegos.css';
import styles from '../styles.module.scss';

import swal from 'sweetalert';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const id_ser3 = parseInt(cookies.get('idUser'));

function PaginasExposiciones (props) {

  const Expo=props.todo;

  return (
    <div className={styles.container}>
      <div className={styles.containerPoke}>
        <div className={styles.pokeContainer}>
            
          <div className={styles.imgContainer}>
            <img src={Expo.picture} alt={Expo.title} />
          </div>
          <p >{Expo.title}</p>  
          <h3>{Expo.description}</h3> 

        </div>
      
      </div>
    </div>
  );
}

class CrearKits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {    
                "user_id":id_ser3,  
                "title":"Give me title",
                "description":"Describe your Kit ",
                "picture": "https://i.blogs.es/106008/mejores-juegos-2021/840_560.jpeg",
                "url":"",
                "lesson_type_id":2,
            },
        };
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
        this.manejarCambio = this.manejarCambio.bind(this);


    }

    render() {
        return (
    
            <div className="columns central">

              <div className="column"></div>

                <div className="column" >

                    <div className="cardCrearJuegos">
                    <center>
                        <h1 className="crearExposicionletra"> ¡Kits 🎮🕹! </h1>                
                        
                        <form className="" onSubmit={this.manejarEnvioDeFormulario}>

                            <div className="form-group">                            
                                <input autoFocus required placeholder="🆎Title ✔" type="text" id="title" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.title} >
                                </input> 
                                
                            </div>

                            <span> </span>

                            <div className="form-group">
                                <textarea rows="3" placeholder=" Describe your Kit " className="FondoInput" id="description"  onChange={this.manejarCambio} value={this.state.data.description}></textarea>
                            </div>  

                            <div className="form-group">
                                <input autoFocus required placeholder="🅱️ Picture" type="text" id="picture" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.picture} >
                                </input>
                            </div>  

                            <div className="form-group">
                                <input autoFocus placeholder="🅱️ Kit link" type="text" id="url" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.url} >
                                </input>
                            </div>  

                                            

                            <div className="form-group">
                                <button className="button is-primary mt-2">
                                    Create Kit 
                                </button>
                            </div>   
                        </form>
                        
                        <PaginasExposiciones todo={this.state.data}></PaginasExposiciones>

                    </center>
                    </div>
                </div>
                
                <div className="column" >
                    
                </div>

            </div>
            
        );
    }

    async manejarEnvioDeFormulario(evento) {

        const continuar = () =>{
            swal({
              title: "¡Creation!",
              text: "¡Your Kit  has been created!",
              icon: "success",              
            }).then(function() {
                window.location = "/AdministrarKit";
            });
        }

        const detener = () =>{
            swal({
              title : "¡Error!",
              text: "¡An error occurred while creating the Kit !",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("¡Try again!");
              }
            });
        }


        evento.preventDefault();

        const cargaUtil = JSON.stringify(this.state.data);
        //console.log(cargaUtil);   

        

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Create`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });

        //console.log("respuesta de todo",respuesta) 


       
        var statusr=respuesta.status; 
       
        
        if (statusr===201) {
            console.log(statusr)
           
            this.setState({
                data: {
                    "user_id":this.state.data.user_id,  
                    "title":"Give me title",
                    "description":"Describe your Kit ",
                    "picture": "https://i.blogs.es/106008/mejores-juegos-2021/840_560.jpeg",
                    "url":"",
                    "lesson_type_id":2,
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
            const dataActualizado = state.data;            
            dataActualizado[clave] = valor;
            return {
                data: dataActualizado,
            }
        });
    }

}
export default CrearKits;