import React from 'react';
import './Asistente.css';


import ReactPlayer from 'react-player';


function Parrafos(props){

    var texto=props.pagesR;
    var hablar;

    //console.log("lo que hay texto",texto)

    if(texto==="Login") {  
      hablar=[3000,"¡Bienvenido a MECA!",3000,"Soy tu asistente virtual",3000,"TE RECOMIENDO MIRAR EL MANUAL",3000,"Ubicado abajo como MANUAL MECA Project",3000,"Te encuentras ubicado en Iniciar Sesión",3000,"Donde podrás ingresar a tu cuenta.",5000,"En la parte superior hay un icono ( ? ) de gran ayuda",5000,"Si no cuenta con una.",5000,"Podras registrarte con el boton.",5000,"Tambien cuentas con una ventana de Preguntas",5000,"Donde resolveras algunas dudas",5000,"¡Saludos!",3000]
    }else if (texto==="Registrarse"){
      hablar=[3000,"¡Te encuentras en Registro!",3000,"Donde podrás crear tu cuenta",5000,"Ingresa la información requerida",5000,"En este caso:",5000,"Nombre, Correo, Clave y Fecha de nacimiento",5000,"¡Saludos!",3000]
    }else if(texto==="Pregunta"){
      hablar=[3000,"¡Te encuentras en Preguntas!",3000,"Donde podrás crear tu pregunta",5000,"Y especificar con detalle lo que quieres saber.",5000,"También podrás ver",5000,"La respuesta a otras preguntas",5000,"¡Saludos!",3000]
    }else if(texto==="MenuUsuario"){
      hablar=[3000,"¡Te encuentras en el Menú!",3000,"Donde podrás seleccionar entre:",5000,"Ver y editar tu Perfil.",5000,"Observar las Exposiciones.",5000,"Solicitar la función de administrador ó ",5000,"Salir. Para cerrar tu sesión.","¡Saludos!",3000]
    }else if(texto==="Perfil"){
      hablar=[3000,"¡Te encuentras en Perfil!",3000,"Donde podrás actualizar",3000,"Tu información personal.",5000,"Recuerda que saber de ti.",5000,"Es importante para nosotros.",5000,"¡Saludos!",3000]
    }else if(texto==="ListarExposicionesVirtuales"){
      hablar=[3000,"¡Te encuentras en Exposiciones!",3000,"Donde podrás ver cualquier exposicion.",3000,"Presionando en Mostrar Exposiciones.",3000,"También puedes",2000,"Buscar una en particular por su Titulo.",3000,"Presiona sobre la exposición que deseas ver",3000,"Ó mira una que ya conozcas por su ID.",5000,"¡Saludos!",3000]
    }else if(texto==="MenuAdministrativo"){
      hablar=[3000,"¡Te encuentras en el Menú!",3000,"Donde podrás seleccionar entre:",2000,"Crear una Exposición.",3000,"Responder o eliminar preguntas.",3000,"Al igual que editar tu Perfil.",3000,"Administrar tus Exposiciones.",3000,"Administrar los Usuarios.",5000,"No olvides salir para cerrar tu Sesión",3000,"¡Saludos!",3000]
    }else if(texto==="AdministrarPreguntas"){
      hablar=[3000,"¡Te encuentras en Administrar Preguntas!",3000,"Donde podrás responder y eliminar",5000,"Todas las dudas de los Usuarios.",5000,"Para ello, deberás colocar el ID",3000,"De la pregunta y escribir",2000,"La respuesta seguido del botón",3000,"Responder Pregunta",3000,"De igual modo, para borrar",3000,"Presionando el Botón Correspondiente",3000]
    }else if(texto==="OpcionesAdministrativas"){
      hablar=[3000,"¡Te encuentras en Administrar Usuarios!",3000,"Donde podrás modificar su Tipo o Eliminarlos.",3000,"Para ello, deberás colocar el ID",3000,"Luego presionar el Botón correspondiente",5000,"¡Saludos!",3000]
    }else if(texto==="CrearExposicionesVirtuales"){
      hablar=[3000,"¡Te encuentras en Crear Exposición!",3000,"Donde podrás crear cualquier exposición.",5000,"Ingresando Título",2000,"Descripción y una",2000,"imagen significativa",5000,"¡Saludos!",3000]
    }else if(texto==="EditarExposicionesVirtuales"){
      hablar=[3000,"¡Te encuentras en Editar Exposición!",3000,"Donde podrás modificar los elementos de la exposición.",3000,"Al igual que ver su prototipo",3000,"Para ello tienes la opción de colocar:",3000,"Su Estructura o forma de ver",3000,"Al igual que otros atributos:",3000,"Titulo, Subtitulo, Fondo, Bibliografía, Audio",3000,"Luego presionar Actualizar Onformación",3000,"De igual modo, podrás poner muchos Párrafos,",3000,"Videos, Imágenes y eliminar comentarios",3000,"¡Saludos!",3000]
    }else if(texto==="ExposicionesVirtuales"){
      hablar=[3000,"¡Bienvenido!",3000,"Diviértete y comenta que te pareció",3000,"Entérate sobre lo que está sucediendo.",3000,"¡No olvides salir al terminar!",3000,"¡Saludos!",5000]
    }else if(texto==="AdministrarExposiciones"){
      hablar=[3000,"¡Te encuentras en Exposiciones!",3000,"Donde podrás ver cualquier exposicion.",3000,"Presionando en Mostrar Exposiciones.",3000,"También puedes",2000,"Buscar una en particular por su Titulo.",3000,"Presiona sobre la exposición que deseas ver",3000,"Ó mira una que ya conozcas por su ID.",5000,"Al igual que editar o eliminar",5000,"¡Saludos!",3000]
    }else{      
      hablar=[3000,"¡Bienvenido!"]
    }

    return (
      <div>
        <span className='primary-text'>
            {" "}
            <h1>
                {" "}
                hablar
            </h1>
            
        </span>
            
      </div>
    );
}



