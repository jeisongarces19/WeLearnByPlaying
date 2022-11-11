
import { Button, Popover } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import React,{useState} from 'react';

import '../App.css';
import '../Styles/editarExposicion.css';

import axios from "axios";

import ReactPlayer from 'react-player';

import swal from 'sweetalert';

import {Paginacion} from '../Components/Paginacion';
import styles from '../styles.module.scss';

import Cookies from 'universal-cookie';
const cookies = new Cookies();



const id_ser3 = parseInt(cookies.get('idUser'));
const id_expo = parseInt(cookies.get('idexpo'));
//console.log("id_ usuario:",id_ser3)
//console.log("id_ exposicion:",id_ser3)
//const id_ser3=1;
//const id_expo=2;







class Subir extends React.Component {

    constructor(props) {
        super(props);
        this.state = {            
            SubirFile: {                      
                "textimg":"",
            },
        };
        
        this.manejarCambiotextimg = this.manejarCambiotextimg.bind(this);
    }
    state = {
      selectedFile: null

    };    
    onFileChange = event => {    
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    
    };
    
    // On file upload (click the upload button)
    onFileUpload = () => {
    
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object

      formData.append(
        "file",        
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    
      // Details of the uploaded file
      //console.log("File datos",this.state.selectedFile);
      //console.log("File name",this.state.selectedFile.name);

      //console.log("Data:",formData);
    
      // Request made to the backend api
      // Send formData object
      axios.post(`https://proyecto-meca-cali.herokuapp.com/Multimedia/Upload/Image/`+id_expo+`/`+id_ser3+`/`+this.state.SubirFile.textimg, formData).then(response=>{console.log("la respuesta y el estatus",response.data,response.status);}).catch(error=>{console.log(error);});
      //axios.post(`https://proyecto-meca-cali.herokuapp.com/Multimedia/Upload/Image/1/3/'Esta es una imagen de prueba'`, formData).then(response=>{console.log("la respuesta y el estatus",response.data,response.status);}).catch(error=>{console.log(error);});
      
      this.setState({
            selectedFile: null,    
            SubirFile: {
                    "textimg":"",            
            }
       });
    };
    
    
    
    render() {
    
      return (
        
        <div className="form-group"> 
            <h3>Subir Fotos</h3>   
            <button className="button is-primary mt-2"  onClick={this.onFileUpload}>
               🔼
            </button>                                     
            <span> </span>                                              
            <div>
                <input accept="image/*" autoFocus placeholder="Subir" type="file" id="subir" className="button is-primary mt-2"  onChange={this.onFileChange}>
                </input> 
                 
            </div>  
            <span> </span>
            <input autoFocus required placeholder="Describir Imagen" type="text" id="textimg" className="FondoInput" onChange={this.manejarCambiotextimg} value={this.state.SubirFile.textimg} >
            </input> 
                                             
        </div>        
      );
    }

    manejarCambiotextimg(evento) {   
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const dataActualizado = state.SubirFile;            
            dataActualizado[clave] = valor;
            return {
                textimg: dataActualizado,
            }
        });
    }
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


  const Expo=props.informacionpath;

  const maximo = Expo.length / porPagina;


  return (
    <div className={styles.container}>
      <div className="styles_containerPoke__hr88Z">
      {Expo.slice (
        (pagina - 1) * porPagina,
        (pagina - 1) * porPagina + porPagina
      ).map ((Expo, i) => (

        <div key={i} className={styles.pokeContainer}>                     
          <p className="negrilla">id: {Expo.id}</p> 
          <div className={styles.imgContainer}>
            <img src={Expo.path} alt="No cargo la imagen" />
          </div>
          <h3>{Expo.text}</h3>
          
          
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
                        
                        <h5 className="negrilla" >{videosinfo2.id}</h5>
                        <ReactPlayer 
                            url={videosinfo2.path}
                            controls
                            width='100%'
                            height='80%'
                            className="react-player"
                        />
                    </div>
     


                  
                </div>
                ))}
            </div>

            <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </div>
    );
}



function Parrafos(props){
    const subtitles2=props.informacionsub;
   
    return (
    <div>        
        {subtitles2.map ((subtitles2, i) => (
        <div key={i}>  
            <p className="negrilla">id:{subtitles2.id}</p>
            <h1 >{subtitles2.text}</h1> 
        </div>
        ))}        
    </div>
    );
}





