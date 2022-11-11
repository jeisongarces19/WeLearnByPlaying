import React, { useEffect, useState } from "react"

function usePostres() {

	const [postres, setPostres] = useState([])

	useEffect(() => {
		fetch("json/postres.json")
		.then(response => response.json())
		.then(datos => {
			setPostres(datos)
		})
	}, [])

	return postres
}

export default function Postres() {

	const postres = usePostres()

	console.log(postres)

	return (

		<div className="container mt-5" align="center">
      
	      <h4>Lista de Postres</h4>
	        
	      <div className="row">

	        <div className="col-md-12">

	          <table className="table table-bordered">
	            <thead className="thead-dark">
	              <tr>
	                <th scope="col">ID</th>
	                <th scope="col">Nombre</th>
	                <th scope="col">Stock</th>
	                <th scope="col">Precio</th>
	              </tr>
	            </thead> 
	            <tbody>

	            {postres.map(item => (

	              <tr key={item.id}>
	                <td>{item.id}</td>
	                <td>{item.nombre}</td>
	                <td>{item.stock}</td>
	                <td>{item.precio}</td>
	              </tr>

	            ))}

	            </tbody>

	          </table>

	        </div>

	      </div>

        
    	</div>

	
	)

}