//Nota: Importar en el cuerpo del módulo; reordenar al principio importar/primero 
// los que tienen e l @ deben importarse de primero

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import { Button, Popover } from "@material-ui/core";

import '../Styles/Inicio.css';
import styles from '../styles.module.scss';

import React,{useState} from 'react';
import {Paginacion} from '../Components/Paginacion';
//import Modal from 'material-ui-modal';

import ReactPlayer from 'react-player';
import swal from 'sweetalert';


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
          <Button aria-describedby={id} variant="contained" style={{backgroundColor: '#f55353de'}} onClick={handleClick}>
            Information
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
            <h5 className="bibliografiaInicio">{biblio} 
                <a style={{color: '#002df4'}} rel="noreferrer" href="/Registrarse">sign in</a>
            </h5>
          </Popover>
          <br></br>

          <img className="AsistenteInicio" alt="" src="https://i.pinimg.com/originals/02/9f/b2/029fb284000fd5bdad2629f7a37c3595.gif"/>
          


        
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
        <Button onClick={handleOpen}>See 🔎</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <img  className="boxxInicio" src={imagen2} alt="No cargo la imagen" />
         
        </Modal>
        </div>
    );
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

  const [porPagina] = useState (1);


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
                 
                    <BasicModal imagen={Expo.path}></BasicModal>
                    <div className={styles.imgContainer}>
                        <img src={Expo.path} alt="No cargo la imagen" >
                        </img>           
                    </div>         
              
                    <p >{Expo.text}</p> 

              
            </div>
            
            ))}
       </div>


      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </div>
  );

  {/*
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
                 
                    <BasicModal imagen={Expo.path}></BasicModal>
                    <div className={styles.imgContainer}>
                        <img src={Expo.path} alt="No cargo la imagen" >
                        </img>           
                    </div>         
              
                    <p >{Expo.text}</p> 

              
            </div>
            
            ))}
       </div>


      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </div>
  );
  */}
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

                    <div className="contenedorInicio"> 
                        
                        <ReactPlayer 
                            url={videosinfo2.path}
                            controls
                            width='100%'
                            height='100%'
                            className="react-playerInicio"
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

  {/*function handleSubmit(e) { e.preventDefault(); console.log('ingreeso',audio); } //responsible: className="player-wrapper" */}

  const audio=props.informacionaudio;

  const [state,setState]=useState({
    playing2:true
  })

  const {playing2}=state;
  const handlePlayPause = () => {
    setState({ ...state, playing2: !state.playing2 });
  };

  
  return (
    <div className="posicionAsisAuInicio">  
        
        <ReactPlayer 
              url={audio} 
              controls
              className="AudioAu2Inicio"
              playing={playing2}       
        ></ReactPlayer>
        <button className="AudioAuInicio" onClick={handlePlayPause}> 🔇🔊</button>
      

    </div>
  );

}

function Parrafos(props){
    const subtitles2=props.informacionsub;

    

    //console.log("subtitles2",subtitles2);
   
    return (
    <div>        
        {subtitles2.map ((subtitles2, i) => (
        <div key={i}>         
            <h1 className="LetraParrafoInicio">{subtitles2.text}</h1>
            <br></br> 
        </div>

        ))}        
    </div>
    );
}


/*
interface Column {
  id: 'date' | 'comment';
  label: string;
  align?: 'right';
}

const columns: Column[] = [
  { id: 'date', label: 'Fecha'},
  { id: 'comment',label: 'Comentario'},
];

function Comentarios(props){
  const rows=props.informacioncom
  //console.log("llego",rows)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', bgcolor: '#ffffff00'}} >

      <TableContainer sx={{ maxHeight: 400, borderRadius: 5,border: 2}} >
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>

              <TableCell  align="center" colSpan={1} >
                <p className="negrillaP">Fecha:</p>
              </TableCell>

              <TableCell align="center" colSpan={1}>
                <p className="negrillaP">Comentario:</p>
              </TableCell>

            </TableRow>
            
          </TableHead>
          <TableBody >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell sx={{ borderRadius: 2,border: 1}} key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

*/

