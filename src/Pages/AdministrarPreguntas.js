import React from 'react';
//import Constantes from "../Constantes";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import swal from 'sweetalert';
import '../Styles/login.css';

import '../Styles/opcionesadministrativas.css';


interface Column {
  id: 'id' | 'name' | 'description' | 'answer';
  label: string;
  align?: 'right';
}

const columns: Column[] = [
  { id: 'id', label: 'Id'},
  { id: 'name', label: 'Pregunta'},
  { id: 'description',label: 'Detalle'},
  { id: 'answer', label: 'Pregunta',  align: 'right'},
];

function ColumnGroupingTable(props) {
  const rows=props.todo
  //console.log("llego",rows)
  //const rows = [{id: 'India', name: 'IN', email: 1324171354, admin: 3287263}];

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
    <Paper sx={{ width: '100%', bgcolor: '#ffffff00' }} >
      <TableContainer sx={{ maxHeight: 450, borderRadius: 5,border: 2 }} >
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>

              <TableCell align="center" colSpan={3} >
                <p className="negrillaP">PREGUNTA:</p>
              </TableCell>

              <TableCell align="center" colSpan={1}>
                <p className="negrillaP">RESPUESTA:</p>
              </TableCell>

            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
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
        rowsPerPageOptions={[5, 10, 25]}
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
            "name": "",
            "description": "",
            "date": "", 
            "answer": "",
            
          },
          questionData: {
            "PreguntasRespuestas": [],
          }
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.manejarCambio = this.manejarCambio.bind(this);        
        this.eliminarPregunta = this.eliminarPregunta.bind(this);
        this.responderPregunta = this.responderPregunta.bind(this);
    }

    async componentDidMount() {

        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Questions`, 
        {
            method: "GET",    
        });
              
        
        var existe;
        var statusr=respuesta.status;  

        if (statusr===200) {
            existe= await respuesta.json(); 
            
            this.setState({
                data: {
                    id: this.state.data.id, 
                    name: this.state.data.name,
                    description: this.state.data.description,
                    date: "",
                    answer : this.state.data.answer ,                                                           
                },
                questionData: {
                    PreguntasRespuestas: existe,  
                },
            });
        }
    }

    render() {
        return (

            <div className="columns central">

              <div className="column"></div>

                <div className="column is-two-fifths" >

                  <div className="cardTabla">
                    <center>

                      <h1 className="opcionesletra">¡ADMINISTRAR PREGUNTAS!</h1>            
                      
                      <form className="elform">                         

                          
                          <div className="form-group">                                
                            <input autoFocus required placeholder="Id: Responder/Eliminar" type="number" id="id" className="FondoInput" onChange={this.manejarCambio} value={this.state.data.id} >
                            </input>
                          </div>

                          <div className="form-group">                                
                            <input autoFocus  placeholder="Respuesta: " type="text" id="answer" className="FondoInput" onChange={this.manejarCambio} value={this.state.data.answer} >
                            </input>
                          </div>


                          <div className="form-group">
                              <button className="button is-success mt-2" onClick={this.responderPregunta}>
                                Responder Pregunta
                              </button>
                          </div>
                        
                          <div className="form-group">
                              <button className="button is-success mt-2" onClick={this.eliminarPregunta}>
                                Eliminar Pregunta
                              </button>
                          </div>
                          
                          <br></br>

                          {this.state.questionData.PreguntasRespuestas.length===0 ?(

                            <h3>Cargando...</h3>
                            ):(
                              
                              <ColumnGroupingTable todo={this.state.questionData.PreguntasRespuestas}></ColumnGroupingTable>                         
                            )
                          }  


                      
                      </form>
                    
                    </center>
                  </div>
                </div>
                
                <div className="column" >
                   
                </div>

            </div>
            
        );
    }

    async responderPregunta(evento){

        evento.preventDefault();
        
        const continuar = () =>{
            swal({
              title: "¡Felicidades!",
              text: "¡Se respondio la pregunta¡ ¡Se elimino la pregunta¡",
              icon: "success",                        
            }).then(function() {
                window.location = "/AdministrarPreguntas";                            
            });
        }

        const detener = () =>{
            swal({
              title: "¡Surgio un error!",
              text: "¡La pregunta no existe!",
              icon: "error",
              timer: 6000,
            });
        }    

        //const cargaUtil = JSON.stringify(this.state.data.id);


        var cargaUtil= JSON.stringify(this.state.data)
        


        console.log("carga util",cargaUtil);   

        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Questions/Update`, 
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
                    name:"",
                    description:"",
                    date:"",
                    answer : "",                     
                },
                questionData: {
                  PreguntasRespuestas:this.state.questionData.PreguntasRespuestas,
                }
            });            
            continuar(); 
        } else {
            detener();
        }
    }




    async eliminarPregunta(evento){
        evento.preventDefault();
        
        const continuar = () =>{
            swal({
              title: "¡Eliminar!",
              text: "¡Eliminando Pregunta!",
              icon: "success",                        
            }).then(function() {
                window.location = "/AdministrarPreguntas";                            
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
        

        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Questions/Delete/`+parseInt(this.state.data.id), 
        {
            method: "DELETE",    
        });

        //console.log("respuesta de todo",respuesta) 
                
        var statusr=respuesta.status;
        console.log("respuesta de todo",statusr) 
          
        if (statusr===200) {
            
            this.setState({
                data: {
                    id: "", 
                    name:"",
                    description:"",
                    date: "",
                    answer : "",
                },
                questionData:{
                  PreguntasRespuestas:this.state.questionData.PreguntasRespuestas,
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
            // Si es la calificación o el nombre, necesitamos castearlo a entero
            if (clave === "id") {
                valor = parseInt(valor);
            }         
            dataActualizado[clave] = valor;
            return {
                data: dataActualizado,
            }
        });
    }

    
    
}

export default OpcionesAdministrativas;