interface Column {
  id: 'id' | 'date' | 'comment';
  label: string;
  align?: 'right';
}

const columns: Column[] = [
  { id: 'id', label: 'ID'},
  { id: 'date', label: 'Fecha'},
  { id: 'comment',label: 'Comentario'},
];


function Biblio(props) {

    const biblio=props.infob;

    const [anchorEl, setAnchorEl] =useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
          <Button aria-describedby={id} variant="contained" onClick={handleClick}>
            Bibliografia
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
            <h5 className="bibliografia">{biblio}</h5>
          </Popover>


        
        </div>
    );
}


function PROTOTIPO1(props){

    const Informacion=props.informacion;

    return (
    <div className="">

        <div className="">
            <h1 className="EditarExposicionletra"> {Informacion.title.toUpperCase()} </h1>                
        </div>

        <br></br>

        <div className="">
            <h2 className="negrilla" >Subtitulo</h2>
            <p  className="negrilla"> {Informacion.description} </p>                
        </div> 

        <br></br>

        <div className="bordeocuadro">
            <h2 className="negrilla">Parrafos:</h2>
            {Informacion.text2.length===0 ?(
                <h2>Cargando subtitulos...</h2>
                ):( 
                    <Parrafos informacionsub={Informacion.text2}></Parrafos>                                                                       
                )
            }
        </div>


        

        <br></br>

        <div className="">
            <h2 className="EditarExposicionletra">Bibliografia</h2>
            <Biblio infob={Informacion.bibliography}></Biblio>             
        </div> 


        <br></br>

        
        <div className="">
            <h2 className="EditarExposicionletra">Videos</h2>
            {Informacion.video2.length===0 ?(
                <h2>Cargando videos...</h2>
                ):( 
                    <Videos informacionvideo={Informacion.video2}></Videos>                                                   
                    
                )
            }
        </div>
        <br></br>
        <br></br>

        <div className="">
            <h2 className="EditarExposicionletra">Imagenes</h2>
            {Informacion.path2.length===0 ?(
                <h2>Cargando imagenes...</h2>
                ):( 
                    <PaginasExposiciones informacionpath={Informacion.path2}></PaginasExposiciones>                                                    
                    
                )
            }
        </div>
        <br></br>

        

        <br></br>
        <br></br>
        <br></br>

        
    
    </div>
    );
}