function PROTOTIPO1(props){

    const Informacion=props.informacion;
       
    return (
    <div className="">

        <div className="cardTituloInicio">
            <center>   
                <h1 className="loginletraTituloInicio">{Informacion.title.toUpperCase()} </h1>                
            </center>
        </div>
        <br></br>

        <div className="cardDivInicio">

            <div className="cardSubtituloInicio">
                <h1 className="LetraSubtituloInicio"> {Informacion.description} </h1>             
            </div> 
            <br></br>

            {/*console.log(Informacion.text2)*/}

            

            <div className="cardGerenalInicio">
                {Informacion.text2.length===0 ?(
                    <h2>Cargando Parrafos...</h2>
                    ):( 
                        <Parrafos informacionsub={Informacion.text2}></Parrafos>                                                                       
                    )
                }
            </div>

            <div className="cardImagenInicio">
                {Informacion.path2.length===0 ?(
                    <h2>Cargando imagenes...</h2>
                    ):( 
                        <PaginasExposiciones informacionpath={Informacion.path2}></PaginasExposiciones>                                                    
                        
                    )
                }
            </div>

            <br></br>
            <div className="cardInformacionInicio">            
                <Biblio infob={Informacion.bibliography}>a</Biblio>             
            </div> 


            <br></br>
        </div>
    
    </div>
    );
}


function PROTOTIPO2(props){

    const Informacion=props.informacion;
       
    return (
    <div className="">

        <br></br>
        <div className="cardGerenalInicio">
            <h1 className="">{Informacion.title.toUpperCase()} </h1>                   
        </div>

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






class Inicio extends React.Component {
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
                "picture" : "",
            },          
            comentario: {
                "user_id": id_ser3,  
                "virtual_exposition_id": id_expo,
                "comment":"",
            },
            exposicion: {
                "title":"we learn by playing",
                "description":"", 
                "background" : "",   
                "bibliography":"",
                "structure" : "",
                "audio": "", 
                "video2":[], 
                "text2":[],
                "path2":[],                         
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
        var respuestatodo = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Search/lesson_type_id/`+5+``, 
        {
            method: "GET",    
        });
        var Exposition;
        var statusr=respuestatodo.status;  
        //console.log("la informacion de la respuestatodo", respuestatodo)
        
        if (statusr===200) {
            Exposition= await respuestatodo.json(); 
            Exposition=Exposition[0];
            //console.log("la informacion de la exposicion", Exposition)
            var Audio=Exposition.audio;
            var Background=Exposition.background;
            var Bibliography=Exposition.bibliography;
            var Description=Exposition.description;

            var Picture=Exposition.picture;
            var Structure=Exposition.structure;
            var Title=Exposition.title;       
            
            if (Audio===null) {
              Audio="";
            }
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
                    audio: Audio,    
                    picture: Picture,                            
                },                
                exposicion: {  
                    title:Title,
                    description:Description, 
                    background:Background,   
                    bibliography:Bibliography,
                    structure:Structure,
                    audio:Audio, 
                    video2:this.state.exposicion.video2, 
                    text2:this.state.exposicion.text2,
                    path2:this.state.exposicion.path2,                         
                    comment2:this.state.exposicion.comment2,
                }

            });            
        }


        /* Apartado para los subtitlos*/

        
        var respuesta1 = await fetch(`https://fun-english-cali.herokuapp.com/Content/`+6+`/Parrafo`, 
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
                    audio:this.state.exposicion.audio, 
                    video2:this.state.exposicion.video2, 
                    text2:ExpositionSub,
                    path2:this.state.exposicion.path2,                         
                    comment2:this.state.exposicion.comment2,
                }
            });
        }        



        /* Apartado para los Videos*/        
        var respuesta2 = await fetch(`https://fun-english-cali.herokuapp.com/Content/`+6+`/Video`, 
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
                    audio:this.state.exposicion.audio, 
                    video2:ExpositionVideo, 
                    text2:this.state.exposicion.text2,
                    path2:this.state.exposicion.path2,                         
                    comment2:this.state.exposicion.comment2,
                }
            });
        }

        
        /* Apartado para las Imagenes*/    
        var respuesta3 = await fetch(`https://fun-english-cali.herokuapp.com/Content/`+6+`/Imagen`, 
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
                    audio:this.state.exposicion.audio, 
                    video2:this.state.exposicion.video2, 
                    text2:this.state.exposicion.text2,
                    path2:ExpositionPath,                         
                    comment2:this.state.exposicion.comment2,
                }
            });        
        }
        
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

            <div className="fondobacInicio" style={{backgroundImage: `url(${this.state.data.background})`}}>
                
                <div className="">
                    <center>
                        {PROTOTIPO}   
                    </center>   
                </div>

            </div>
            
        );
    }

}
export default Inicio;