class Asistente extends React.Component {

  constructor(props) {
    super(props)
    this.state = {     
      urlc: "" ,
      show: "",
      pages: [],
    };
    this.manejarCambio = this.manejarCambio.bind(this);
  }  

  

  manejarCambio() {  
    //console.log("Musica para:",this.props.show);

    if(this.props.show==="Login"){      
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_58000e7418.mp3", 
      });
    }else if(this.props.show==="Registrarse"){
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_792dcc0dc7.mp3" 
      });
    }else if(this.props.show==="MenuUsuario"){
      
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_473e1dd211.mp3" 
      });
    }else if(this.props.show==="Perfil"){
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_914b9bd3c1.mp3" 
      });
    }else if(this.props.show==="ListarExposicionesVirtuales"){
      
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_c5234abd14.mp3" 
      });
    }else if(this.props.show==="MenuAdministrativo"){
      
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_07d733c160.mp3" 
      });
    }else if(this.props.show==="Pregunta"){      
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_b60092ef82.mp3" 
      });
    }else if(this.props.show==="AdministrarPreguntas"){      
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_d86a295a47.mp3" 
      });
    }else if(this.props.show==="OpcionesAdministrativas"){      
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_b47220272b.mp3" 
      });
    }else if(this.props.show==="CrearExposicionesVirtuales"){      
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_ab3e079313.mp3" 
      });
    }else if(this.props.show==="EditarExposicionesVirtuales"){      
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_e8984fc6bf.mp3" 
      });
    }else if(this.props.show==="ExposicionesVirtuales"){      
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_b377c46ae9.mp3" 
      });
    }else if(this.props.show==="AdministrarExposiciones"){      
      this.setState({ 
        urlc: "https://cdn.pixabay.com/audio/2022/06/14/audio_c5234abd14.mp3" 
      });
    }else{      
        this.setState({ 
        urlc: "https://cdn.pixabay.com/download/audio/2022/04/27/audio_67bcf729cf.mp3?filename=whip-110235.mp3" 
      });
    }

  }

 
  
  render() {    
    return (
      <div className="posicionAsis">

        
        <button className="AsistenteV" onClick={this.manejarCambio}>

          {this.props.show.length===0 ?(
            <h2 >Cargando...</h2>
            ):( 
                <Parrafos pagesR={this.props.show}></Parrafos>                                                    
                
            )
          }
          <img alt="" src="https://i.pinimg.com/originals/02/9f/b2/029fb284000fd5bdad2629f7a37c3595.gif"/>
          <h5> ¡Click Me! </h5>
        </button>

        <ReactPlayer 
              url={this.state.urlc} 
              controls
              width= '9%'
              height= "4%"
              backgroundcolor= 'rgba(0, 0, 0, 0.5)'
              className="audiomio"
              playing 

        />


        <br></br>
        <br></br>

            
         
      </div>
    );

    
    
  }

  
}
export default Asistente;

