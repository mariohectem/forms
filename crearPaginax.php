<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php if($_GET["fbobs"]=="bs"){?>       
  <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <link href="css/bootstrap.min.css" rel="stylesheet">

<?php }?> 
</head>
<body>
<div id="mib">

<?php if($_GET["fbobs"]=="bs"){?>    
  <div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Modal Header</h4>
      </div>


      <div class="modal-body" id="mimodal"></div>
     
<?php }?> 
<?php if($_GET["fbobs"]=="bs"){?>   
<div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

<?php }?> 







<div id="divColonias" style="width:70%;margin:auto;margin-top:100px" styles="display:flex;flex-direction:column;margin:auto;width:50%">
</div>
<div style="width:100;display:flex;align-items:flex-center;flex-direction:row;justify-content:center">
  <div><input type="button" value="Guardar" class="btn btn-info btn-lg" style="margin:auto" onclick="guardarTM('colonias\\.')"/>



</div>
</div>


<div>
<input type="text" id="nomarch" placeholder="Nombre del archivo"></input>
<input type="button" value="Crear archivo" class="btn btn-info btn-lg" style="margin:auto" onclick="crearArchivoServidor()" id="btncarch"/>
</div>


</div>



</body>
<input type="text" id="miObj" style="display:none">
</html>
<script src="catfp.js"></script>
<script>




function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var op={};
op=getParameterByName('btnj');
var cb=getParameterByName('btnj2');
cb = JSON.parse(cb);
var op = JSON.parse(op);
crearDivBusqueda();
crearFormulario(op);
cargarSelectsNoDependientes();
creset=false;
setEventoTutores();
configurarCamposHidden();

function crearArchivoServidor(){
  //  oeid("mit").value=oeid("mib").innerHTML;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) { 
              console.log("texto aceptado"+this.responseText); 
             window.open(oeid("nomarch").value+".html","_self");  
  }
    };
    xmlhttp.open("POST","crearArchivo.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("nomarch="+oeid("nomarch").value+".html&"+"val="+oeid("mib").innerHTML+"&ob="+JSON.stringify(cb)+"&op="+JSON.stringify(op)+"&fbobs=<?php echo $_GET['fbobs'];?>");
 
}



</script>

<style>
 .col-lg-6{width:50%;}
 .col-lg-10{width:83%;}
 .col-lg-2{width:17%;}
 .row{display:flex;flex-direction:row;margin:10px}
 .form-group{display:flex;flex-direction:row}

</style>

