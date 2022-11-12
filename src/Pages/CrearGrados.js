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
            <img src={Expo.picture_grade} alt={Expo.name_grade}/>
          </div>
          <p>{Expo.name_grade}</p>  
          <h3>{Expo.describe}</h3> 
        </div>      
      </div>
    </div>
  );
}

class CrearGrados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {    
                "name_grade":"Give me the grade",
                "describe":"Describe the grade",
                "picture_grade": "https://www.uniguajira.edu.co/media/k2/items/cache/0e10dc31a783038aaa2ac17353b1949b_L.jpg",
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
                        <h1 className="crearExposicionletra"> ¡GRADES 🎓! </h1>                
                        
                        <form className="" onSubmit={this.manejarEnvioDeFormulario}>

                            <div className="form-group">                            
                                <input autoFocus required placeholder="🆎 Name Grade ✔" type="text" id="name_grade" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.name_grade} >
                                </input> 
                                
                            </div>
                            <span> </span>
                            <div className="form-group">
                                <textarea rows="3" placeholder="☕ Describe your degree" className="FondoInput" id="describe" onChange={this.manejarCambio} value={this.state.data.describe}></textarea>
                            </div>  
                            <span> </span>
                            <div className="form-group">
                                <input autoFocus required placeholder="🅱️ Representative image" type="text" id="picture_grade" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.picture_grade} >
                                </input>
                            </div>                            
                            <span> </span>                      
                            <div className="form-group">
                                <button className="button is-primary mt-2">
                                    Create Grade
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
              text: "¡Your grade has been created!",
              icon: "success",              
            }).then(function() {
                window.location = "/AdministrarGrados";
            });
        }

        const detener = () =>{
            swal({
              title : "¡Error!",
              text: "¡An error occurred while creating the grade!",
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

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Grade/Create`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });

        //console.log("respuesta de todo",respuesta) 


       
        var statusr=respuesta.status; 
       
        
        if (statusr===201) {
           
            this.setState({
                data: {                    
                    "name_grade":"Welcome",
                    "describe":"Describe your grade",
                    "picture_grade": "http://www.webquestcreator2.com/majwq/files/files_user/62538/hola-gif-21.gif",
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
export default CrearGrados;