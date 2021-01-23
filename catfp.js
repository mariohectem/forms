var esDependiente=false;
var indiceBusquedaActivo;
var creset=true;
var botstp=true;
var tf="bs"
//crearDivBusqueda();
//crearObjetoDOM(objeto,tipo,texto,textContent,estilo,id,evento,valor,clase,nombre)

function crearFormulario(c){  
   var tamCol=12/c;
   var cfilas=0;
   var divFila=crearObjetoDOM("div","","","","","",null,null,"row");
   var form=crearObjetoDOM("form","","","","","",null,null,"form-horizontal");
   for(var x=0;x<=op.campos.length-1;x++){
     var divCol=crearObjetoDOM("div","","","","","",null,null,"col-lg-6");
     divCol.appendChild(divConEtiquetaEInput(op.etiquetas[x],op.campos[x],op.tipoInputs[x]));
     divFila.appendChild(divCol);
     cfilas++;
     form.appendChild(divFila);
     if(cfilas == 2 )
       {      
          divFila=crearObjetoDOM("div","","","","","",null,null,"row");
          cfilas=0;
       }       
     
   }
    oeid("divColonias").appendChild(form);


}



function divConEtiquetaEInput(etiqueta,id,t){
    var input; 
    var tipo;
    var elemento;
   //o var divCam=crearObjetoDOM("div","","","","display:flex;flex-direction:column;margin:5px;","");
     var divCam=crearObjetoDOM("div","","","","","",null,null,"form-group");

    if(t=="t" || t=="h" ||t=="r"){
      input="input";
         if(t=="t"){tipo="text"}if(t=="h"){tipo="hidden";}if(t=="r"){tipo="radio";}}
     if(t=="s")input="select";
      if(t!=="r"){
       var tit=crearObjetoDOM("label","","",etiqueta,"","",null,null,"col-lg-2 control-label");
       divCam.appendChild(tit);
       elemento=crearObjetoDOM(input,tipo,"","","",id,null,null,"form-control");
       
     
       var divInput=crearObjetoDOM("div","","","","display:flex;flex-direction:row","",null,null,"col-lg-10");
       divInput.appendChild(elemento);
       divCam.appendChild(divInput);
      }
      else{
           var tit=crearObjetoDOM("label","","",(etiqueta.split("|"))[0],"","",null,null,"col-lg-2 control-label");
           divCam.appendChild(tit);
           divCam.appendChild(crearRadiosInputs(etiqueta,input,tipo,id));
        
           
           } 

        

   
      return divCam;
}



function crearRadiosInputs(etiqueta,input,tipo,id){
//          var divC=crearObjetoDOM("div","","","","display:flex;flex-direction:column;margin:5px;","");

"col-lg-10"
          
          var lbs=etiqueta.split("|")[1];
          var values=etiqueta.split("|")[2];
          lbs=lbs.split("^");
          values=values.split("°");
          var divCamx=crearObjetoDOM("div","","","",""/*display:flex;flex-direction:row;margin:5px;*/,"",null,null,"col-lg-10");
          for(var x=0;x<=lbs.length-1;x++){
            tit=crearObjetoDOM("label","","",lbs[x],"margin-right:10px","");
            var valor=values[x];
            elemento=crearObjetoDOM(input,tipo,"","","",id,null,null,"custom-control-input",id);
            elemento.setAttribute("onclick","obtenerIdCheck(this)");
            elemento.setAttribute("value",valor);
            divCamx.appendChild(elemento);
            divCamx.appendChild(tit);
            }
return divCamx;


}



function cargarSelectsNoDependientes(){
  for(var x=0;x<=cb.campos.length-1;x++){
     if(cb.campos[x].t=="select" && cb.campos[x].d==null && cb.campos[x].tablas!=null){
         oeid(cb.campos[x].nom).options.length=0;
        
         creaObjetoConsultaSimple(x);       
         enviarConsultaServidor("./php/buscar.php",creaObjetoConsultaSimple(x),cb.campos[x].nom);
      }
   }
}