function PROTOTIPO2(props){
    const Informacion=props.informacion;

    return (
    <div className="">

        <div className="">
            <h1 className="EditarExposicionletra"> {Informacion.title.toUpperCase()} </h1>                
        </div>

        <br></br>

        <div className="">
            <h2 className="negrilla" >Subtitulo</h2>
            <p  className="negrilla"> {Informacion.description} </p>                
        </div> 

        <br></br>

        <div className="bordeocuadro">
            <h2 className="negrilla">Parrafos:</h2>
            {Informacion.text2.length===0 ?(
                <h2>Cargando subtilos...</h2>
                ):( 
                    <Parrafos informacionsub={Informacion.text2}></Parrafos>                                                                       
                )
            }
        </div>
        <br></br>
        <br></br>

        <div className="">
            <h2 className="EditarExposicionletra">Imagenes</h2>
            {Informacion.path2.length===0 ?(
                <h2>Cargando imagenes...</h2>
                ):( 
                    <PaginasExposiciones informacionpath={Informacion.path2}></PaginasExposiciones>                                                    
                    
                )
            }
        </div>


        

        <br></br>

        
        
        <div className="">
            <h2 className="EditarExposicionletra">Videos</h2>
            {Informacion.video2.length===0 ?(
                <h2>Cargando videos...</h2>
                ):( 
                    <Videos informacionvideo={Informacion.video2}></Videos>                                                   
                    
                )
            }
        </div>

        <br></br>

        <div className="">
            <h2 className="EditarExposicionletra">Bibliografia</h2>
            <Biblio infob={Informacion.bibliography}></Biblio>             
        </div> 


        <br></br>

        

        

        <br></br>
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


class EditarKit extends React.Component {
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
               
                "picture" : "",
            },            
            datasub:{
                "user_id": id_ser3,  
                "virtual_exposition_id": id_expo,
                "type_id": 1,
                "text":"",
            },            
            datavid:{
                "user_id": id_ser3,  
                "virtual_exposition_id": id_expo,
                "type_id": 2,
                "path":'', 
            },
            datapho:{
                "user_id": id_ser3,  
                "virtual_exposition_id": id_expo,
                "type_id":3,
                "path":"", 
                "text":"",                        
            },
            
            exposicion: {
                "title":"",
                "description":"", 
                "background" : "",   
                "bibliography":"",
                "structure" : "",
               
                "video2":[], 
                "text2":[],
                "path2":[],                         
                "comment2":[],
            },            
        };
        
        //this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
        
        this.Creardata= this.Creardata.bind(this);
        this.CrearSubtitle= this.CrearSubtitle.bind(this);
        this.CrearVideo= this.CrearVideo.bind(this);
        this.CrearPhoto= this.CrearPhoto.bind(this);

        this.EliminarVideo= this.EliminarVideo.bind(this);
        this.EliminarSubtitle= this.EliminarSubtitle.bind(this);
        this.EliminarPhoto= this.EliminarPhoto.bind(this);
        
        this.manejarCambiodata = this.manejarCambiodata.bind(this);
        this.manejarCambiodatasub = this.manejarCambiodatasub.bind(this);
        this.manejarCambiodatavid = this.manejarCambiodatavid.bind(this);
        this.manejarCambiodatapho = this.manejarCambiodatapho.bind(this);

        this.manejarCambiodatapho2 = this.manejarCambiodatapho2.bind(this);

        this.componentDidMount= this.componentDidMount.bind(this);


    }

    cerrarSesion=()=>{
        cookies.remove('idexpo', {path: "/"});
        window.location.href='./AdministrarExposiciones';
    }

    async componentDidMount() {
        /* Apartado para los datos*/
        var respuestatodo = await fetch(`https://proyecto-meca-cali.herokuapp.com/VirtualExpositions/Search/id/`+id_expo, 
        {
            method: "GET",    
        });
        var Exposition;
        var statusr=respuestatodo.status;  
        if (statusr===200) {
            Exposition= await respuestatodo.json(); 
            //console.log("la informacion de la exposicion", Exposition)

            
            var Background=Exposition.background;
            var Bibliography=Exposition.bibliography;
            var Description=Exposition.description;
            var Picture=Exposition.picture;
            var Structure=Exposition.structure;
            var Title=Exposition.title;       
           
            if (Background===null) {
              Background="";
            }
            if (Bibliography===null) {
              Bibliography="";
            }
            if (Description===null) {
              Description="";
            }        
            if (Picture===null) {
              Picture="";
            }
            if (Structure===null) {
              Structure="";
            }
            if (Title===null) {
              Title="";
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
                   
                    picture: Picture,                            
                },                
                exposicion: {  
                    title:Title,
                    description:Description, 
                    background:Background,   
                    bibliography:Bibliography,
                    structure:Structure,
                    
                    video2:this.state.exposicion.video2, 
                    text2:this.state.exposicion.text2,
                    path2:this.state.exposicion.path2,                         
                    comment2:this.state.exposicion.comment2,
                }

            });            
        }


        /* Apartado para los subtitlos*/

        
        var respuesta1 = await fetch(`https://proyecto-meca-cali.herokuapp.com/Multimedia/`+id_expo+`/Subtitle`, 
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
                    
                    video2:this.state.exposicion.video2, 
                    text2:ExpositionSub,
                    path2:this.state.exposicion.path2,                         
                    comment2:this.state.exposicion.comment2,
                }
            });
        }        



        /* Apartado para los Videos*/        
        var respuesta2 = await fetch(`https://proyecto-meca-cali.herokuapp.com/Multimedia/`+id_expo+`/Video`, 
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
                    video2:ExpositionVideo, 
                    text2:this.state.exposicion.text2,
                    path2:this.state.exposicion.path2,                         
                    comment2:this.state.exposicion.comment2,
                }
            });
        }

        
        /* Apartado para las Imagenes*/    
        var respuesta3 = await fetch(`https://proyecto-meca-cali.herokuapp.com/Multimedia/`+id_expo+`/Images`, 
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
                     
                    video2:this.state.exposicion.video2, 
                    text2:this.state.exposicion.text2,
                    path2:ExpositionPath,                         
                    comment2:this.state.exposicion.comment2,
                }
            });        
        }
        
        
       
    }


    render() {

        const respuesta_structure = this.state.data.structure;
        let PROTOTIPO;
        if (respuesta_structure==="1") {
            PROTOTIPO= <PROTOTIPO1 informacion={this.state.exposicion}></PROTOTIPO1>
        }else if (respuesta_structure==="2"){
            PROTOTIPO= <PROTOTIPO2 informacion={this.state.exposicion}></PROTOTIPO2>
        }else{
            PROTOTIPO= <ProtoFail informacion={this.state.exposicion}></ProtoFail>
        }


        return (
            <div className="">
    
            <div className="columns central">

              <div className="column"></div>

                <div className="column" >
                    <div className="cardEditarExposicion">
                        <h1 className="EditarExposicionletra"> EDITING THE KITS </h1>  
                    </div>

                    <br></br>


                    <div className="cardEditarExposicion">
                        <center>
                                          
                            
                            <form className="">

                                <h1 className="EditarExposicionletra">General information</h1>
                                <div>     
                                    <br></br>                          

                                    <h3>Estructure 🧩 </h3>
                                    <div className="form-group">                                    
                                        <input autoFocus required placeholder="Estructura" type="number" id="structure"className="FondoInput"  onChange={this.manejarCambiodata} value={this.state.data.structure}>
                                        </input>
                                    </div>
                                    <span> </span>

                                    <h3>Title 🥇</h3>
                                    <div className="form-group">                                    
                                        <input autoFocus required placeholder="Title" type="text" id="title" className="FondoInput"  onChange={this.manejarCambiodata} value={this.state.data.title} >
                                        </input> 
                                    </div>
                                    <span> </span>

                                    <h3>Subtitle 🥈</h3>
                                    <div className="form-group">                                                                                              
                                        <input placeholder="Subtitle" className="FondoInput" id="description"  onChange={this.manejarCambiodata} value={this.state.data.description}>
                                        </input>
                                    </div>
                                    <span> </span>

                                    <h3>Link Document 💬</h3>
                                    <div className="form-group">                                            
                                        <textarea rows="4" placeholder="Document " className="FondoInput" id="bibliography"  onChange={this.manejarCambiodata} value={this.state.data.bibliography}></textarea>
                                    </div>
                                    <span> </span>
                                    
                                   

                                    <br></br>                                      

                                    <div className="form-group">
                                        <button className="button is-primary mt-2" onClick={this.Creardata}>
                                            ACTUALIZAR INFORMACIÓN
                                        </button>
                                    </div> 
                                    
                                </div>                                
                                  
                            </form>                      

                        </center>
                    </div>

                    <br></br>



                    <div className="cardEditarExposicion">
                        <center>
                                          
                            <h1 className="EditarExposicionletra">Información Multiple: </h1>

                            <form className="">      

                                <h3>Párrafos</h3>                       
                                <div className="form-group">
                                    <button className="button is-primary mt-2" onClick={this.CrearSubtitle}>
                                        ➕
                                    </button>
                                    <span> </span>
                                    <textarea rows="3" autoFocus placeholder="Crear(Texto)/Eliminar(Id)" type="text" id="text" className="FondoInput"  onChange={this.manejarCambiodatasub} value={this.state.datasub.text} >
                                    </textarea> 
                                    <span> </span>
                                    <button className="button is-primary mt-2"  onClick={this.EliminarSubtitle}>
                                        ➖
                                    </button>
                                </div>

                                <h3>Videos</h3> 
                                <div className="form-group">
                                    <button className="button is-primary mt-2" onClick={this.CrearVideo}>
                                        ➕
                                    </button>
                                    <span> </span>
                                    <input autoFocus required placeholder="Crear(Link)/Eliminar(Id)" type="text" id="path" className="FondoInput"  onChange={this.manejarCambiodatavid} value={this.state.datavid.path} >
                                    </input> 
                                    <span> </span>
                                    <button className="button is-primary mt-2" onClick={this.EliminarVideo}>
                                        ➖
                                    </button>
                                </div>

                                <h3>Fotos</h3> 
                                <div className="form-group">
                                    <button className="button is-primary mt-2" onClick={this.CrearPhoto}>
                                       ➕
                                    </button>                                     
                                    <span> </span>
                                    <div>
                                        <input autoFocus required placeholder="Crear(Link)/Eliminar(Id)" type="text" id="path" className="FondoInput"  onChange={this.manejarCambiodatapho} value={this.state.datapho.path} >
                                        </input> 
                                        <span> </span>
                                        <input autoFocus required placeholder="Describir Imagen" type="text" id="text" className="FondoInput"  onChange={this.manejarCambiodatapho} value={this.state.datapho.text} >
                                        </input> 
                                    </div>
                                    <span> </span>
                                    <button className="button is-primary mt-2" onClick={this.EliminarPhoto}>
                                        ➖
                                    </button>
                                </div>

                                <br></br>                                

                                <Subir></Subir>

                                <br></br>

                                
                                <button className="button is-primary mt-2" onClick={()=>this.cerrarSesion()}>
                                    GUARDAR EXPOSICIÓN
                                </button>
                                  
                            </form>                      

                        </center>
                    </div>
                </div>
                
                <div className="column" >                    
                </div>

            </div>


            <div className="columns central">

              <div className="column"></div>

                <div className="column" >

                    <div className="cardEditarExposicion">
                    <center>
                        <h1 className="EditarExposicionletra"> ¡VISUALIZAR PROTOTIPO ESTRUCTURAL!</h1>                
                        
                        <br></br>
                        <br></br>

                        {PROTOTIPO}                                                

                    </center>
                    </div>
                </div>
                
                <div className="column" >
                    
                </div>

            </div>

            </div>
            
        );
    }




    /*Aqui es donde se crea o actualiza la informacion general*/
    async Creardata(evento) {

        const continuar = () =>{
            swal({
              title: "Creacion",
              text: "Tu exposicion ha sido modificada",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarKit";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "Surgio un error al modificar la exposicion",
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
        const cargaUtil = JSON.stringify(this.state.data);
        console.log(cargaUtil);   
        

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Update`, 
        {
            method: "PUT",            
            body: cargaUtil,   
        });

        //console.log("respuesta de todo",respuesta) 
       
        var statusr=respuesta.status; 
        //console.log("statusr de todo",statusr)         
        
        if (statusr===202) {
           
            this.setState({
                data: {      
                    "user_id": id_ser3,  
                    "id": id_expo,
                    "title":"",
                    "description":"", 
                    "background" : "",   
                    "bibliography": "",
                    "structure" : "1",
                    
                    "picture":""
                }    
            
            });
            continuar(); 

        } else {        
            detener();
        } 
    }

    /*Aqui es donde se crea o actualiza la informacion de los subtitulos*/
    async CrearSubtitle(evento) {
        const continuar = () =>{
            swal({
              title: "Creacion",
              text: "Tu SubTitulo ha sido creada",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarKit";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "Surgio un error al crear el SubTitulo",
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
        const cargaUtil = JSON.stringify(this.state.datasub);

        //console.log(cargaUtil);   
        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Multimedia/Create`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });
        //console.log("respuesta de todo",respuesta)        
        var statusr=respuesta.status;        
        if (statusr===201) {           
            this.setState({
                datasub: {
                    "user_id": id_ser3,  
                    "virtual_exposition_id": id_expo,
                    "type_id": 1,
                    "text":"",
                }
            });
            continuar(); 
        } else {        
            detener();
        }        
    }

    /*Aqui es donde se crea o actualiza la informacion de los videos*/
    async CrearVideo(evento) {
        const continuar = () =>{
            swal({
              title: "Creacion",
              text: "Tu video ha sido agregado",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarKit";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "Surgio un error al agregar el video",
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
        const cargaUtil = JSON.stringify(this.state.datavid);
        console.log(cargaUtil);   
        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Multimedia/Create`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });
        //console.log("respuesta de todo",respuesta)        
        var statusr=respuesta.status;         
        if (statusr===201) {           
            this.setState({
                datavid: {
                    "user_id": id_ser3,  
                    "virtual_exposition_id": id_expo,
                    "type_id": 2,
                    "path":'',             
                }
            });
            continuar();
        } else {        
            detener();
        }
    }

    /*Aqui es donde se crea o actualiza la informacion de las fotos*/
    async CrearPhoto(evento) {
        const continuar = () =>{
            swal({
              title: "Creacion",
              text: "Tu foto ha sido subida",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarKit";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "Surgio un error al subir la foto",
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
        const cargaUtil = JSON.stringify(this.state.datapho);
        //console.log(cargaUtil);   
        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Multimedia/Create`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });
        //console.log("respuesta de todo",respuesta)        
        var statusr=respuesta.status;
        if (statusr===201) {           
            this.setState({
                datapho:{
                    "user_id": id_ser3,  
                    "virtual_exposition_id": id_expo,
                    "type_id": 3,
                    "path":"",  
                    "text":"",  
                }
            });
            continuar();
        } else {        
            detener();
        } 
    }

    /* --------------------------------------------------------------------------------------*/

    /*Aqui es donde se eliminia la informacion de los subtilos*/
    async EliminarSubtitle(evento) {
        const continuar = () =>{
            swal({
              title: "Creacion",
              text: "Tu SubTitulo ha sido eliminado",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarKit";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "Surgio un error al eliminar el SubTitulo",
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
        /* se envia el campo de text porque se usa para subir y eliminar"*/
        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Multimedia/Delete/`+parseInt(this.state.datasub.text), 
        {
            method: "DELETE",    
        });
        //console.log("respuesta de todo",respuesta)
        var statusr=respuesta.status;
        if(statusr===200) {           
            this.setState({
                datasub: {
                    "user_id": id_ser3,  
                    "id": id_expo,
                    "type_id": 1,
                    "text":"",
                }
            });
            continuar(); 
        } else {        
            detener();
        }
    }

    /*Aqui es donde se eliminia la informacion de los Videos*/
    async EliminarVideo(evento) {
        const continuar = () =>{
            swal({
              title: "Creacion",
              text: "Tu video se ha eliminado",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarKit";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "Surgio un error al eliminar el video",
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
        /* se envia el campo de path porque se usa para subir y eliminar"*/
        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Multimedia/Delete/`+parseInt(this.state.datavid.path), 
        {
            method: "DELETE",    
        });
        //console.log("respuesta de todo",respuesta)
        var statusr=respuesta.status; 
        if (statusr===200) {
            this.setState({
                datavid: {
                    "user_id": id_ser3,  
                    "id": id_expo,
                    "type_id": 2,
                    "path":'', 
                }
            });
            continuar(); 
        } else {        
            detener();
        }
    }

    /*Aqui es donde se eliminia la informacion de las Fotos*/
    async EliminarPhoto(evento) {
        const continuar = () =>{
            swal({
              title: "Creacion",
              text: "Tu foto ha sido eliminada",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarKit";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "Surgio un error al eliminar la foto",
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
        /* se envia el campo de path porque se usa para subir y eliminar"*/
        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Multimedia/Delete/`+parseInt(this.state.datapho.path), 
        {
            method: "DELETE",    
        });
        //console.log("respuesta de todo",respuesta)        
        var statusr=respuesta.status;         
        if (statusr===200) {           
            this.setState({
                datapho: {
                    "user_id": id_ser3,  
                    "id": id_expo,
                    "type_id": 3,
                    "path":"",
                    "text":"",                         
            
                }
            });
            continuar(); 
        } else {        
            detener();
        }
    }

    
    /* --------------------------------------------------------------------------------------*/


     /* Aqui va actualizando la informacion en cada input o cuadro*/
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

    manejarCambiodatasub(evento) {   
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const dataActualizado = state.datasub;            
            dataActualizado[clave] = valor;
            return {
                datasub: dataActualizado,
            }
        });
    }

    manejarCambiodatavid(evento) {   
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const dataActualizado = state.datavid;            
            dataActualizado[clave] = valor;
            return {
                datavid: dataActualizado,
            }
        });
    }

    manejarCambiodatapho(evento) {   
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const dataActualizado = state.datapho;            
            dataActualizado[clave] = valor;
            return {
                datapho: dataActualizado,
            }
        });
    }

    manejarCambiodatapho2(evento) {   
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const dataActualizado = state.SubirFile;            
            dataActualizado[clave] = valor;
            return {
                subir: dataActualizado,
            }
        });
    }

    

}
export default EditarKit;