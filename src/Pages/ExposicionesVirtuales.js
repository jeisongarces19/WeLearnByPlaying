//Nota: Importar en el cuerpo del módulo; reordenar al principio importar/primero 
// los que tienen e l @ deben importarse de primero

import Modal from '@mui/material/Modal';
import { Button } from "@material-ui/core";

import '../App.css';
import '../Styles/exposicionesVirtuales.css';
import styles from '../styles.module.scss';

import React,{useState} from 'react';
import {Paginacion} from '../Components/Paginacion';
//import Modal from 'material-ui-modal';

import ReactPlayer from 'react-player';


//import 'bootstrap/dist/css/bootstrap.min.css';


import Cookies from 'universal-cookie';
const cookies = new Cookies();

const id_ser3 = parseInt(cookies.get('idUser'));
const id_expo = parseInt(cookies.get('idexpo'));
//console.log("id_ usuario:",id_ser3)
//console.log("id_ exposicion:",id_expo)

//NOTAS: Los nombres de los componentes de React deben comenzar con una letra mayúscula. Los nombres de React Hook deben comenzar con la palabra "use"

function Biblio(props) {

    const biblio=props.infob;
    const urlA=props.infourl;
    const picture=props.infopicture;
    //console.log("picture",picture)

    

    const [anchorEl, setAnchorEl] =useState(null)

   

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            
            <button aria-describedby={id} variant="contained"> 
                Push me
                <div className="stylesActividad">
                <a href={urlA}>
                    <img src={picture} alt={biblio} />
                </a> 
                </div>             
                             
            </button>
            

            {/*
              <Button aria-describedby={id} variant="contained">
                Actividad
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}            
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
              >
                <div className={styles.imgContainer}>
                    <a href={biblio}>
                        <img src="https://img.freepik.com/vector-gratis/fondo-escena-naturaleza-flores-colinas_1308-42080.jpg" alt="imagen"/>
                    </a>
                </div>  

                <h5 className="bibliografiaExpo">{biblio}</h5>
              
              </Popover>

            */}
        
        </div>
    );
}


function BasicModal(props) {

    const imagen2=props.imagen;     
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
        <Button onClick={handleOpen}>Ver 🔎</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <img  className="boxxExpo" src={imagen2} alt="I don't upload the image" />
         
        </Modal>
        </div>
    );
}



function PaginasExposiciones (props) {
  const [pagina, setPagina] = useState (1);

  var mq = window.matchMedia( "(min-width: 700px)" );
  //var mq2 = window.matchMedia( "(min-width: 400px)" );
  //console.log("mq,mq2",mq,mq2);
  var tam;

  if(mq.matches) {
    tam=3;
  }else {
    tam=2;
  }

  const [porPagina] = useState (tam);


  const Expo=props.informacionpath;

  const maximo = Expo.length / porPagina;


  return (
    <div className={styles.container}>
      <div className={styles.containerPoke}>
      {Expo.slice (
        (pagina - 1) * porPagina,
        (pagina - 1) * porPagina + porPagina
      ).map ((Expo, i) => (
        <div key={i} className={styles.pokeContainer}>


            <BasicModal imagen={Expo.path}></BasicModal>
                    <div className={styles.imgContainer}>
                        <img src={Expo.path} alt="I don't upload the image" >
                        </img>           
                    </div>         
              
                    <p >{Expo.text}</p> 

        </div>
      ))}
      </div>

      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </div>
  );


    
}



function Videos(props) {

    const [pagina, setPagina] = useState (1);
    const [porPagina] = useState (1);


    const videosinfo2=props.informacionvideo;

    const maximo = videosinfo2.length / porPagina;


    return (
        <div className={styles.container}>
            <div >
                {videosinfo2.slice (
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
                ).map ((videosinfo2, i) => (

                <div key={i} className={styles.pokeContainer}>

                    <div className="contenedor"> 
                        
                        <ReactPlayer 
                            url={videosinfo2.path}
                            controls
                            width='100%'
                            height='100%'
                            className="react-player"
                            loop
                        />
                    </div>
     


                  
                </div>
                ))}
            </div>

            <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </div>
    );
}