function creaObjetoConsultaSimple(indice){
   var objetoConsulta={};
   var arregloTablas=[];
   objetoConsulta.campos=cb.campos[indice].tablas;
   for(var x=0;x<=objetoConsulta.campos.length-1;x++){
      if(arregloTablas.indexOf((objetoConsulta.campos[x].split("."))[0])==-1){
           arregloTablas.push((objetoConsulta.campos[x].split("."))[0]);}
   }
   objetoConsulta.tablas=extraerArregloDeObjeto(objetoConsulta,arregloTablas);
   return objetoConsulta;
   

 }
function setEventoTutores(){
  for(var x=0;x<=cb.campos.length-1;x++){
    if(cb.campos[x].d!=null && cb.campos[x].d=="s" && cb.campos[x].t=="select"){
      creset=false;
      console.log("el campo es "+cb.campos[x].tutor[0]); 
      crearObjetoDOM("","","","","",cb.campos[x].tutor[0],"onchange=poblarSelectesDep(this,"+x+")",null,"form-control");
   }

  }
 creset=true; 

}

function poblarSelectesDep(tutor,indice){
//alert(tutor.value);
 blanquearDescendencias(tutor);
  var arregloTablas=[];
  var objetoConsulta={};
  var cond = [];
  objetoConsulta.campos=cb.campos[indice].tablas;
  objetoConsulta.tablas=extraerArregloDeObjeto(objetoConsulta,arregloTablas);
  var vcond=cb.campos[indice].condiciones;
  // alert(tutor.value);
  for(var x=0;x<=vcond.length-1;x++){
  	 var mival=vcond[x];
//    if (mival.indexOf("= value")> -1){

    if (mival.indexOf("value)")> -1){
  //    mival=mival.replace("= value","="+tutor.value)
       mival=mival.replace("value)",tutor.value+")");
     // alert(cond[x]);
      cond.push(mival); 
}  
  else
    cond[x]=cond[x].replace("text)",tutor.options[tutor.selectedIndex].text+")");
}
  objetoConsulta.arrayANDOR=cb.campos[indice].arrayANDOR;
  objetoConsulta.condiciones=cond;//cb.campos[indice].cond//;iciones;
  console.log(JSON.stringify(objetoConsulta));
  enviarConsultaServidor("./php/buscar.php",objetoConsulta,cb.campos[indice].nom);

}



function configurarCamposHidden(){
   
   var boton;
   var textoHidden;
   for(var x=0;x<=cb.campos.length-1;x++){
    if(cb.campos[x].t=="hidden"){
       boton=crearObjetoDOM("button","button","Buscar","","","","onclick= mostrarDivBusqueda("+x+")");textoHidden=crearObjetoDOM("input","text","","","","",null,null,"form-control"); 
        if(botstp){
       	var arAtr=["class","data-toggle","data-target"];
       	var arVAtr=["btn btn-info btn-lg","modal","#myModal"];
        for(var y=0;y<=arAtr.length-1;y++){boton.setAttribute(arAtr[y],arVAtr[y]);}  
       }      
 

       oeid(cb.campos[x].nom).parentNode.appendChild(textoHidden);
       oeid(cb.campos[x].nom).parentNode.appendChild(boton); 
    }

  }



}

function obtenerIdCheck(o){
 var id=o.getAttribute("name");
 id=id.replace(".","\\.")
 var elch=document.querySelectorAll('[id='+id+']');
 for(var x=0;x<=elch.length-1;x++)elch[x].removeAttribute("id");
 o.setAttribute("id",id.replace("\\",""));
 //alert(o.value);
}




function formatobs(){



}





function oeid(id)
{
  var elemento=document.getElementById(id);
  return elemento;

}



function crearObjetoDOM(objeto,tipo,texto,textContent,estilo,id,evento,valor,clase,nombre){
    var objetoDOM;
   
   if(creset)
     objetoDOM=document.createElement(objeto);
   else
     objetoDOM=oeid(id); 

  if(objetoDOM!=null){
   if(tipo!=null)
      objetoDOM.setAttribute("type",tipo);
   if(texto!="")
      objetoDOM.appendChild(document.createTextNode(texto));
   if(textContent!="")
      objetoDOM.textContent=textContent;
    if(id!="")
      objetoDOM.setAttribute("id",id);
   if(estilo!="")
      objetoDOM.setAttribute("style",estilo);
   if(valor!=null)
      objetoDOM.setAttribute("value",valor);
   
   if(evento!=null)
      objetoDOM.setAttribute((evento.split("="))[0],(evento.split("="))[1]);
   if(clase!="")
      objetoDOM.setAttribute("class",clase);
   if(nombre!="")
      objetoDOM.setAttribute("name",nombre);
}
   return objetoDOM;
}



