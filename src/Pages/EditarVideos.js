
import { Button, Popover } from "@material-ui/core";


import React,{useState} from 'react';

import '../App.css';
import '../Styles/editarExposicion.css';


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
            <img src={Expo.path} alt="I don't upload the image" />
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

    //console.log("subtitles2:",subtitles2)
   
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
            <h2 className="negrilla" >Subtitle</h2>
            <p  className="negrilla"> {Informacion.description} </p>                
        </div> 

        <br></br>

        <div className="bordeocuadro">
            <h2 className="negrilla">Paragraphs:</h2>
            
            {Informacion.text2.length===0 ?(
                <h2>Loading Paragraphs...</h2>
                ):( 
                    <Parrafos informacionsub={Informacion.text2}></Parrafos>                                                                       
                )
            }
        </div>


        

        <br></br>

        <div className="">
            <h2 className="EditarExposicionletra">Bibliography</h2>
            <Biblio infob={Informacion.bibliography}></Biblio>             
        </div> 


        <br></br>

        
        <div className="">
            <h2 className="EditarExposicionletra">Videos</h2>
            {Informacion.video2.length===0 ?(
                <h2>Loading Videos...</h2>
                ):( 
                    <Videos informacionvideo={Informacion.video2}></Videos>                                                   
                    
                )
            }
        </div>
        <br></br>
        <br></br>

        {/*<div className="">
            <h2 className="EditarExposicionletra">Imagenes</h2>
            {Informacion.path2.length===0 ?(
                <h2>Loading Photos...</h2>
                ):( 
                    <PaginasExposiciones informacionpath={Informacion.path2}></PaginasExposiciones>                                                    
                    
                )
            }
        </div>
        <br></br>
        

        

        <div className="">
            <h2 className="EditarExposicionletra">Comentarios</h2>
            {Informacion.comment2.length===0 ?(
                <h2>Cargando comentarios...</h2>
                ):( 
                    <Comentarios informacioncom={Informacion.comment2}></Comentarios>                                                    
                )
            }
        </div>
        */}
    
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
        <h1>There is no such prototype</h1>
    </div>
    );
}


