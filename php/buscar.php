<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");

$conexion=new mysqli("localhost","root","belgica","tv");
header("Content-Type: application/json; charset=UTF-8");

$obj=json_decode($_POST["objetoConsulta"]);
$array = get_object_vars($obj);

$tablas = implode(',', $array["tablas"]);
$campos = implode(',', $array["campos"]);
$arregloCampos=explode(",",$campos);

//echo $campos;

$condiciones ="";
$acondiciones=array();
$arrayANDOR=array();
if(isset($array["condiciones"])){

if(isset($array["arrayANDOR"])) $arrayANDOR=$array["arrayANDOR"];//explode(',', $array["arrayANDOR"]);
 $acondiciones=$array["condiciones"]; 
 //for($y=0;$y<=count($arregloCampos)-1;$y++){
 for($y=0;$y<=count($acondiciones)-1;$y++){
  
    $condiciones=$condiciones . $acondiciones[$y]. " ";
    if(isset($array["arrayANDOR"])){
      if($y < count($arrayANDOR) - 1)
        $condiciones=$condiciones . $arrayANDOR[$y]. " ";
    }
  }

$condiciones="where true and " .$condiciones;
 // $condiciones = " where ". implode(',', $array["condiciones"]);
 // echo "la conidciones es ".$condiciones;

}


//$condiciones = " where ". implode(',', $array["condiciones"]);




$query="SELECT ".$campos. " from " .$tablas. " ".$condiciones;


$stmt=$conexion->prepare($query);

$arrays=array();
 
  
 for($y=0;$y<=count($arregloCampos)-1;$y++){
$arrays[]="";  
 $atp[]=& $arrays[$y];
  }





call_user_func_array(array($stmt, 'bind_result'),$atp);
$stmt->execute();
$tuArreglo;

  while ($stmt->fetch())
  {
    
      for($x=0;$x<=count($arregloCampos)-1;$x++){
      
         $arrayst[$arregloCampos[$x]]=$atp[$x];
        }
     $tuArreglo[]=$arrayst;
   }
echo json_encode($tuArreglo);


?>