function ces(w,t,id,esDeBusqueda,indiceBusqueda,evento){
  var e= document.createElement(w);
  e.setAttribute("id",id);



  if(dependiente(indiceBusqueda)){
   
     
     e.setAttribute(evento,"esTutor=true;creaObjetoConsulta(this.getAttribute('indice'),this.getAttribute('evento'))");
     e.setAttribute("tutor","s");
     e.setAttribute("evento","s");
     e.setAttribute("indice",indiceBusqueda);
    
  }

 if(esDeBusqueda && w=="select"){ 
          creaObjetoConsulta(indiceBusqueda,"n");
          if(!esDependiente(id))
              enviarConsultaServidor("./php/buscar.php",creaObjetoConsulta(indiceBusqueda,"n"),id);}
  
 if(t!==""){   
     switch(t){case("t"): t="text";break;case("h"):t="hidden";default:break;}
     if(t!="select"){e.setAttribute("type",t);}
  }
     var divRegreso=document.createElement("div");
     divRegreso.setAttribute("style","display:flex;flex-direction:row");
     divRegreso.appendChild(e);
     return divRegreso;
}






function dependiente(i){
esDependiente=false;
 if(cb.campos[i]!=null){
   if(cb.campos[i].d!=null){esDependiente=true}else esDependiente=false;}
 return esDependiente;

}


 var arrIns=new Array();
 var arrUpd=new Array();






function guardarTM(nt){
          // alert("me llamas");

        //var dl=document.querySelectorAll(".partx")
    //  for(var x=0;x<=dl.length-1;x++){
    //    dl[x].setAttribute("id","xx");
     
    //  }


      cad=op.tablaPrincipal[0]+"\\.";
    //  alert(cad);
      var nt=document.querySelectorAll('[id^='+cad+']');
      //alert(nt)
    //  alert(nt);
      var oC={};
      var oTM={};
      for(var x=0;x<=nt.length-1;x++) 
      {
       //   nt[x].value="alba";
        //  alert(nt[x].value);
           Object.defineProperty(oTM, nt[x].id.replace(cad,""), {
                                           value:nt[x].value,
                                           enumerable: true});
         // alert(nt[x].value);
      }
       Object.defineProperty(oC,op.tablaPrincipal[0],{value:oTM,enumerable:true});
       arrIns.length=0;
       arrIns.push(oC);
       guardar();
    //  alert(JSON.stringify(oC));
 }




function guardarServidor(ruta,arreglo){
   console.log(JSON.stringify(arreglo,null,4));
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {  //console.log(this.responseText); 
  
  }
    };
    xmlhttp.open("POST", ruta, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("val="+JSON.stringify(arreglo,null,4)+"&md="+strObmd);
 
}





var obmd={};
var strObmd="";
var arrTD=new Array("detalleOfertas"); 
var arrIdD=new Array("ofertaId");
ismd="n";
  function md(){
    Object.defineProperty(obmd,"md",{value:ismd,enumerable:true,configurable: true});
    Object.defineProperty(obmd,"tm",{value:"colonias",enumerable:true,configurable: true});
    Object.defineProperty(obmd,"td",{value:arrTD,enumerable:true}); 
    Object.defineProperty(obmd,"cm",{value:"id",enumerable:true});
    Object.defineProperty(obmd,"cd",{value:arrIdD,enumerable:true});
    Object.defineProperty(obmd,"sm",{value:"",enumerable:true});
    Object.defineProperty(obmd,"gg",{value:"no",enumerable:true});
    strObmd=JSON.stringify(obmd,null,4); 
 

}



function guardar(){
  md();
  guardarServidor("php/insertar.php",arrIns);
}



function creaObjetoConsulta(indice,evento){
  var objetoConsulta={};
  var arregloCondiciones=[];
  objetoConsulta.campos=cb.campos[indice].tablas;
  objetoConsulta.tablas=extraerArregloSinPuntos(cb.campos[indice].tablas);
  var condicion=cb.campos[indice].condiciones[0];
  condicion=condicion.replace("like value"," like '%"+oeid("campoCaptura").value+"%'");
  //arregloCondiciones.push(cb.campos[indice].condiciones[0]+" '%"+oeid("campoCaptura").value+"%'");
  objetoConsulta.condiciones=[condicion];
 // alert(JSON.stringify(objetoConsulta));
  enviarConsultaServidor("./php/buscar.php",objetoConsulta,"tablaReceptora");
  return objetoConsulta;
}