function AudioFondo(props) {

  
  const audio=props.informacionaudio;

  const [state,setState]=useState({
    playing2:true
  })

  const {playing2}=state;
  const handlePlayPause = () => {
    setState({ ...state, playing2: !state.playing2 });
  };

  
  return (
    <div className="posicionAsisAuExpo">  
        
        <ReactPlayer 
              url={audio} 
              controls
              className="AudioAu2"
              playing={playing2}       
        ></ReactPlayer>
        <button className="AudioAu" onClick={handlePlayPause}> 🔇🔊</button>
      

    </div>
  );

}

function Parrafos(props){
    const subtitles2=props.informacionsub;
   
    return (
    <div>        
        {subtitles2.map ((subtitles2, i) => (
        <div key={i}>              
            <h1 className="ExposicionletraD">{subtitles2.text}</h1>
            <br></br> 
            
        </div>

        ))}        
    </div>
    );
}


function PROTOTIPO1(props){

    const Informacion=props.informacion;
       
    return (
    <div className="">

        <br></br>
        <div className="cardtituloExpo">
            <h1 className="ExposicionletraT">{Informacion.title.toUpperCase()} </h1>                   
        </div>

        <br></br>

        <div className="cardsubtituloExpo">            
            <h2 className="ExposicionletraS"> {Informacion.description} </h2>                
        </div> 

        <br></br>
        <div className="reducirActivityExpo">
            <div className="cardDescriptionExpo">
                {Informacion.text2.length===0 ?(
                    <h2>Loading Paragraphs...</h2>
                    ):( 
                        <Parrafos informacionsub={Informacion.text2}></Parrafos>                                                                       
                    )
                }
            </div>
        </div>
        <br></br>

        <div className="cardactividadExpo">            
            <Biblio infob={Informacion.bibliography} infourl={Informacion.url} infopicture={Informacion.picture}>a</Biblio>             
        </div> 

        <br></br>

        <div className="cardVideoExpo">

            {Informacion.video2.length===0 ?(
                <h2>Loading Videos...</h2>
                ):( 
                    <Videos informacionvideo={Informacion.video2}></Videos>                                                   
                    
                )
            }
        </div>
        <br></br>

        
        <div className="cardImagenExpo">
            {Informacion.path2.length===0 ?(
                <h2>Loading Imagen...</h2>
                ):( 
                    <PaginasExposiciones informacionpath={Informacion.path2}></PaginasExposiciones>                                                    
                    
                )
            }
        </div>
        <br></br>
        
        <br></br>

    
    </div>
    );

}


function PROTOTIPO2(props){

    const Informacion=props.informacion;
       
    return (
    <div className="">

        <br></br>
        <div className="cardtituloExpo">
            <h1 className="ExposicionletraT">{Informacion.title.toUpperCase()} </h1>                   
        </div>

        <br></br>

        <div className="cardsubtituloExpo">            
            <h2 className="ExposicionletraS"> {Informacion.description} </h2>                
        </div> 

        <br></br>
        <div className="reducirActivityExpo">
            <div className="cardDescriptionExpo">
                {Informacion.text2.length===0 ?(
                    <h2>Loading Paragraphs...</h2>
                    ):( 
                        <Parrafos informacionsub={Informacion.text2}></Parrafos>                                                                       
                    )
                }
            </div>
        </div>
        <br></br>

        
        <div className="cardImagenExpo">
            {Informacion.path2.length===0 ?(
                <h2>Loading Images...</h2>
                ):( 
                    <PaginasExposiciones informacionpath={Informacion.path2}></PaginasExposiciones>                                                    
                    
                )
            }
        </div>
        <br></br>

        <div className="cardactividadExpo">            
            <Biblio infob={Informacion.bibliography} infourl={Informacion.url} infopicture={Informacion.picture}>a</Biblio>             
        </div> 

        <br></br>

        <div className="cardVideoExpo">

            {Informacion.video2.length===0 ?(
                <h2>Loading Videos...</h2>
                ):( 
                    <Videos informacionvideo={Informacion.video2}></Videos>                                                   
                    
                )
            }
        </div>
        <br></br>
        
        <br></br>

    
    </div>
    );
    
}

