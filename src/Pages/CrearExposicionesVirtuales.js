import React from 'react';

import '../Styles/CrearExposicionesV.css';
import '../Styles/crearExposicion.css';
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

class CrearExposicionesVirtuales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {      
                "user_id": id_ser3,     
                "title":"give me a title",
                "description":"Describe your exhibition",
                "picture": "http://www.webquestcreator2.com/majwq/files/files_user/62538/hola-gif-21.gif",
                "course_id":1,
                "url":"",
                "lesson_type_id":4,


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

                    <div className="cardCrearAdmExposiciones">
                    <center>
                        <h1 className="crearExposicionletra"> ¡ACTIVITIES! </h1>                
                        
                        <form className="" onSubmit={this.manejarEnvioDeFormulario}>

                            <div className="form-group">                            
                                <input autoFocus required placeholder="🆎Title ✔" type="text" id="title" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.title} >
                                </input> 
                                
                            </div>

                            <span> </span>

                            <div className="form-group">
                                <textarea rows="3" placeholder="☕ Describe" className="FondoInput" id="description"  onChange={this.manejarCambio} value={this.state.data.description}></textarea>
                            </div>  

                           
                            <div className="form-group">
                                <input autoFocus required placeholder="🅱️ Imagen" type="text" id="picture"className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.picture} >
                                </input>
                            </div> 

                            <div className="form-group">                            
                                <input autoFocus required placeholder="🆎 ID Course ✔" type="number" id="course_id" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.course_id} >
                                </input>                                 
                            </div>   

                            <div className="form-group">                            
                                <input autoFocus required placeholder="🆎 URL ✔" type="text" id="url" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.url} >
                                </input>                                 
                            </div>     

                            <div className="form-group">                            
                                <input disabled autoFocus required placeholder="🆎 Type Activity ✔" type="number" id="lesson_type_id" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.lesson_type_id} >
                                </input>                                 
                            </div>   

                            <div className="form-group">
                                <button className="button is-primary mt-2">
                                    Create Activity
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
              text: "¡Your activity has been created!",
              icon: "success",              
            }).then(function() {
                window.location = "/AdministrarGrados";
            });
        }

        const detener = () =>{
            swal({
              title: "¡Error!",
              text: "¡An error occurred while creating the activity!",
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
        console.log(cargaUtil);   

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Create`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });

        //console.log("respuesta de todo",respuesta) 


       
        var statusr=respuesta.status; 
       
        
        if (statusr===201) {
           
            this.setState({
                data: {
                    "user_id": this.state.id_user,
                    "title":"Bienvenido",
                    "description":"Describe tu exposicion",
                    "picture": "http://www.webquestcreator2.com/majwq/files/files_user/62538/hola-gif-21.gif",
                    "course_id":'1',
                    "url":'https://support.google.com/websearch/answer/118238?hl=es-419&co=GENIE.Platform%3DAndroid#:~:text=Busca%20la%20p%C3%A1gina.-,Copia%20la%20URL%20de%20las%20siguientes%20formas%20seg%C3%BAn%20el%20navegador,y%2C%20luego%2C%20presiona%20Copiar.',
                    "lesson_type_id":4,
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
        if(clave === "course_id") {
            valor = parseInt(valor);
        }      
        if(clave === "lesson_type_id") {
            valor = parseInt(valor);
        }    
        this.setState(state => {
            const dataActualizado = state.data;            
            dataActualizado[clave] = valor;
            return {
                data: dataActualizado,
            }
        });
    }

}
export default CrearExposicionesVirtuales;