class EditarVideos extends React.Component {
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
                "url": "",
            },            
            datasub:{
                "user_id": id_ser3,  
                "lesson_id": id_expo,
                "content_type_id":2,
                "textS":"",
            },   
            dataparrafo:{
                "user_id": id_ser3,  
                "lesson_id": id_expo,
                "content_type_id":7,
                "text":"",
            },          
            datavid:{
                "user_id": id_ser3,  
                "lesson_id": id_expo,
                "content_type_id":3,
                "path":'', 
            },
            datapho:{
                "user_id": id_ser3,  
                "lesson_id": id_expo,
                "content_type_id":5,
                "path":"", 
                "text":"",                        
            },            
            exposicion: {
              "title":"",
                "description":"", 
                "background": "",   
                "bibliography":"",
                "structure": "1",
                "url": "",
                "audio": "", 
                "video2":[], 
                "text2":[],
                "path2":[],  
                "subtit":[],  
                "comment2":[],
            },            
        }; 
          
        //this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
        
        this.Creardata= this.Creardata.bind(this);
        this.CrearSubtitle= this.CrearSubtitle.bind(this);
        this.CrearParrafo= this.CrearParrafo.bind(this);
        this.CrearVideo= this.CrearVideo.bind(this);
        this.CrearPhoto= this.CrearPhoto.bind(this);

        this.EliminarVideo= this.EliminarVideo.bind(this);
        this.EliminarParrafo= this.EliminarParrafo.bind(this);
        this.EliminarSubtitle= this.EliminarSubtitle.bind(this);
        this.EliminarPhoto= this.EliminarPhoto.bind(this);
        //this.EliminarComment= this.EliminarComment.bind(this);
        
        this.manejarCambiodata = this.manejarCambiodata.bind(this);
        this.manejarCambiodatasub = this.manejarCambiodatasub.bind(this);
        this.manejarCambiodataparrafo = this.manejarCambiodataparrafo.bind(this);
        this.manejarCambiodatavid = this.manejarCambiodatavid.bind(this);
        this.manejarCambiodatapho = this.manejarCambiodatapho.bind(this);
        //this.manejarCambiocomment = this.manejarCambiocomment.bind(this);

        this.manejarCambiodatapho2 = this.manejarCambiodatapho2.bind(this);

        this.componentDidMount= this.componentDidMount.bind(this);


    }

    cerrarSesion=()=>{
        cookies.remove('idexpo', {path: "/"});
        window.location.href='./AdministrarExposiciones';
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
            var URL=Exposition.url;   
            
            if (Audio==null) {
              Audio="";
            }
            if (Background==null) {
              Background="";
            }
            if (Bibliography==null) {
              Bibliography="";
            }
            if (Description==null) {
              Description="";
            }        
            if (Picture==null) {
              Picture="";
            }
            if (Structure==null) {
              Structure="1";
            }
            if (Title==null) {
              Title="";
            }
            if (URL==null) {
              URL="";
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
                    url: URL,                          
                },                
                exposicion: {  
                    title:Title,
                    description:Description, 
                    background:Background,   
                    bibliography:Bibliography,
                    structure:Structure,
                    audio:Audio,
                    url:URL,  
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
            
            if (ExpositionSub==null) {
              ExpositionSub=[];
            }
           
            this.setState({
                exposicion: {  
                    title:this.state.exposicion.title,
                    description:this.state.exposicion.description, 
                    background:this.state.exposicion.background,   
                    bibliography:this.state.exposicion.bibliography,
                    structure:this.state.exposicion.structure,
                    url:this.state.exposicion.url,
                    audio:this.state.exposicion.audio, 
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
            if (ExpositionVideo==null) {
              ExpositionVideo=[];
            }
            this.setState({
                exposicion: {   
                    title:this.state.exposicion.title,
                    description:this.state.exposicion.description, 
                    background:this.state.exposicion.background,   
                    bibliography:this.state.exposicion.bibliography,
                    structure:this.state.exposicion.structure,
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
            
            if (ExpositionParrafo==null) {
              ExpositionParrafo=[];
            }
           
            this.setState({
                exposicion: {  
                    title:this.state.exposicion.title,
                    description:this.state.exposicion.description, 
                    background:this.state.exposicion.background,   
                    bibliography:this.state.exposicion.bibliography,
                    structure:this.state.exposicion.structure,
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
                        <h1 className="EditarExposicionletra"> EDITING AND CREATING VIDEOS </h1>  
                    </div>

                    <br></br>


                    <div className="cardEditarExposicion">
                        <center>
                                          
                            
                            <form className="">

                                <h1 className="EditarExposicionletra">Information</h1>
                                <div>     
                                    <br></br>                          

                                    <h3>Estructure 🧩 </h3>
                                    <div className="form-group">                                    
                                        <input autoFocus required placeholder="Estructure" type="number" id="structure"className="FondoInput"  onChange={this.manejarCambiodata} value={this.state.data.structure}>
                                        </input>
                                    </div>
                                    <span> </span>


                                    <h3>Title 🥇</h3>
                                    <div className="form-group">                                    
                                        <input autoFocus required placeholder="Title" type="text" id="title" className="FondoInput"  onChange={this.manejarCambiodata} value={this.state.data.title} >
                                        </input> 
                                    </div>
                                    <span> </span>

                                    <h3>SubTitle 🥈</h3>
                                    <div className="form-group">                                                                                              
                                        <input placeholder="SubTitle " className="FondoInput" id="description"  onChange={this.manejarCambiodata} value={this.state.data.description}>
                                        </input>
                                    </div>
                                    <span> </span>

                                    {/*<h3>Background image 🖼</h3>
                                    <div className="form-group">                                    
                                        <input autoFocus  placeholder="Background" type="text" id="background" className="FondoInput"  onChange={this.manejarCambiodata} value={this.state.data.background} >
                                        </input> 
                                    </div>
                                    <span> </span>

                                    <h3>Url 💬</h3>
                                    <div className="form-group">                                            
                                        <input autoFocus placeholder="Url" type="text" id="url" className="FondoInput"  onChange={this.manejarCambiodata} value={this.state.data.url} >
                                        </input></div>
                                    <span> </span>

                                    <h3>Biography 💬</h3>
                                    <div className="form-group">                                            
                                        <textarea rows="4" placeholder="Biography " className="FondoInput" id="bibliography"  onChange={this.manejarCambiodata} value={this.state.data.bibliography}></textarea>
                                    </div>
                                    <span> </span>

                                    
                                    
                                    <h3>Audio🔊</h3>
                                    <div className="form-group">                                    
                                        <input autoFocus  placeholder="Audio" type="text" id="audio"className="FondoInput"  onChange={this.manejarCambiodata} value={this.state.data.audio} >
                                        </input>
                                    </div>
                                    <span> </span>*/}

                                    <br></br>                                      

                                    <div className="form-group">
                                        <button className="button is-primary mt-2" onClick={this.Creardata}>
                                            UPDATE INFORMATION
                                        </button>
                                    </div> 
                                    
                                </div>                                
                                  
                            </form>                      

                        </center>
                    </div>

                    <br></br>



                    <div className="cardEditarExposicion">
                        <center>
                                          
                            <h1 className="EditarExposicionletra">Multiple Informatión: </h1>

                            <form className="">      

                                <h3>Paragraphs</h3>                       
                                <div className="form-group">
                                    <button className="button is-primary mt-2" onClick={this.CrearParrafo}>
                                        ➕
                                    </button>
                                    <span> </span>
                                    <textarea rows="3" autoFocus placeholder="Create(Text)/Delete(Id)" type="text" id="text" className="FondoInput"  onChange={this.manejarCambiodataparrafo} value={this.state.dataparrafo.text} >
                                    </textarea> 
                                    <span> </span>
                                    <button className="button is-primary mt-2"  onClick={this.EliminarParrafo}>
                                        ➖
                                    </button>
                                </div>

                                <h3>Videos</h3> 
                                <div className="form-group">
                                    <button className="button is-primary mt-2" onClick={this.CrearVideo}>
                                        ➕
                                    </button>
                                    <span> </span>
                                    <input autoFocus required placeholder="Create(Link)/Delete(Id)" type="text" id="path" className="FondoInput"  onChange={this.manejarCambiodatavid} value={this.state.datavid.path} >
                                    </input> 
                                    <span> </span>
                                    <button className="button is-primary mt-2" onClick={this.EliminarVideo}>
                                        ➖
                                    </button>
                                </div>

                                {/*<h3>Photos</h3> 
                                <div className="form-group">
                                    <button className="button is-primary mt-2" onClick={this.CrearPhoto}>
                                       ➕
                                    </button>                                     
                                    <span> </span>
                                    <div>
                                        <input autoFocus required placeholder="Create(Link)/Delete(Id)" type="text" id="path" className="FondoInput"  onChange={this.manejarCambiodatapho} value={this.state.datapho.path} >
                                        </input> 
                                        <span> </span>
                                        <input autoFocus required placeholder="Describe Image" type="text" id="text" className="FondoInput"  onChange={this.manejarCambiodatapho} value={this.state.datapho.text} >
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

                                

                                <h3>Comentarios</h3> 
                                <div className="form-group">                                
                                    <input autoFocus required placeholder="Eliminar (Id):" type="number" id="comment" className="FondoInput"  onChange={this.manejarCambiocomment} value={this.state.comentario.comment} >
                                    </input> 
                                    <br></br>
                                    <button className="button is-primary mt-2" onClick={this.EliminarComment}>
                                        ➖
                                    </button>
                                </div>

                                <br></br>*/}

                                <button className="button is-primary mt-2" onClick={()=>this.cerrarSesion()}>
                                    <a rel="noreferrer" href="/MenuAdministrativo">SAVE ACTIVITY</a>
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
                        <h1 className="EditarExposicionletra"> ¡VISUALIZE STRUCTURAL PROTOTYPE!</h1>                
                        
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
              title: "Creation",
              text: "Your activity has been modified",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarVideos";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "An error occurred while modifying activity",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again!");
              }
            });
        }        
        evento.preventDefault();
        const cargaUtil = JSON.stringify(this.state.data);
        //console.log(cargaUtil);   
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Update`, 
        {
            method: "PUT",            
            body: cargaUtil,   
        });

        //console.log("respuesta de todo",respuesta) 
       
        var statusr=respuesta.status; 
        //console.log("statusr de todo",statusr)         
        
        if (statusr===200) {
           
            this.setState({
                data: {      
                    "user_id": id_ser3,  
                    "id": id_expo,
                    "title":"",
                    "description":"", 
                    "background" : "",   
                    "bibliography": "",
                    "structure" : "1",
                    "audio": "",
                    "picture":"",
                    "url":""
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
              title: "Creation",
              text: "Your activity has been modified",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarVideos";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "An error occurred while modifying activity",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again!");
              }
            });
        }      
        evento.preventDefault();
        const cargaUtil = JSON.stringify(this.state.datasub);

        //console.log(cargaUtil);   
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Content/Create`, 
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
                    "lesson_id": id_expo,
                    "content_type_id": 2,
                    "textS":"",
                }
            });
            continuar(); 
        } else {        
            detener();
        }        
    }

    /*Aqui es donde se crea o actualiza la informacion de los Parrafos*/
    async CrearParrafo(evento) {
        const continuar = () =>{
            swal({
              title: "Creation",
              text: "Your activity has been modified",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarVideos";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "An error occurred while modifying activity",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again!");
              }
            });
        }        
        evento.preventDefault();
        const cargaUtil = JSON.stringify(this.state.dataparrafo);

        //console.log(cargaUtil);   
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Content/Create`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });
        //console.log("respuesta de todo",respuesta)        
        var statusr=respuesta.status;
        //console.log("respuesta de statusr",statusr)         
        if (statusr===201) {           
            this.setState({
                dataparrafo: {
                    "user_id": id_ser3,  
                    "lesson_id": id_expo,
                    "content_type_id": 7,
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
              title: "Creation",
              text: "Your activity has been modified",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarVideos";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "An error occurred while modifying activity",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again!");
              }
            });
        } 
        
        evento.preventDefault();
        const cargaUtil = JSON.stringify(this.state.datavid);
        //console.log(cargaUtil);   
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Content/Create`, 
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
                    "lesson_id": id_expo,
                    "content_type_id": 3,
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
              title: "Creation",
              text: "Your activity has been modified",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarVideos";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "An error occurred while modifying activity",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again!");
              }
            });
        }  
        evento.preventDefault();
        const cargaUtil = JSON.stringify(this.state.datapho);
        //console.log(cargaUtil);   
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Content/Create`, 
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
                    "lesson_id": id_expo,
                    "content_type_id": 5,
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
              title: "Creation",
              text: "Your video has been modified",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarVideos";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "An error occurred while modifying video",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again!");
              }
            });
        }      
        evento.preventDefault();
        /* se envia el campo de text porque se usa para subir y eliminar"*/
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Content/Delete/`+parseInt(this.state.datasub.text), 
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
                    "content_type_id": 2,
                    "textS":"",
                }
            });
            continuar(); 
        } else {        
            detener();
        }
    }

    /*Aqui es donde se eliminia la informacion de los subtilos*/
    async EliminarParrafo(evento) {
        const continuar = () =>{
            swal({
              title: "Creation",
              text: "Your video has been modified",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarVideos";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "An error occurred while modifying video",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again!");
              }
            });
        }       
        evento.preventDefault();
        /* se envia el campo de text porque se usa para subir y eliminar"*/
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Content/Delete/`+parseInt(this.state.dataparrafo.text), 
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
                    "content_type_id": 7,
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
              title: "Creation",
              text: "Your video has been modified",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarVideos";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "An error occurred while modifying video",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again!");
              }
            });
        }        
        evento.preventDefault();
        /* se envia el campo de path porque se usa para subir y eliminar"*/
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Content/Delete/`+parseInt(this.state.datavid.path), 
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
                    "content_type_id ": 3,
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
              title: "Creation",
              text: "Your video has been modified",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarVideos";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "An error occurred while modifying video",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again!");
              }
            });
        }         
        evento.preventDefault();
        /* se envia el campo de path porque se usa para subir y eliminar"*/
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/Content/Delete/`+parseInt(this.state.datapho.path), 
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
                    "content_type_id ": 5,
                    "path":"",
                    "text":"",                         
            
                }
            });
            continuar(); 
        } else {        
            detener();
        }
    }

    /*
    async EliminarComment(evento) {
        const continuar = () =>{
            swal({
              title: "Creation",
              text: "Your activity has been modified",
              icon: "success",              
            }).then(function() {
                window.location = "/EditarVideos";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "An error occurred while modifying activity",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try again!");
              }
            });
        }         
        evento.preventDefault();
        Aqui es donde se eliminia la informacion de los comentarios
        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Comments/Delete/`+parseInt(this.state.comentario.comment), 
        {
            method: "DELETE",    
        });
        //console.log("respuesta de todo",respuesta)        
        var statusr=respuesta.status;         
        if (statusr===200) {           
            this.setState({
                comentario: {
                    "user_id": id_ser3,  
                    "id": id_expo,
                    "comment":"",
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

    manejarCambiodataparrafo(evento) {   
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const dataActualizado = state.dataparrafo;            
            dataActualizado[clave] = valor;
            return {
                dataparrafo: dataActualizado,
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
export default EditarVideos;