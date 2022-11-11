import React from 'react';
//import logo from "../Images/MECA.jpeg";

import './Nav.css';

import Cookies from 'universal-cookie';

const cookies = new Cookies();


class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarMenu: false,
        };
        this.intercambiarEstadoMenu = this.intercambiarEstadoMenu.bind(this);
        this.ocultarMenu = this.ocultarMenu.bind(this);
    }


    ocultarMenu() {
        this.setState({
            mostrarMenu: false,
        })
    }

    intercambiarEstadoMenu() {
        this.setState(state => {
            return {
                mostrarMenu: !state.mostrarMenu,
            }
        });
    }

    cerrarSesion=()=>{
        cookies.remove('idexpo', {path: "/"});
        cookies.remove('email', {path: "/"});
        cookies.remove('adminis', {path: "/"});    
        cookies.remove('idUser', {path: "/"});
        cookies.remove('rol_id', {path: "/"});
        cookies.remove('document', {path: "/"});

            
        window.location.href='/';
    }


    render() {
        return (

            

            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute">
                <div className="container-fluid" style={{height: "80px"}}>

                    <div className={`navbar-menu ${this.state.mostrarMenu ? "is-active" : ""}`}>
                        <div className="navbar-start">
                            
                            <a href="./" className="navbar-item" onClick={()=>this.cerrarSesion()}>                        
                                <img alt="" src="data:image/jpeg;base64,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" style={{ maxHeight: "80px" }} />
                                
                            </a> 
                            <a onClick={this.ocultarMenu} activeclassname="is-active" style={{color:'black'}} className="navbar-item" href="/MenuAdministrativo"> MENU 🕵</a>
                           
                            <a onClick={this.ocultarMenu} activeclassname="is-active" style={{color:'black'}} className="navbar-item" href="/AdministrarJuegos"> MANAGE GAMES 🕵</a>
                            <a onClick={this.ocultarMenu} activeclassname="is-active" style={{color:'black'}} className="navbar-item" href="/VerAdministrarGrados"> GRADES 🎓</a>
                            <a onClick={this.ocultarMenu} activeclassname="is-active" style={{color:'black'}} className="navbar-item" href="/VErAdministrarCursos"> COURSES 🎓</a>
                            
                            <a onClick={this.ocultarMenu} activeclassname="is-active" style={{color:'black'}} className="navbar-item" href="/AdministrarExposiciones"> MANAGE ACIVITYS 📌</a>
                            {/*<a onClick={this.ocultarMenu} activeclassname="is-active" className="navbar-item" href="/OpcionesAdministrativas">MANAGE USERS</a>
                            <a onClick={this.ocultarMenu} activeclassname="is-active" style={{color:'black'}} className="navbar-item" href="/EditarKit"> MODIFY KIT 🎓</a>*/}
                            <a onClick={this.ocultarMenu} activeclassname="is-active" style={{color:'black'}} className="navbar-item" href="/CrearExposicionesVirtuales">CREATE CONTENTS 🧮</a>
                            {/*<a onClick={this.ocultarMenu} activeclassname="is-active" style={{color:'black'}} className="navbar-item" href="/EditarExposicionesVirtuales">EDIT CONTENTS</a>
                            <a onClick={this.ocultarMenu} activeclassname="is-active" style={{color:'black'}} className="navbar-item" href="/ExposicionesVirtuales">SEE CONTENTS</a>
                            <a onClick={this.ocultarMenu} activeclassname="is-active"  style={{color:'black'}} className="navbar-item" href="/AdministrarPreguntas">MANAGE QUESTIONS ❓</a>*/}

                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a target="_blank" rel="noreferrer" href="" className="button is-primary">
                                        <strong>?</strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-brand">                  
                        
                        <button onClick={this.intercambiarEstadoMenu} className={`navbar-burger ${this.state.mostrarMenu ? "is-active" : ""} is-warning2 button`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true">⚙️</span>
                            
                        </button>
                    </div>

                </div>                   
            </nav>
        );
    }
}
export default Nav;