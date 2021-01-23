<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Content-Type: application/json; charset=UTF-8");

$obj=json_decode($_POST["val"]);
$md=json_decode($_POST["md"]);
$arrayMD=array();
$conexion=new mysqli("localhost","usuario","password","tv");
$esDet=0;
$gg=1;
$oli=0;
$idDet=0;
$activaId=0;

$arrayTD=array();
$arrayCD=array();

if($md->md=="s"){
    $esDet=1;   
    $arrayMD[0]=$md->tm;
    $arrayTD=$md->td;
    $arrayMD[1]="pend";//$md->td;
    $arrayMD[2]=str_replace("idss","id",$md->cm);
    $arrayCD=$md->cd;
    $arrayMD[3]="pend";//$md->cd;
    $arrayMD[4]=$md->sm;
    if($md->gg=="si"){
      $stmt=$conexion->prepare("select ". $md->sm. "() as maxValor");
      $stmt->execute();
      $result=$stmt->get_result();
      $fila=$result->fetch_all(MYSQLI_ASSOC);
      $arrayMD[5]=$fila[0]["maxValor"]; 
      $stmt->close();
   }
   else {$gg=0;}
   
}else{$arrayMD[0]="";}





$atp=array();
$valores=array();


print_r($obj);
for($x=0;$x<=count($obj)-1;$x++){
  $array = get_object_vars($obj[$x]); 
 
 
  $nomTabla = array_keys($array)[0];
  
  $arregloCampos=array_values($array)[0];
  
  $campos="";  
  $paramBind=""; 
  vaciarArreglo($valores);  
  vaciarArreglo($atp);
  $parms="";


  if($esDet==1){

          if($gg==1){
             if($nomTabla==$arrayMD[0]){$arregloCampos->{$arrayMD[2]}=$arrayMD[5];}//pone el max id generado por la secuencia
             if($nomTabla==$arrayMD[1]){$arregloCampos->{$arrayMD[3]}=$arrayMD[5];}
           }
           else{
                if($activaId==1){                      
                        for($y=0;$y<=count($arrayTD)-1;$y++){
                              if($arrayTD[$y]==$nomTabla){$arregloCampos->{$arrayCD[$y]}=$idDet;}}}}

  }
 





  foreach($arregloCampos as $key=>$value){
      $paramBind.="?,";
      $campos.=str_replace("idss","id",$key).",";
      $parms.="s";
      $valores[]=$value;
  }
  $atp[]=& $parms; 
  for($y=0;$y<=count($valores)-1;$y++){
    $atp[]=& $valores[$y];
  }
  $campos=substr($campos,0,strlen($campos)-1);
  $paramBind=substr($paramBind,0,strlen($paramBind)-1);

  

  $stmt=$conexion->prepare("insert into ".$nomTabla."(".$campos.")values(".$paramBind.")");
 
  call_user_func_array(array($stmt, 'bind_param'), $atp);
  $stmt->execute();
     if($nomTabla==$arrayMD[0] && $oli==0 && $esDet==1&& $gg==0){
         $idDet=$conexion->insert_id;
         $oli=1;
         $activaId=1;
      
     }
 


}
$conexion->close();

function vaciarArreglo(&$arreglo){
  while(count($arreglo))array_pop($arreglo);
}
?>