function extraerArregloSinPuntos(arreglo,cu){
  var arregloAuxiliar=[];
  for(var x=0;x<=arreglo.length-1;x++){
    if(cu==null){
    if(arregloAuxiliar.indexOf((arreglo[x].split("."))[0])==-1){
        arregloAuxiliar.push((arreglo[x].split("."))[0]);
      }
     }
    else
      if(arregloAuxiliar.indexOf((arreglo[x].split("."))[1])==-1){
        arregloAuxiliar.push((arreglo[x].split("."))[1]);
      }
   }
  return arregloAuxiliar;
}



function extraerArregloDeObjeto(objeto,arreglo){
  for(var x=0;x<=objeto.campos.length-1;x++){
     if(arreglo.indexOf((objeto.campos[x].split("."))[0])==-1){
          arreglo.push((objeto.campos[x].split("."))[0]);
      }
  }
return arreglo;
}








function llenaSelect(indice){
 var objetoConsulta={};
 var arregloTablas=[];
 var arregloCampos=[];

objetoConsulta.campos=cb.campos[indice].tablas;

for(var x=0;x<=objetoConsulta.campos.length-1;x++){
    if(arregloTablas.indexOf((objetoConsulta.campos[x].split("."))[0])==-1){
    
        arregloTablas.push((objetoConsulta.campos[x].split("."))[0]);
      }
 }

objetoConsulta.tablas=arregloTablas;

}





function enviarConsultaServidor(ruta,objetoConsulta,w){
  
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
   if (this.readyState==4 && this.status == 200)


           if (this.readyState == 4 /*&& this.status == 200*/) {  //console.log(this.responseText); 
             console.log( "servidor "+this.response);
             var ob=JSON.parse(this.response);
             if(oeid(w) instanceof HTMLSelectElement)
                  llenarCombo(w,ob);
            
             if(w == "tablaReceptora"){creaTablaResultado(ob);} 

  }
    };
    xmlhttp.open("POST", ruta, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("objetoConsulta="+JSON.stringify(objetoConsulta,null,4));
 
}


function llenarCombo(idCombo,objeto)
 {
 
  var combo=oeid(idCombo);
  combo.options.length=0;
 console.log("llenando el combo "+idCombo + "-- con el objeto "+JSON.stringify(objeto));

  var opcion=document.createElement("option");
      opcion.value="-";
      opcion.text="Selecciona";
      
      combo.appendChild(opcion); 

  
  for(var x=0;x<=objeto.length-1;x++){
      var opcion=document.createElement("option");
      var valor=Object.values(objeto[x]);
      opcion.value=valor[0];
      opcion.text=valor[1];
      combo.appendChild(opcion); 

  }

}

function esDependiente(id){
   var res=false;
   var arrayCampos=cb.campos;
   for(var x=0;x<=arrayCampos.length-1;x++){
    if(arrayCampos[x].dependientes!=null){
       var arrDep=arrayCampos[x].dependientes;
        for(var y=0;y<=arrDep.length-1;y++){
           if(arrDep[y]==id)res=true;
        }

 
   }
 }
return res;
}

function apCh(cont,suc){
  cont.appendChild(suc);

}

function mostrarDivBusqueda(indice){
 indiceBusquedaActivo=indice;
 //campos=cb.campos[indice].titulosCriteria;
 //llenarComboBox(oeid("selectCampos"),null,campos) 
 oeid("divBusqueda").style.display="flex";

}




function llenarComboBox(select,arrValores,arrText){
 
 var option=document.createElement("option");
 select.options.length=0;
 option.value="";
 option.text="Selecciona";
 select.appendChild(option);
 for(var x=0;x<=arrText.length-1;x++){
    option=document.createElement("option");
    if(arrValores!=null)
       option.value=arrValores[x];
    else
        option.value=x;   
    option.text=arrText[x];
    select.appendChild(option);
 }
}












