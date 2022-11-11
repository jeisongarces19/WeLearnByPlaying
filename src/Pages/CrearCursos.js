import React from 'react';
import swal from 'sweetalert';

import '../App.css';
import '../Styles/crearExposicion.css';
import styles from '../styles.module.scss';

function PaginasExposiciones(props){

  const Expo=props.todo;

  return (
    <div className={styles.container}>
      <div className={styles.containerPoke}>
        <div className={styles.pokeContainer}>            
          <div className={styles.imgContainer}>
            <img src={Expo.picture_course} alt={Expo.name_course}/>
          </div>
          <p>{Expo.name_course}</p>  
          <h3>{Expo.describe}</h3> 
        </div>      
      </div>
    </div>
  );
}

class CrearCursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {    
                "name_course":"Give me the course",
                "describe":"Describe the course",
                "picture_course": "https://elestudiantedigital.com/wp-content/uploads/2019/01/aprendiendo-a-aprender.jpg",
                "user_id":"",
                "grade_id":"",
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

                    <div className="cardCrearExposicion">
                    <center>
                        <h1 className="crearExposicionletra"> ¡COURSES🎓! </h1>                
                        
                        <form className="" onSubmit={this.manejarEnvioDeFormulario}>

                            <div className="form-group">                            
                                <input autoFocus required placeholder="🆎 Name Course ✔" type="text" id="name_course" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.name_course} >
                                </input> 
                                
                            </div>
                            <span> </span>
                            <div className="form-group">
                                <textarea rows="3" placeholder="☕ Describe your degree" className="FondoInput" id="describe" onChange={this.manejarCambio} value={this.state.data.describe}></textarea>
                            </div>  
                            <span> </span>
                            <div className="form-group">
                                <input autoFocus required placeholder="🅱️ Representative image" type="text" id="picture_course" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.picture_course} >
                                </input>
                            </div>                            
                            <span> </span>  
                            <div className="form-group">
                                <input autoFocus required placeholder="🅱️ Person id" type="text" id="user_id" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.user_id} >
                                </input>
                            </div>                            
                            <span> </span> 
                            <div className="form-group">
                                <input autoFocus required placeholder="🅱️ Grade id" type="text" id="grade_id" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.grade_id} >
                                </input>
                            </div>                            
                            <span> </span> 


                            <div className="form-group">
                                <button className="button is-primary mt-2">
                                    Create Course
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
              text: "¡Your course has been created!",
              icon: "success",              
            }).then(function() {
                window.location = "/AdministrarGrados";
            });
        }

        const detener = () =>{
            swal({
              title : "¡Error!",
              text: "¡An error occurred while creating the course!",
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

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Course/Create`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });

        console.log("respuesta de todo",respuesta) 


       
        var statusr=respuesta.status; 
       
        
        if (statusr===201) {
           
            this.setState({
                data: {                    
                    "name_course":"Welcome",
                    "describe":"Describe your course",
                    "picture_course": "https://i0.wp.com/formaciononline.eu/wp-content/uploads/2019/01/cursos-online-gratuitos.png?fit=710%2C373&ssl=1",
                    "user_id":"Course owner id:",
                    "grade_id":"Grade id:",
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
export default CrearCursos;