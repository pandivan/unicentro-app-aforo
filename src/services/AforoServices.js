import axios from "axios";


const BACKEND_URL = "https://unicentro-api-rest.herokuapp.com/unicentro-service/v1/aforos";

// const BACKEND_URL = "http://192.168.1.8:7788/unicentro-service/v1/aforos";




/**
 * Función que permite registrar el ingreso de cliente en BD
 */
const registrarIngresoSalida = async (registro) => 
{
  try
  {
    let respuesta = null;

    respuesta = await axios.post(`${BACKEND_URL}/${registro}`);

    return { success: ("" !== respuesta.data), aforoClientes: respuesta.data };
  }
	catch(error)
  {
    // console.log("Cliente ".concat(JSON.stringify(error)));
    return { success: false, message: error.message };
  }
}



/**
 * Función que permite obtener el aforo máximo de la BD
 */
 const getAforoMaximo = async () => 
 {
   try
   {
     let respuesta = null;
 
     respuesta = await axios.get(`${BACKEND_URL}/maximos`);
 
     return { success: ("" !== respuesta.data), aforoMaximoBD: respuesta.data };
   }
   catch(error)
   {
     // console.log("Cliente ".concat(JSON.stringify(error)));
     console.log(`Error al consultar el aforo máximo: ${error}`);
     return { success: false, message: error.message };
   }
 }



export default 
{
  registrarIngresoSalida,
  getAforoMaximo
};
