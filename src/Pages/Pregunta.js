import React from 'react';

import '../App.css';
import '../Styles/pregunta.css';

import swal from 'sweetalert';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


interface Column {
  id: 'name' | 'description' | 'answer';
  label: string;
  align?: 'right';
}

const columns: Column[] = [
  { id: 'name', label: 'Pregunta'},
  { id: 'description',label: 'Detalle'},
  { id: 'answer', label: 'Respuesta',  align: 'right'},
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
    <Paper sx={{ width: '100%', bgcolor: '#ffffffa0' }} >
      <TableContainer sx={{ maxHeight: 450 ,borderRadius: 5,border: 2 }} >
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>

              <TableCell  align="center" colSpan={2} >
                <p className="negrillaP">PREGUNTAS:</p>
              </TableCell>

              <TableCell align="center" colSpan={1}>
                <p className="negrillaP">RESPUESTAS:</p>
              </TableCell>

            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.name}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.name} align={column.align}>
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


class Pregunta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                "name": "",
                "description": "",
            },
            questionData: {
                "PreguntasRespuestas": [],
            },            
        };
        // Indicarle a las funciones a quién nos referimos con "this"
        
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

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
                    name: this.state.data.name,
                    description: this.state.data.description,                                                  
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

                <div className="columnMiaP" >

                  <div className="cardPregunta">
                    <center>

                      <h1 className="preguntaletra">What is your question?🧐</h1>                

                      
                        <form onSubmit={this.manejarEnvioDeFormulario}>

                            <h3>Question❓</h3>
                            <div className="form-group">                                    
                                <input autoFocus required placeholder="General" type="text" id="name" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.name} >
                                </input> 
                            </div>
                            <span> </span>
                            <br></br>

                            <h3>Detail📝</h3>
                            <div className="form-group">                                    
                                <textarea rows="4" autoFocus placeholder="Specify Question " type="text" id="description" className="FondoInput"  onChange={this.manejarCambio} value={this.state.data.description} >
                                </textarea> 
                            </div>
                            <span> </span>
                        
                          <div className="form-group">
                              <button className="button is-success mt-2" >
                              Send
                              </button>                     
                          </div>
                      </form>

                    </center>
                  </div>
                </div>

                <div className="columnMia">
                    <div className="cardTablaU">
                        {this.state.questionData.PreguntasRespuestas.length===0 ?(

                            <h3>Cargando...</h3>
                            ):(
                              
                              <ColumnGroupingTable todo={this.state.questionData.PreguntasRespuestas}></ColumnGroupingTable>                         
                            )
                        } 
                    </div>     

                </div>


                

            </div>
            
        );
    }

    async manejarEnvioDeFormulario(evento){
        const continuar = () =>{
            swal({
              title: "Creation",
              text: "Your question has been created",
              icon: "success",              
            }).then(function() {
                window.location = "/Pregunta";
            });
        }
        const detener = () =>{
            swal({
              title: "Error",
              text: "An error occurred while creating the question",
              icon: "error",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                swal("Try of now!");
              }
            });
        }        
        evento.preventDefault();
        const cargaUtil = JSON.stringify(this.state.data);

        console.log(cargaUtil);   
        var respuesta = await fetch(`https://proyecto-meca-cali.herokuapp.com/Questions/Create`, 
        {
            method: "POST",            
            body: cargaUtil,   
        });


        //console.log("respuesta de todo",respuesta)        
        var statusr=respuesta.status;   
        //console.log("respuesta de s",statusr)      
        if (statusr===201) {           
            this.setState({
                data: {
                    "name": "",  
                    "description": ""                    
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

export default Pregunta;