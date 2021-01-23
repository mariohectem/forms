<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Content-Type: application/json; charset=UTF-8");
$cadbts="<html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><script src=js/jquery.min.js></script><script src='js/bootstrap.min.js'></script><link href='css/bootstrap.min.css' rel='stylesheet'></head>";
$text=$cadbts;
$text.="<body>";
$text.=$_POST["val"];
$cb=$_POST["ob"];
$op=$_POST["op"];
$nomarch=$_POST["nomarch"];
$text.="</body>";
$text .="<script>var op=JSON.parse('".$op."'); var cb=JSON.parse('".$cb."');</script>";//document.getElementById('mio').value);</script>";
$text .="<script src='catfp.js'></script>";
$text .= "<script>cargarSelectsNoDependientes();crearDivBusqueda();</script>";
 $bol=unlink($nomarch);
 $fh=fopen($_SERVER['DOCUMENT_ROOT'].'/tv/'.$nomarch,'a+');
 // $stringData = "your html code php code goes here";   
  fwrite($fh, $text);
  fclose($fh);
?>
