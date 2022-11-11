import React from 'react';
import '../Styles/menuadministrativo.css';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
const cookies = new Cookies();

//const email4 = cookies.get('email');
//const admin4 = cookies.get('adminis');
const idUser4 = parseInt(cookies.get('idUser'));
const rol_id = cookies.get('rol_id');
//console.log('email43333333 '+ email4);
//console.log('admin433333 '+ admin4);
//console.log('idUser4 '+ idUser4);

class MenuUsuario extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {
            data: {
                "name": "",
                "picture": "",    
                                  
            },
            req_admin:{
                "id": idUser4,
            },
        };
        // Indicarle a las funciones a quién nos referimos con "this"
        this.componentDidMount = this.componentDidMount.bind(this)
        this.solicitarAdmin = this.solicitarAdmin.bind(this)
        
        
    }

    cerrarSesion=()=>{
        cookies.remove('document', {path: "/"});
        cookies.remove('rol_id', {path: "/"});
        cookies.remove('idUser', {path: "/"});  
        cookies.remove('idexpo', {path: "/"});


        window.location.href='./Login';
    }





    async componentDidMount() {
        
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/User/Menu/`+idUser4, 
        {
            method: "GET",   
        });



        var Users= await respuesta.json();
        //console.log("respuesta de todo",Users) 

        var NombreUser=Users.name;
        var fotousers=Users.picture;
        if (NombreUser===null) {
          NombreUser="https://aj-derteano.github.io/image/images/perfil_animate.png";
        }

        if (fotousers===null) {
          fotousers="https://scontent.fclo8-1.fna.fbcdn.net/v/t1.6435-9/96763841_2560962134004181_6427503684715806720_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_eui2=AeH3cpBhmPB-hqAaoYFwMxZl0F4KPX8zzBvQXgo9fzPMG9JvJhrlLApTCsCh5sT0YRg2lzYIIr817q1iLfdK6o4W&_nc_ohc=hpxMkA-b-nsAX9kB_aN&tn=UeDYw6nmCHgbXVCv&_nc_ht=scontent.fclo8-1.fna&oh=00_AT-ui2dXH2GjHUj2lL72m9uf6myiCJMdzxjJCXfNZunFdg&oe=62B2C745";
        }
        
        this.setState({
          data: {
              name: NombreUser,
              picture: fotousers
          }
        });


    }

    render() {        
        return (            

            <div className="columns central">

              <div className="column"></div>

                <div className="column" >

                  <div className="cardMenuAdmin">
                    <center>

                      <div className="photo-container">
                            <img alt="..." src={this.state.data.picture} style={{height: "90px"}}>
                            </img>
                      </div>

                      <h1 className="menuletra">¡BIENVENIDO {this.state.data.name.toUpperCase()}!</h1>  
                     
                      <div className="separador">

                          <button className="button is-primary mt-2">
                            <a rel="noreferrer" href="/Perfil">Perfil</a>
                          </button>

                           <span> <br></br> </span>

                         
                          <button className="button is-primary mt-2">
                            <a rel="noreferrer" href="/ListarExposicionesVirtuales">Exposiciones</a>
                          </button>

                          <span> <br></br> </span>

                          <button className="button is-primary mt-2" onClick={this.solicitarAdmin}>
                            <a rel="noreferrer" href="/MenuUsuario">Solicitar Administrador</a>
                          </button>

                          <span> <br></br> </span>




                          <button className="button is-primary mt-2" onClick={()=>this.cerrarSesion()}>
                            <a rel="noreferrer" href="/Login">Salir</a>
                          </button>
                                    
                        </div>
                    </center>
                  </div>
                </div>
                
                <div className="column"></div>

            </div>
            
        );
    }

    async solicitarAdmin(evento) {

        const continuar = () =>{
            swal({
              title: "Solicitud",
              text: "Ha solicitado ser Administrador. Muy pronto conocera la respuesta",
              icon: "success",              
            }).then(function() {
                window.location = "/MenuUsuario";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "Surgio un error al solicitar ser Administrador",
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
        const cargaUtil = JSON.stringify(this.state.req_admin);
        //const cargaUtil = JSON.stringify(this.state.data);
        console.log(cargaUtil); 

        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Users/Update/req_admin`, 
        {
            method: "PUT",            
            body: cargaUtil,   
        });

        //console.log("respuesta de todo",respuesta) 
       
        var statusr=respuesta.status; 
        console.log("statusr de todo",statusr)         
        
        if (statusr===200) {
           
            this.setState({
                data: {      
                  name: this.state.data.name,
                  picture: this.state.data.picture,                       
                },
                req_admin:{
                    id: this.state.req_admin.id,
                }                
            
            });
            continuar(); 

        } else {        
            detener();
        } 
    }

    
}

export default MenuUsuario;