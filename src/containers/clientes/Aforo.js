import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Alert } from "react-native";
import { Box, Icon, Spacer } from "native-base";
import RNSpeedometer from "react-native-speedometer";
import { FontAwesome } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import aforoServices from "../../services/AforoServices";



var { height, width } = Dimensions.get("window");


//Componente Función
function Aforo() 
{
  const [aforoClientes, setAforoClientes] = useState(0);
  const [aforoMaximo, setAforoMaximo] = useState(4600);

  var segmentacion = 
  [
    {
      name: 'Aforo Bajo',
      labelColor: 'black',
      activeBarColor: '#8DDD00',  //'#39BFC2'  //#A3EE3F
    },
    {
      name: 'Aforo Medio',
      labelColor: 'black',
      activeBarColor: '#FEC34D',  //#F18032
    }
    ,
    {
      name: 'Aforo Alto',
      labelColor: 'red',
      activeBarColor: '#FC3D31', //#F05642
    }
  ];

  
  useEffect(() => 
  {
    
    /**
     * Metodo que permite cargar el aforo máximo desde el API-REST
     */
    const getAforoMaximo = async () => 
    {
      try 
      {
        let {success, aforoMaximoBD} = await aforoServices.getAforoMaximo();

        if(success)
        {
            // await AsyncStorage.setItem("@aforoMaximo", JSON.stringify(aforoMaximoBD));
            setAforoMaximo(aforoMaximoBD);
        }
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD 
      }
    };

    getAforoMaximo();
  }, []);
  


  /**
   * Método que permite registrar el ingreso del cliente
   */
  const ingresoCliente = async () => 
  {
    const resultado = await aforoServices.registrarIngresoSalida("ingresos");

    if (resultado.success) 
    {
      setAforoClientes(resultado.aforoClientes);
    }
    else
    {
      if("Network Error" === resultado.message)
      {
        Alert.alert("Advertencia", "No hay conexión a internet.");
      }
    }
  };



  /**
   * Método que permite registrar la salida del cliente
   */
  const salidaCliente = async () => 
  {
    const resultado = await aforoServices.registrarIngresoSalida("salidas");

    // console.log("Consulta Aforo");
    // console.log(resultado);
    // console.log(JSON.stringify(resultado.aforoClientes));

    if (resultado.success && resultado.aforoClientes >= 0) 
    {
      setAforoClientes(resultado.aforoClientes);
    }
    else
    {
      if("Network Error" === resultado.message)
      {
        Alert.alert("Advertencia", "No hay conexión a internet.");
      }
    }
  };



  return (
    <Box>
      <View style={styles.derecha}>
        <Image
          source={require("../../../assets/Logo_Unicentro.png")}
          style={styles.logo}
        />
      </View>

      <View style={{flexDirection: "column", alignItems: "center"}}>
        <SafeAreaView style={{ marginTop: 60, height: (height/2.7)}}>
          <RNSpeedometer value={aforoClientes} size={width-50} labels={segmentacion} minValue={0} maxValue={aforoMaximo}/>
        </SafeAreaView>

        <Text style={{ fontSize: 65 }}>{Math.round((100 * aforoClientes) / aforoMaximo)}%</Text>

      </View>
      
      <View style={{ flexDirection: "row", marginTop: 50,  marginBottom: 80 }}>

        <TouchableOpacity onPress={salidaCliente}>
          <Icon as={FontAwesome} name="minus-circle" color="red.600" size="20"/>
        </TouchableOpacity>

        <Spacer />

        <TouchableOpacity onPress={ingresoCliente}>
          <Icon as={FontAwesome} name="plus-circle" color="lime.400" size="20" />
        </TouchableOpacity>

      </View> 
      
    </Box>
  );
}


export default Aforo;





const styles = StyleSheet.create(
{
  form: 
  {
    padding: 20,
    // flex:1,
  },
  itemRegistro: 
  {
    marginLeft: 0,
    height: 60,
    marginTop: 12
  },
  labelItem: 
  {
    alignItems: "center",
    color: "gray",
  },
  logo: 
  {
    width: 120,
    height: 80,
  },
  derecha: 
  {
    alignItems: "flex-end",
    marginTop: 40
  },
});