function crearDivBusqueda(){
 var dc=crearObjetoDOM("div","","","","width:70%;margin:auto;background-color:blue;color:white;font-wight:bold;display:none;width:80%;position:fixeds;top:0;flex-direction:column;margin:auto","divBusqueda");
 var titDiv=crearObjetoDOM("p","","Busqueda","","margin-auto:font-size:20px;display:flex;justify-content:center","");
 
 var textoCerrar=crearObjetoDOM("label","","x","","font-size:20px;margin-left:auto;cursor:pointer;padding-right:2%","divBusqueda","onclick=cerrarDV(this)");
 var divFilaBuscar=crearObjetoDOM("div","","","","display:flex;width:90%;flex-direction:row;justify-content:center","divBusquedas");
 var etTit=crearObjetoDOM("label","","Capturar campo","","margin-right:10px","lbldb");
 var campoCaptura=crearObjetoDOM("input","text","","","margin-right:10px;color:black","campoCaptura");
 var botonBusqueda=crearObjetoDOM("input","button","Buscar","","","botonCriteria","onclick=crearConsultaCriteria();","Buscar");
 var divResultado=crearObjetoDOM("div","","Resultado:","","","divResultado");
 apCh(dc,titDiv);
 apCh(dc,textoCerrar);
 apCh(dc,divFilaBuscar);
 apCh(divFilaBuscar,etTit);
 apCh(divFilaBuscar,campoCaptura);
 apCh(divFilaBuscar,botonBusqueda);
 apCh(dc,divFilaBuscar);
 var tr=crearObjetoDOM("div","","Tabla receptora","","margin:auto;margin-top:10px","tablaReceptora");
 apCh(dc,tr);
 oeid("mimodal").appendChild(dc);


}

function cerrarDV(o){
o.parentNode.style.display='none'

}

function creaTablaResultado(ob){
 var divResultado;
 var id;
 var descVis;

 for(var x=0;x<=ob.length-1;x++){
   divResultado=crearObjetoDOM("div","","","","display:flex;flex-direction:row;cursor:pointer","fila");
   
 
   for(var y=0;y<=Object.keys(ob[x]).length-1;y++){

       if(Object.keys(ob[x])[y]==cb.campos[indiceBusquedaActivo].campoId){
         id=Object.values(ob[x])[y];
      
        }
      if(Object.keys(ob[x])[y]==cb.campos[indiceBusquedaActivo].descVis){
         descVis=Object.values(ob[x])[y];
        
      
        }
       var divColumnita=crearObjetoDOM("div","","","","display:flex;flex-direction:column","fila");
       divColumnita.appendChild(document.createTextNode(Object.values(ob[x])[y]));
            //alert(Object.keys(ob[x])[0]);
         apCh(divResultado,divColumnita);
       
  }  
 divResultado.setAttribute("onclick","setIdResultado("+id+",'"+descVis+"')");
  apCh(oeid("tablaReceptora"),divResultado);
  }


}

function crearConsultaCriteria(){
  
  esTutor=false;
creaObjetoConsulta(indiceBusquedaActivo,"s");

}

function setIdResultado(id,desc){
 var campoResultado=cb.campos[indiceBusquedaActivo].nom;
 oeid(campoResultado).value=id;
 oeid(campoResultado).nextSibling.value=desc;
}

function blanquearDescendencia(indice){
 var campoRetono;
if(cb.campos[indice].tutor!=null){

    if(campoRetono=cb.campos[indice].dependientes!=null){
    campoRetono=cb.campos[indice].dependientes[0];
  //  alert("el campoRetono es " + campoRetono);
    oeid(campoRetono).options.length=0;
    for(var x=0;x<cb.campos.length;x++){if(cb.campos[x].nom==campoRetono){indice=x;break;}}
  
  blanquearDescendencia(indice);
 } 
}
}


function blanquearDescendencias(o){

var id=o.getAttribute("id");

for(var x=0;x<=cb.campos.length-1;x++){
  if(cb.campos[x].tutor==id){
     oeid(cb.campos[x].nom).length=0;
     blanquearDescendencias(oeid(cb.campos[x].nom));

  }


}

}








function indexMatchingText(ele, text) {
    for (var i=0; i<ele.length;i++) {
        if (ele[i].childNodes[0].nodeValue === text){
            return i;
        }
    }
    return undefined;
}


