//Nota: Importar en el cuerpo del módulo; reordenar al principio importar/primero 
// los que tienen e l @ deben importarse de primero


import '../App.css';
import '../Styles/videos.css';
import styles from '../styles.module.scss';

import React,{useState} from 'react';
import {Paginacion} from '../Components/Paginacion';

import ReactPlayer from 'react-player';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const id_ser3 = parseInt(cookies.get('idUser'));
const id_expo = parseInt(cookies.get('idexpo'));
//console.log("id_ usuario:",id_ser3)
//console.log("id_ exposicion:",id_expo)

//NOTAS: Los nombres de los componentes de React deben comenzar con una letra mayúscula. Los nombres de React Hook deben comenzar con la palabra "use"




function Videosmostrar(props) {

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



function Parrafos(props){
    const subtitles2=props.informacionsub;

    //console.log("subtitles2",subtitles2);
   
    return (
    <div>        
        {subtitles2.map ((subtitles2, i) => (
        <div key={i}>         
            <h1 className="LetraParrafoVideos">{subtitles2.text}</h1>
            <br></br> 
        </div>

        ))}        
    </div>
    );
}


function Kits(props){
    var kit=props.InfoContent;
    //console.log("Informacion que llega al Kit:",kit);

    var parrafos=props.InfoParrafos;    
    //console.log("Todos los parrafos:",props.InfoParrafos);
    var parrafosContent= parrafos.filter(obj => obj.lesson_id === kit.id);
    //console.log("Informacion que llega al Kit para parrafos:",parrafosContent);

    var videos=props.InfoVideos;
    var VideosContent= videos.filter(obj2 => obj2.lesson_id === kit.id);
    //console.log("Informacion que llega al Kit para videos:",VideosContent);

    

    return(
        
        <div className="" >
            <center>
                <div className="cardGerenalVideos">
                    <h1 className="LetraSubtituloVideos"> {kit.title} </h1>
                    
                    <div className="columns">
                        <div className="column" >  
                            <br></br>
                            <br></br>

                            {VideosContent.length===0 ?(
                                <h2>Loading Videos...</h2>
                                ):( 
                                <Videosmostrar informacionvideo={VideosContent}></Videosmostrar>                                                   
                                
                                )
                            } 
                        </div>                        
                    </div>          
                    
                    {parrafosContent.length===0 ?(
                        <h2>Loading Paragraphs...</h2>
                        ):( 
                            <Parrafos informacionsub={parrafosContent}></Parrafos>                                                                       
                        )
                    } 
                               
                </div>
            </center>
        </div>
        
        
    );
}

function PROTOTIPO1(props){

    const activityR=props.informacion.activity;
    
    /*console.log("Lo que tengo en los activityR",activityR)*/

    const parrafos=props.informacion.text2;
    /*console.log("Lo que tengo en los parrafos",parrafos)*/

    const videos=props.informacion.video2;
    /*console.log("Lo que tengo en los videos",videos)*/


    var wrapper='wrapper4';

    var mq = window.matchMedia( "(min-width: 700px)" );
    
    if(mq.matches) {
        wrapper='wrapper3';        
    }
    
    

    return (
        <div className="reducirVideos">

            <div className="cardTituloVideos">
                <center>   
                    <h1 className="loginletraTituloVideos">We Learn By Playing</h1>                
                </center>
            </div>
            <br></br>
            <div className={wrapper}>

                {activityR.map((activityR,index) =>

                    <Kits key={index} InfoContent={activityR} InfoVideos={videos} InfoParrafos={parrafos}></Kits>

                )}
            </div>
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


class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {      
                "user_id": id_ser3,  
                "id": id_expo,                
            },                      
            contents: {                  
                "video2":[{ "content_type_id": 3, "id": 20, "lesson_id": 9, "path": "https://www.youtube.com/watch?v=MltSfK2STEo", "text": null, "user_id": 1 }], 
                "text2":[{ "content_type_id": 7, "id": 13, "lesson_id": 9, "path": null, "text": "El ahorcado es un juego de adivinanzas de l\u00e1piz y papel para dos o m\u00e1s jugadores.", "user_id": 1 }],
                "activity":[{ "audio": "", "background": "", "bibliography": "", "course_id": null, "creation_date": "2022-10-31T17:18:09", "description": "Describe the game the of Ahorcado", "id": 9, "is_active": true, "lesson_type_id": 2, "number_views": 0, "picture": "https://1.bp.blogspot.com/-x7dZ4Ypv0po/TiaZ3m8CA1I/AAAAAAAAA0Y/FBw-PGwVPus/s1600/ahorcado.jpg", "title": "Ahorcado", "url": "", "user_id": 1 }],
            },
            
        };

        //console.log("la data",this.state.data)
        //console.log("la exposicion",this.state.data)
      

        this.componentDidMount= this.componentDidMount.bind(this);


    }

    cerrarSesion=()=>{
        cookies.remove('idexpo', {path: "/"});
    }

    async componentDidMount() {
        
        /* Apartado para los datos*/
        var respuestatodo = await fetch(`https://fun-english-cali.herokuapp.com/Lesson/Search/lesson_type_id/3`, 
        {
            method: "GET",    
        });
        var Contents ;
        var statusr=respuestatodo.status;          
        //var solocontent;
        if (statusr===200) {
            Contents = await respuestatodo.json();
            //solocontent= Contents.filter(obj => obj.id == 9 || obj.id == 10); 
            //Contents =Contents [1];
            //console.log("lo que me llega de la consulta: ", Contents )


            //var ContentsFinal=solocontent ;  

            
            if (Contents===null) {
              Contents=[];
            }
                       
            this.setState({
                
                data: {
                    user_id: this.state.data.user_id,  
                    id: this.state.data.id,                                          
                },                
                contents: {                                                     
                    video2:this.state.contents.video2, 
                    text2:this.state.contents.text2,
                    activity:Contents, 
                }

            });    
        }

        
        // Apartado para los Parrafos
        //var respuesta2 = await fetch(`https://fun-english-cali.herokuapp.com/Content`,
        var respuesta2 = await fetch('https://fun-english-cali.herokuapp.com/Content/Search/Content_Type/7/Lesson_Type/3', 
        {
            method: "GET",    
        });

        var Rstatus=respuesta2.status;
        var respuesta= await respuesta2.json();
        
        //console.log("la respuesta de Contents ",respuesta)

        var Contents;
        if (Rstatus===200) {
            Contents=respuesta;

            //console.log("la respuesta de Contents Parrafos",Contents)
            
            //const Contentsresult = Contents.filter(obj =>  (obj.lesson_id== 10 || obj.lesson_id== 9) && (obj.content_type_id==7)  );
            
            //console.log("la respuesta de los parrafos = 9",Contentsresult)
            //Contents=Contentsresult;

            if (Contents===null) {
              Contents=[];
            }
           
            this.setState({
                data: {
                    user_id: this.state.data.user_id,  
                    id: this.state.data.id,                                          
                },                
                contents: {                                                     
                    video2:this.state.contents.video2, 
                    text2:Contents,
                    activity:this.state.contents.activity, 
                }
            });
        }   

       
        
          
          
        
        var respuesta3 = await fetch('https://fun-english-cali.herokuapp.com/Content/Search/Content_Type/3/Lesson_Type/3', 
        {
            method: "GET",    
        });

        var Rstatus2=respuesta3.status;
        var respuesta3= await respuesta3.json();
        
        //console.log("la respuesta3 de Contents ",respuesta3)

        // Apartado para los Videos      
        var ContentsVideo;
        if (Rstatus2===200) {
            ContentsVideo= respuesta3; 

            //console.log("la respuesta3 de ContentsVideo videos",ContentsVideo)
            
            //const Contentsresult = ContentsVideo.filter(obj =>  (obj.lesson_id== 10 || obj.lesson_id== 9) && (obj.content_type_id==3)  );
            
            //console.log("la respuesta3 de los videos",Contentsresult)
            //ContentsVideo=Contentsresult;

            if (ContentsVideo===null) {
              ContentsVideo=[];
            }
            this.setState({
                data: {
                    user_id: this.state.data.user_id,  
                    id: this.state.data.id,                                          
                },                
                contents: {                                                     
                    video2:ContentsVideo, 
                    text2:this.state.contents.text2,
                    activity:this.state.contents.activity, 
                }
            });
        }

        


        
        
       
        
        


        
    }



    render() {

        const respuesta_structure = "1";
        let PROTOTIPO;


        if (respuesta_structure==="1") {
            PROTOTIPO= <PROTOTIPO1 informacion={this.state.contents}></PROTOTIPO1>
        }else{
            PROTOTIPO= <ProtoFail informacion={this.state.contents}></ProtoFail>
        }


        return (

            <div className="fondobackit" style={{backgroundImage: `url(${this.state.contents.background})`}}>
                {PROTOTIPO} 
            </div>
            
        );
    }





}
export default Videos;