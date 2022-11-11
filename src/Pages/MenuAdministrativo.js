import React from 'react';
import '../Styles/menuadministrativo.css';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

//const email3 = cookies.get('email');
const rol_id = cookies.get('rol_id');
const idUser3 = cookies.get('idUser');

//console.log('email33333333 '+ email3);
//console.log('admin333333 '+ rol_id);
//console.log('idUser33333333333: '+ idUser3);

function Access(props) {
  return (
    <div>
      <button className="button is-primary mt-2">
        <a rel="noreferrer" href="/OpcionesAdministrativas">Manage Users</a>
      </button>

      <span> <br></br>  </span>

      <button className="button is-primary mt-2" onClick={()=>this.AdministrarInicio()}>
        <a rel="noreferrer" href="/EditarExposicionesVirtuales">Manage Home</a>

      </button>

      <span> <br></br>  </span>

      <button className="button is-primary mt-2" onClick={()=>this.AdministrarKit()}>
        <a rel="noreferrer" href="/AdministrarKit">Manage Kit</a>
      </button>
      <span> <br></br>  </span>
    </div>
  );
}

function Access2(props) {
  return (
    <div>      
      No permissions for more options
    </div>
  );
}


class MenuAdministrativo extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            data: {                
                "name": "",
                "picture": "",                        
            },
            
        };
        // Indicarle a las funciones a quién nos referimos con "this"
        this.componentDidMount = this.componentDidMount.bind(this)
        
    }

    cerrarSesion=()=>{
        cookies.remove('document', {path: "/"});
        cookies.remove('rol_id', {path: "/"});
        cookies.remove('idUser', {path: "/"});  
        cookies.remove('idexpo', {path: "/"});


        window.location.href='./Login';
    }

    AdministrarInicio=()=>{
        cookies.remove('idexpo', {path: "/"});
        cookies.set('idexpo',6, {path: "/"});

        window.location.href='./EditarExposicionesVirtuales';
    }

    AdministrarKit=()=>{
        cookies.remove('idexpo', {path: "/"});
        cookies.set('idexpo', 2, {path: "/"});

        window.location.href='./AdministrarKit';
    }





    async componentDidMount() {
        
        //const cargaUtil = JSON.stringify(idUser3);
        //console.log("La carga util a enviar:",cargaUtil);


        
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/User/Menu/`+idUser3, 
        {
            method: "GET",   
        });



        var Users= await respuesta.json();
        //console.log("respuesta de todo",Users) 

        var NombreUser=Users.name;
        var fotousers=Users.picture;
        if (NombreUser===null) {
          NombreUser="";
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
      var Accesso;

      if (rol_id==='3') {
        cookies.set('idexpo',6, {path: "/"});
        Accesso = <Access/>;
      } else {
        Accesso = <Access2/>;
      }     
        return (            

            <div className="columns centralMenu">

              <div className="column"></div>

                <div className="column" >

                  <div className="cardMenuAdmin">
                    <center>

                      <div className="photo-containerAdmin">
                            <img alt="..." src={this.state.data.picture}>
                            </img>
                      </div>

                      <h1 className="menuletra">¡WELCOME {this.state.data.name.toUpperCase()}!</h1>  
                     
                      <div className="separadorMenu">

                          <button className="button is-primary mt-2">
                            <a rel="noreferrer" href="/Perfil">Profile</a>
                          </button>

                           <span> <br></br> </span>

                         {/*
                          <button className="button is-primary mt-2">
                            <a rel="noreferrer" href="/AdministrarExposiciones">Manage Activities</a>
                          </button>

                           <span> <br></br> </span>
                           */}
                          
                          {Accesso}


                          <button className="button is-primary mt-2" onClick={()=>this.cerrarSesion()}>
                            <a rel="noreferrer" href="/Login">Exit</a>
                          </button>
                                    
                        </div>
                    </center>
                  </div>
                </div>
                
                <div className="column"></div>

            </div>
            
        );
    }

    
}

export default MenuAdministrativo;