function ProtoFail(props){
    return (
    <div className="">
        <h1>No existe tal prototipo</h1>
    </div>
    );
}


class ExposicionesVirtuales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {      
                "user_id": id_ser3,  
                "id": id_expo,
                "title":"",
                "description":"", 
                "background" : "",   
                "bibliography":"",
                "structure" : "1",
                "audio": "",    
                "picture": "",
                "url" : "",
            },          
            /*comentario: {
                "user_id": id_ser3,  
                "id": id_expo,
                "comment":"",
            },*/
            exposicion: {
                "title":"",
                "description":"", 
                "background": "",   
                "bibliography":"",
                "structure": "",
                "picture": "",
                "url": "",
                "audio": "", 
                "video2":[], 
                "text2":[],
                "path2":[],  
                "subtit":[],                       
                "comment2":[],
            },
        };

        //console.log("la data",this.state.data)
        //console.log("la exposicion",this.state.data)
      

        this.componentDidMount= this.componentDidMount.bind(this);
        //this.CrearComentario= this.CrearComentario.bind(this);
        //this.manejarCambiodata = this.manejarCambiodata.bind(this);
        //this.manejarCambiocomment = this.manejarCambiocomment.bind(this);


    }

    cerrarSesion=()=>{
        cookies.remove('idexpo', {path: "/"});
    }

    async componentDidMount() {
        /* Apartado para los datos*/
        var respuestatodo = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Search/id/`+id_expo, 
        {
            method: "GET",    
        });
        var Exposition;
        var statusr=respuestatodo.status;  
        if (statusr===200) {
            Exposition= await respuestatodo.json(); 
            //console.log("la informacion de la exposicion", Exposition)

            var Audio=Exposition.audio;
            var Background=Exposition.background;
            var Bibliography=Exposition.bibliography;
            var Description=Exposition.description;
            var Picture=Exposition.picture;
            var Structure=Exposition.structure;
            var Title=Exposition.title;  
            var Url=Exposition.url;       
            
            if (Audio==="") {
              Audio="";
            }
            if (Background==="") {
              Background="";
            }
            if (Bibliography==="") {
              Bibliography="";
            }
            if (Description==="") {
              Description="";
            }        
            if (Picture==="") {
              Picture="";
            }
            if (Structure==="") {
              Structure="";
            }
            if (Title==="") {
              Title="";
            }
            if (Url==="") {
              Url="https://www.youtube.com/watch?v=9VPbdPDXI0Q";
            }
            
            this.setState({
                
                data: {
                    user_id: this.state.data.user_id,  
                    id: this.state.data.id,
                    title:Title,
                    description:Description, 
                    background:Background,   
                    bibliography:Bibliography,
                    structure:Structure,
                    audio: Audio,    
                    picture: Picture,   
                    url: Url,                         
                },                
                exposicion: {  
                    title:Title,
                    description:Description, 
                    background:Background,   
                    bibliography:Bibliography,
                    structure:Structure,
                    picture:Picture,
                    url:Url,
                    audio:Audio, 
                    video2:this.state.exposicion.video2, 
                    text2:this.state.exposicion.text2,
                    path2:this.state.exposicion.path2, 
                    subtit:this.state.exposicion.subtit,                        
                    comment2:this.state.exposicion.comment2,
                }

            });            
        }


        /* Apartado para los subtitlos*/

        
        var respuesta1 = await fetch(`https://fun-english-cali.herokuapp.com/Content/`+parseInt(id_expo)+`/Subtitulo`, 
        {
            method: "GET",    
        });
        var ExpositionSub;
        var statussub=respuesta1.status;
        if (statussub===200) {
            ExpositionSub= await respuesta1.json(); 
            //console.log("la respuesta de los subtilos", ExpositionSub)
            
            if (ExpositionSub===null) {
              ExpositionSub=[];
            }
           
            this.setState({
                exposicion: {  
                    title:this.state.exposicion.title,
                    description:this.state.exposicion.description, 
                    background:this.state.exposicion.background,   
                    bibliography:this.state.exposicion.bibliography,
                    structure:this.state.exposicion.structure,
                    picture:this.state.exposicion.picture,
                    audio:this.state.exposicion.audio, 
                    url:this.state.exposicion.url,
                    video2:this.state.exposicion.video2, 
                    text2:this.state.exposicion.text2,
                    path2:this.state.exposicion.path2,  
                    subtit:ExpositionSub,                        
                    comment2:this.state.exposicion.comment2,
                }
            });
        }        



        /* Apartado para los Videos*/        
        var respuesta2 = await fetch(`https://fun-english-cali.herokuapp.com/Content/`+parseInt(id_expo)+`/Video`, 
        {
            method: "GET",    
        });            
        var ExpositionVideo;
        var statusv=respuesta2.status; 
        if (statusv===200) {
            ExpositionVideo= await respuesta2.json(); 
            //console.log("la respuesta", ExpositionVideo)
            if (ExpositionVideo===null) {
              ExpositionVideo=[];
            }
            this.setState({
                exposicion: {   
                    title:this.state.exposicion.title,
                    description:this.state.exposicion.description, 
                    background:this.state.exposicion.background,   
                    bibliography:this.state.exposicion.bibliography,
                    structure:this.state.exposicion.structure,
                    picture:this.state.exposicion.picture,
                    url:this.state.exposicion.url,
                    audio:this.state.exposicion.audio, 
                    video2:ExpositionVideo, 
                    text2:this.state.exposicion.text2,
                    path2:this.state.exposicion.path2,   
                    subtit:this.state.exposicion.subtit,                        
                    comment2:this.state.exposicion.comment2,
                }
            });
        }

        
        /* Apartado para las Imagenes*/    
        var respuesta3 = await fetch(`https://fun-english-cali.herokuapp.com/Content/`+parseInt(id_expo)+`/Imagen`, 
        {
            method: "GET",    
        });             
        var ExpositionPath;
        var statusPath=respuesta3.status;  
        if (statusPath===200) {
            ExpositionPath= await respuesta3.json(); 
            //console.log("la respuesta", ExpositionPath)
            if (ExpositionPath===null) {
              ExpositionPath=[];
            }
            this.setState({
                exposicion: {      
                    title:this.state.exposicion.title,
                    description:this.state.exposicion.description, 
                    background:this.state.exposicion.background,   
                    bibliography:this.state.exposicion.bibliography,
                    structure:this.state.exposicion.structure,
                    picture:this.state.exposicion.picture,
                    url:this.state.exposicion.url,
                    audio:this.state.exposicion.audio, 
                    video2:this.state.exposicion.video2, 
                    text2:this.state.exposicion.text2,
                    path2:ExpositionPath,        
                    subtit:this.state.exposicion.subtit,                   
                    comment2:this.state.exposicion.comment2,
                }
            });        
        }

        /* Apartado para los Parrafos*/

        
        var respuesta4 = await fetch(`https://fun-english-cali.herokuapp.com/Content/`+parseInt(id_expo)+`/Parrafo`, 
        {
            method: "GET",    
        });
        var ExpositionParrafo;
        var statusparraf=respuesta4.status;
        //console.log("la respuesta de los parrafos", ExpositionParrafo)
        if (statusparraf===200) {
            ExpositionParrafo= await respuesta4.json(); 
            //console.log("la respuesta de los parrafos", ExpositionParrafo)
            
            if (ExpositionParrafo===null) {
              ExpositionParrafo=[];
            }
           
            this.setState({
                exposicion: {  
                    title:this.state.exposicion.title,
                    description:this.state.exposicion.description, 
                    background:this.state.exposicion.background,   
                    bibliography:this.state.exposicion.bibliography,
                    structure:this.state.exposicion.structure,
                    picture:this.state.exposicion.picture,
                    url:this.state.exposicion.url,
                    audio:this.state.exposicion.audio, 
                    video2:this.state.exposicion.video2, 
                    text2:ExpositionParrafo,
                    path2:this.state.exposicion.path2, 
                    subtit:this.state.exposicion.subtit,                         
                    comment2:this.state.exposicion.comment2,
                }
            });
        }        
        
    
        /* Apartado para los Comentarios   
        var respuesta4 = await fetch(`https://proyecto-meca-cali.herokuapp.com/Comments/VirtualExposition/`+id_expo, 
        {
            method: "GET",    
        });             
        var ExpositionCom;
        var statusCom=respuesta4.status;          
        if (statusCom===200) {
            ExpositionCom= await respuesta4.json(); 
            //console.log("la respuesta", ExpositionCom)
            if (ExpositionCom===null) {
              ExpositionCom=[];
            }         
            this.setState({
                exposicion: {      
                    title:this.state.exposicion.title,
                    description:this.state.exposicion.description, 
                    background:this.state.exposicion.background,   
                    bibliography:this.state.exposicion.bibliography,
                    structure:this.state.exposicion.structure,
                    audio:this.state.exposicion.audio, 
                    video2:this.state.exposicion.video2, 
                    text2:this.state.exposicion.text2,
                    path2:this.state.exposicion.path2,    
                    subtit:this.state.exposicion.subtit,                      
                    comment2:ExpositionCom,
                }
            });                        
        }*/  

    }


    render() {

        const respuesta_structure = "1";
        let PROTOTIPO;


        if (respuesta_structure==="1") {
            PROTOTIPO= <PROTOTIPO1 informacion={this.state.exposicion}></PROTOTIPO1>
        }else if (respuesta_structure==="2"){
            PROTOTIPO= <PROTOTIPO2 informacion={this.state.exposicion}></PROTOTIPO2>
        }else{
            PROTOTIPO= <ProtoFail informacion={this.state.exposicion}></ProtoFail>
        }


        return (

            <div className="fondobacExpo" style={{backgroundImage: `url(${this.state.data.background})`}}>

                <div className="">
                    <center>
                        {PROTOTIPO}   
                    </center>   
                </div>

                <div className="columns centralExpo">

                    <div className="column"></div>

                    <div className="column" >



                        <div className="cardEditarExposicionExpo">
                        <center>
                       
                            <div className="cardEditarExposicionExpo">
                                <center>                        
                                <button className="button is-primary mt-2" onClick={()=>this.cerrarSesion()}>
                                    <a rel="noreferrer" href="/VerAdministrarCursos">Exit the exhibition</a>
                                </button>                                   
                                </center>
                            </div>                                          

                        </center>
                        </div>
                    </div>
                
                    <div className="column" ></div>
                </div>



                

            </div>
            
        );
    }




    /*Aqui es donde se crea o actualiza la informacion de los comentarios*/
    /*
    async CrearComentario(evento) {

        const continuar = () =>{
            swal({
              title: "Creacion",
              text: "Tu cometario ha sido creado",
              icon: "success",              
            }).then(function() {
                window.location = "/ExposicionesVirtuales";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "Surgio un error al crear el comentario",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Volver a intentar!");
              }
            });
        }        
        evento.preventDefault();
        const cargaUtil = JSON.stringify(this.state.comentario);
        //console.log(cargaUtil);   
        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Comments/Create`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });

        //console.log("respuesta de todo",respuesta) 
       
        var statusr=respuesta.status; 
        //console.log("statusr de todo",statusr)         
        
        if (statusr===201) {
           
            this.setState({
                comentario: {      
                    "user_id": id_ser3,  
                    "virtual_exposition_id": id_expo,
                    "comment":"Agregar comentario"
                }                
            });
            continuar(); 

        } else {                
            detener();
        } 
    }
    */

    

    /* --------------------------------------------------------------------------------------*/
    /* Aqui va actualizando la informacion en cada input o cuadro*/
    /*
     
    manejarCambiodata(evento) {
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const dataActualizado = state.data;            
            dataActualizado[clave] = valor;
            //console.log("lo que hay data:",dataActualizado)
            const dataActualizado2 = state.exposicion;            
            dataActualizado2[clave] = valor;
            //console.log("lo que hay expo:",dataActualizado2)
            return {
                data: dataActualizado,                
            }
        });
    }
    */
    /*
    manejarCambiocomment(evento) {   
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const dataActualizado = state.comentario;            
            dataActualizado[clave] = valor;
            return {
                comentario: dataActualizado,
            }
        });
    }
    */

}
export default ExposicionesVirtuales;