import React from 'react';
//import Constantes from "../Constantes";
//import  ObservarUser from "./ObservarUser"

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


//Estas dos son para la otra forma
//import styled from 'styled-components';
//import { useTable } from 'react-table';

import Cookies from 'universal-cookie';
import swal from 'sweetalert';

import '../Styles/opcionesadministrativas.css';



const cookies = new Cookies();

//const email3 = cookies.get('email');
const rol_id = cookies.get('rol_id');
const idUser3 = cookies.get('idUser');


// ayuda: https://codesandbox.io/s/1rmzfw?file=/demo.tsx:429-4237

interface Column {
  id: 'id' | 'document' | 'name' | 'rol_id';
  label: string;
  align?: 'right';
}

const columns: Column[] = [
  { id: 'id', label: 'Id'},
  { id: 'document',label: 'Document'},
  { id: 'name', label: 'Name'},
  { id: 'rol_id', label: 'Rol'},
];

function ColumnGroupingTable(props){
  const rows=props.todo
  //console.log("llego",rows)
  //const rows = [{id: 'India', document: 1324171354, admin: 3287263}];

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
    <Paper sx={{ width: '100%',padding: '10px 10px 10px' }} >
      <TableContainer sx={{ maxHeight: 400 , borderRadius: 3,border: 2}} >
        <Table stickyHeader aria-label="sticky table" sx={{ width: '80%' }}   >
          <TableHead>
            <TableRow>

              <TableCell align="center" colSpan={2} >
                Personal information
              </TableCell>

              <TableCell align="center" colSpan={2}>
                Rol= Manager:3 Teacher:2 Student:1
              </TableCell>

            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 37, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
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

class OpcionesAdministrativas extends React.Component {

    

    constructor(props) {
        super(props);
        this.state = {
          data: {
            "id": "", 
            "Usuarios": [],
          },
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.manejarCambio = this.manejarCambio.bind(this);        
        this.eliminarUsuario = this.eliminarUsuario.bind(this);
        this.cambiarTipo = this.cambiarTipo.bind(this);
    }

    ObservarUser=(props)=>{
        var props2=props;
        console.log(props2);
        cookies.set('UserMoment', props2, {path: "/ObservarUser"});

        window.location.href='./ObservarUser';
    }

    async componentDidMount() {

        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/User`, 
        {
            method: "GET",    
        });
              
        
        var existe;
        var statusr=respuesta.status;  

        if (statusr===200) {
            existe= await respuesta.json(); 
            //console.log(existe)
            
            this.setState({
                data: {
                    id:  this.state.data.id, 
                    Usuarios:  existe,                            
                }
            });
        }
    }

    render() {
        return (

            <div className="columns central">

              <div className="column"></div>

                <div className="column" >
                  <br></br>  

                  <div className="cardTabla">
                    <center>


                      <h1 className="opcionesletra">¡USER ADMINISTRATOR!</h1>            
                      
                      <form className="">                         

                          
                          <div className="form-group">                                
                            <input autoFocus required placeholder="Id: Modify/Delete" type="number" id="id" className="FondoInput" onChange={this.manejarCambio} value={this.state.data.id} >
                            </input>
                          </div>

                          <span> <br></br>  </span>

                          <div className="form-group">
                              <button className="button is-success mt-2">
                                <a rel="noreferrer" href="/Registrarse">Create User</a> 
                              </button>
                          </div>

                          <div className="form-group">
                              <button className="button is-primary mt-2" onClick={()=>this.ObservarUser(this.state.data.id)}>
                                <a rel="noreferrer" href="/ObservarUser">Observe User (Modify) </a>
                                
                              </button>
                          </div>

                          <div className="form-group">
                              <button className="button is-success mt-2" onClick={this.eliminarUsuario}>
                                Delete User
                              </button>
                          </div>

                          <br></br>

                          {/*      
                          <div className="form-group">
                              <button className="button is-success mt-2" onClick={this.cambiarTipo}>
                                Change type 
                              </button>
                          </div>
                          /*}

                          
                          

                          {/*<App2 todo={this.state.data.Usuarios}></App2>*/}

                          {this.state.data.Usuarios.length===0 ?(

                            <h3>Cargando...</h3>
                            ):(
                              
                              <ColumnGroupingTable todo={this.state.data.Usuarios}></ColumnGroupingTable>                         
                            )
                          }  


                          {/*<div className="form-group">
                              <button className="button is-success mt-2" onClick={this.componentDidMount}>
                                Mostrar Usuarios
                              </button>
                          </div>*/}
                      
                      </form>
                    
                    </center>
                  </div>
                </div>
                
                <div className="column" >
                   
                </div>

            </div>
            
        );
    }

    async cambiarTipo(evento){

        evento.preventDefault();
        
        const continuar = () =>{
            swal({
              title: "¡Actualizar!",
              text: "¡Se actualizo el tipo de usuario!",
              icon: "success",                        
            }).then(function() {
                window.location = "/OpcionesAdministrativas";                            
            });
        }

        const detener = () =>{
            swal({
              title: "¡Surgio un error!",
              text: "¡El usuario no existe!",
              icon: "error",
              timer: 6000,
            });
        }    

        //const cargaUtil = JSON.stringify(this.state.data.id);

        var cargaUtil= JSON.stringify(this.state.data)
        



        //console.log("carga util",cargaUtil);   

        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Users/Uptdate/admin`, 
        {
            method: "PUT",            
            body: cargaUtil,   
        });        

        
        //console.log("respuesta de todo",respuesta) 
                
        var statusr=respuesta.status;

        //console.log("respuesta de todo",statusr) 

          
        if (statusr===200) {
            
            this.setState({
                data: {
                    id: "", 
                    Usuarios: this.state.data.Usuarios,                               
                }
            });            
            continuar(); 
        } else {
            detener();
        }
    }




    async eliminarUsuario(evento){
        evento.preventDefault();
        
        const continuar = () =>{
            swal({
              title: "¡Eliminar!",
              text: "¡Eliminando Usuario!",
              icon: "success",                        
            }).then(function() {
                window.location = "/OpcionesAdministrativas";                            
            });
        }

        const detener = () =>{
            swal({
              title: "¡Error!",
              text: "¡Surgio un error!",
              icon: "error",
              timer: 6000,
            });
        }    
        
        var respuesta = await fetch(`https://fun-english-cali.herokuapp.com/User/Delete/`+this.state.data.id, 
        {
            method: "DELETE",    
        });

        //console.log("respuesta de todo",respuesta) 
                
        var statusr=respuesta.status;

          
        if (statusr===200) {
            
            this.setState({
                data: {
                    id: "", 
                    Usuarios: this.state.data.Usuarios,

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

export default OpcionesAdministrativas;

