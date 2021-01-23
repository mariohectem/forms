//enviarConsultaMetadata("./php/metadatos.php","{'metadata':['tablas']}","");

var objetoMeta={"metadata":["tablas"]};
var op={"tablaPrincipal":[]};
enviarConsultaMetadata();
var tablaActual;
var divTablas;
var divCampos;
var arregloNodos=["select","input","textArea","hidden","radio"];
var arregloNodosv=["s","t","a","h","r"];
var i=0;
var actualp=0;
var actualc="";
var tablasCondCargadas=false;
var arrTablasCond=[];
var arrCamposCond=[];
var arrOperadores=["=",">","<","like",">=","<="];
var arr=["value","text"]; 
var arrAO=["AND","OR"];
var arrLibreForm=["Libre","Formulario"] 
var acthiddid=-1;
var acthidddesc=-1;


var selhiddid=-1;
var selhidddesc=-1;
var condCont=0;
var condActual;  
var triggerCampo=false;
var campoTrigger="";

//var arrTrs=[];
var arrCmps=[];



oeid("selectHTML").setAttribute("onclick",'agregarParticipantes(this.options[this.selectedIndex].text,false)');


function llenarSelectsCondiciones(){
   
   llenarComboBox(oeid("selectOperadores"+condCont),null,arrOperadores);
   llenarComboBox(oeid("selectValueText"+condCont),null,arr);
   llenarComboBox(oeid("selectANDOR"),arrAO,arrAO);
   llenarComboBox(oeid("selectLibreForm"),null,arrLibreForm);
  //  condCont++;
}
llenarComboBox(oeid("selectHTML"),arregloNodosv,arregloNodos);
llenarSelectsCondiciones();

var cb='{"campos":[]}';
var cb = JSON.parse(cb);

 //crearObjetoDOM(objeto,tipo,texto,textContent,estilo,id,evento,valor,clase)

function enviarConsultaMetadata(){
   // alert(arrCmps+" "+ccc);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
   if (this.readyState==4 && this.status == 200){
         console.log(this.responseText);
         var ob=JSON.parse(this.response);
         console.log(JSON.stringify(ob));
         var nb=true;
          
         if(objetoMeta.metadata[0]=="tablas"){
           var dchks=crearObjetoDOM("div","","","","display:flex;flex-direction:column");           
           for(var x=0;x<=ob.length-1;x++){console.log(ob[x].t);
                oeid("divTablas").appendChild(crearObjetoDOM("div","",ob[x].t,"","",ob[x].t,"onclick=obtenerCampos(this)",null,"tbls"));
                oeid("divTablasGuardar").appendChild(crearObjetoDOM("input","checkbox","","","","chkg"+x,null,null,"chkguardar"));
                oeid("divTablasBusqueda").appendChild(crearObjetoDOM("div","",ob[x].t,"","",ob[x].t,"onclick=obtenerCampos(this)",null));
                //oeid("divCondTablas").appendChild(crearObjetoDOM("div","",ob[x].t,"","",ob[x].t,"onclick=obtenerCampos(this)",null));
                clean(oeid("divTablasBusqueda").parentNode);
               // oeid("divTablasBusqueda").previousSibling.appendChild(dchks);
  
                dchks.appendChild(crearObjetoDOM("input","checkbox")); 
                if(!tablasCondCargadas){
                   arrTablasCond.push(ob[x].t);
                }                      

            }
            if(!tablasCondCargadas){
                   llenarComboBox(oeid("selectCondTablas0"),null,arrTablasCond);
            } 
            //oeid("divTablasBusqueda").lastChild.setAttribute("id","divTablasa");
         }
         else{
        
            arrCamposCond=[];
            for(var x=0;x<=ob.length-1;x++){
               if(divCampos=="divCamposa"){
                  oeid(divCampos).appendChild(crearObjetoDOM("div","",ob[x].f,"","","","onclick=agregarCamposb(this,true,true)",null));
                  oeid(divCampos).lastChild.setAttribute("tabla",tablaActual);
               }
               if(divCampos=="divCampos"){
                  oeid(divCampos).appendChild(crearObjetoDOM("div","",ob[x].f,"","","","onclick=agregarParticipantes(this,true)",null));
                  oeid(divCampos).lastChild.setAttribute("tabla",tablaActual);
              }
              if(divCampos=="divCondCampos"){
                   arrCamposCond.push(ob[x].f);
                             
                   
               }
               
              }
             if(divCampos=="divCondCampos"){
                 llenarComboBox(oeid("selectCondCampos"+(condActual)),null,arrCamposCond);
                 if(triggerCampo==true){
                    oeid("selectCondCampos"+(condActual)).selectedIndex=indexMatchingText(oeid("selectCondCampos"+(condActual)),arrCmps[condActual]);
                 }
             }
     }
  }
    };
    xmlhttp.open("POST", "./php/metadatos.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("objetoConsulta="+JSON.stringify(objetoMeta,null,4));
 
}




function obtenerCampos(t){
  c=t.lastChild.data;
  objetoMeta={metadata:[c]};
 
  tablaActual=t.id;
  divTablas=t.parentNode.id;
 
  switch(divTablas){
     case("divTablas"): divCampos="divCampos";removeAllChildNodes(oeid("divCampos"));break;
     case("divTablasBusqueda"):
        divCampos="divCamposa";
      //  removeAllChildNodes(oeid("divchkcompsa"));
        removeAllChildNodes(oeid("divCamposa")); 
        //oeid("selectCondTablas").selectedIndex=indexMatchingText(oeid("selectCondTablas"),tablaActual);
        //obtenerCamposDeCondiciones(oeid("selectCondTablas"));
        break;
     default: break;
  }
 
 enviarConsultaMetadata();
}

function obtenerCamposDeCondiciones(o){
     var id=o.getAttribute("id");
     c=o.options[o.selectedIndex].text;
     objetoMeta={metadata:[c]};
     divTablas=o.parentNode.id;
     tablaActual=c;
     divCampos="divCondCampos";
    // condActual=id.substring(id.length-1,id.length);
     condActual=id.replace("selectCondTablas","");
    //alert(condActual);  
     llenarComboHtmls();
     enviarConsultaMetadata();

}



function agregarCamposb(t,deTabla,yv){
  //alert("me llega "+t);
  if(yv)
     idv=t.getAttribute("tabla")+"."+t.lastChild.data;
  else
    idv=t.lastChild.data;

  acthiddid++;
  acthidddesc++
  oeid("divCamposb").appendChild(document.createElement("div"));
  oeid("divCamposb").lastChild.appendChild(crearObjetoDOM("input","text","","","",idv,null,idv,"camposb"));
  if((document.querySelectorAll(".selx"))[actualc]!=null)
  {
     var selx=(document.querySelectorAll(".selx"))[actualc];
     if(selx.options[selx.selectedIndex].text=="hidden"){
        oeid("divhiddid").appendChild(crearObjetoDOM("input","radio","","","","rdhiddid"+acthiddid,"onclick=selHiddid(this)",null,"","rdhiddid","rdhiddid"));
        oeid("divhidddesc").appendChild(crearObjetoDOM("input","radio","","","","rdhidddesc"+acthidddesc,"onclick=selHidddesc(this)",null,"rdhidddesc","rdhidddesc"));
     }
  }
}
function poblaCondCampos(o){
 




}


function agregarParticipantes(t,deTabla){
 
 if((t.parentNode!=null && t.parentNode.id=="divCampos") || !deTabla){
  
   var idv;
   oeid("divParticipantes").appendChild(document.createElement("div"));
   if(deTabla){
      idv=t.getAttribute("tabla")+"."+t.lastChild.data;
      oeid("divParticipantes").lastChild.appendChild(crearObjetoDOM("input","text","","","",idv,null,idv,"partx"));
    }
    else{c=crearObjetoDOM("input","text","","","","","onblur=setIdpartx(this)",null,"partx");
          oeid("divParticipantes").lastChild.appendChild(c);}
     

  oeid("divEtiquetas").appendChild(crearObjetoDOM("div"));
  oeid("divEtiquetas").lastChild.appendChild(crearObjetoDOM("input","text","","","","",null,null,"etx"));
 
  oeid("divTipoNodo").appendChild(crearObjetoDOM("div"));
  oeid("divTipoNodo").lastChild.appendChild(crearObjetoDOM("select","","","","","",null,null,"selx"));

 
  llenarComboBox(oeid("divTipoNodo").lastChild.lastChild,arregloNodosv,arregloNodos);

  if(!deTabla)oeid("divTipoNodo").lastChild.lastChild.selectedIndex=indexMatchingText(oeid("selectHTML"),t); 

 
 
  oeid("divBtncb").appendChild(crearObjetoDOM("div"));
  oeid("divBtncb").lastChild.appendChild(crearObjetoDOM("button","","Configurar","","","btncbx"+actualp,"onclick=htmlDesdeJson(this)",null,"btncbx"));

  actualp++;

}

}



function crearObjetoPagina(){
  op={};
  
 //var tablaPrincipal=(document.querySelectorAll(".partx"))[0]//.split("."))[0];
 // var tablaPrincipal="colonias";
//  tablaPrincipal=(tablaPrincipal.value.split("."))[0];
 // if(op.tablaPrincipal==null){
 //    var tablaPrincipals=[];tablaPrincipals.push(tablaPrincipal);
 //    op.tablaPrincipal=tablaPrincipals;
 // }
 // else
  //    op.tablaPrincipal.push(tablaPrincipal);
  //alert("la tabla principal es "+op.tablaPrincipal);


  //op.
  obtenerTablasAGuardar();
  acx=[".etx",".partx"]
  acxi=[".selx",".checkx"]; 
  aopx=["etiquetas","campos"];
  aopxi=["tipoInputs","camposBusqueda"]; 
  var arv=new Array();
  for(i=0;i<=acx.length-1;i++){  
    arv=[]; 
    var ar=document.querySelectorAll(acx[i]);  
    for(var j=0;j<=ar.length-1;j++){
       if(i==0){if(ar[j].getAttribute("lbvl")!=null){ar[j].value=ar[j].getAttribute("lbvl");}}
       arv.push(ar[j].value);
       

    }
         op[aopx[i]]=arv;
  }
   
  ar=document.querySelectorAll(".selx");  
  arv=[];
  for(var j=0;j<=ar.length-1;j++){
       arv.push(ar[j].value);
  }
  op["tipoInputs"]=arv;
  ar=document.querySelectorAll(".checkx");
                                  
  arv=[];

  for(var j=0;j<=ar.length-1;j++){
      //alert(ar[j].checked);
      if(ar[j].checked){arv.push("1")}
      else arv.push("0");
     
  }
 op["camposBusqueda"]=arv;
 op.divCont="divColonias"; 
 crearFormulario();
 //cargarSelectsNoDependientes();
 setEventoTutores();
 configurarCamposHidden();
 //oeid("json").value=JSON.stringify(op);


 oeid("json").value=JSON.stringify(op);
 oeid("btnj").value=JSON.stringify(op);
 oeid("btnj2").value=JSON.stringify(cb);

 oeid("json").value=JSON.stringify(op)+" "+JSON.stringify(cb);
 oeid("json").style.display="block";
 
}







function clean(node)
{
  for(var n = 0; n < node.childNodes.length; n ++)
  {
    var child = node.childNodes[n];
    if
    (
      child.nodeType === 8 
      || 
      (child.nodeType === 3 && !/\S/.test(child.nodeValue))
    )
    { node.removeChild(child);
      n --;
    }
    else if(child.nodeType === 1)
    {
      clean(child);
    }
  }
}




function elementoBusqueda(t){
          // alert("me llamas");
      var oC={};
      var oTM={};
      for(var x=0;x<=nt.length-1;x++) 
      {
       //   nt[x].value="alba";
           Object.defineProperty(oTM, nt[x].id.replace(cad,""), {
                                           value:nt[x].value,
                                           enumerable: true});
      }
       Object.defineProperty(oC,op.tablaPrincipal[0],{value:oTM,enumerable:true});
      
 }



function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}





function reconfigurarCondicionesHidden(x){
   var arr=extraerArregloSinPuntos(cb.campos[x].condiciones);
   oeid("selectCondTablas"+x).selectedIndex=indexMatchingText(oeid("selectCondTablas"+x),arr[0]);   


   obtenerCamposDeCondiciones(oeid("selectCondTablas"));
   arr=extraerArregloSinPuntos(cb.campos[x].condiciones,"u");
   oeid("selectCondCampos").selectedIndex=indexMatchingText(oeid("selectCondCampos"),arr[0]); 
   oeid("selectHtmls").selectedIndex=indexMatchingText(oeid("selectHtmls"),arr[0]); 
   opcx=cb.campos[x];
   
   for(var y=0;y<=arrOperadores.length-1;y++){
    if(opcx.indexOf(arrOperadores[y]+"value")>-1 ||opcx.indexOf(arrOperadores[y]+"text")>1){
         oeid("selectOperadores").selectedIndex=indexMatchingText(oeid("selectOperadores"),arrOperadores[y]);
         break;}}


  for(var y=0;y<=arrOperadores.length-1;y++){
    if(opcx.indexOf(arrOperadores[y]+"value")>-1){     
         oeid("selectValueText").selectedIndex=indexMatchingText(oeid("selectValueText"),"Value");
         break;}
     if(opcx.indexOf(arrOperadores[y]+"text")>-1){     
         oeid("selectValueText").selectedIndex=indexMatchingText(oeid("selectValueText"),"Text");
         break;}}


  
   
}

function llenarComboHtmls(){
 var arrHtmls=[]; 
 var parts=document.querySelectorAll(".partx");
 for(var x=0;x<=parts.length-1;x++){
   arrHtmls.push(parts[x].value);
 } 
 
 llenarComboBox(oeid("selectHtmls"+condActual),null,arrHtmls);
  agregarOption(oeid("selectHtmls"+condActual),null,"campoCaptura",true);

}

function reiniciarSelectsCondiciones(){
 var s=document.querySelectorAll("scond");
 for(var x=0;x<=s.length-1;x++){
   s[x].selectedIndex=0;
 }
}
function obtenerHiddid(o){
  return(o.getAttribute("id").replace("acthiddid",""));

}
function obtenerHidddesc(o){
  return(o.getAttribute("id").replace("acthidddesc",""));

}

function selHiddid(o){
  
  selhiddid=o.getAttribute("id").replace("rdhiddid","");
//alert(selhiddid);

}
function selHidddesc(o){
  selhidddesc=o.getAttribute("id").replace("rdhidddesc","");

}




function agregarOption(s,v,t,a){
 var o=document.createElement("option");
 o.text=t; 
 if(v==null && a){
   var l=s.options.length;
   o.value=l;
 }
 else
  o.value=v;
  s.appendChild(o);
}

function obtenerTablasAGuardar(){
  chkstg=document.querySelectorAll(".chkguardar");
  op.tablaPrincipal=[]
  for(var x=0;x<=chkstg.length-1;x++){
   if(chkstg[x].checked==true)
     op.tablaPrincipal.push(((document.querySelectorAll(".tbls"))[x]).getAttribute("id"));

  }


}

function agregarCondicion(){
 
  var tc=oeid("selectLibreForm");
  tc=tc.options[tc.selectedIndex].text;
  if(document.querySelectorAll(".ccond").length>0)
     oeid("divPurasCondiciones").appendChild(crearObjetoDOM("div","","",oeid("selectANDOR").value,"","",null,null,"aor"));
  
  if(tc=="Formulario"){
    
    if(condCont==0){
         oeid("divPurasCondiciones").appendChild(oeid("divCondiciones").cloneNode(true));
         
         clean(oeid("divMoldeCondiciones"));
         oeid("divMoldeCondiciones").removeChild(oeid("divMoldeCondiciones").childNodes[0]);   
         oeid("divPurasCondiciones").lastChild.setAttribute("class","ccond f r"); 
         console.log("poniendo la clase");
         clean(oeid("divCondiciones"));
    }
    else{    
       oeid("divPurasCondiciones").appendChild(oeid("divCondiciones").cloneNode(true));
       var node=oeid("divPurasCondiciones").lastChild;
       if(node.getAttribute("id")=="divCondiciones"){      
           for(var n = 0; n <= node.childNodes.length-1; n ++){
               var child = node.childNodes[n]; 
               for(var m = 0; m <= child.childNodes.length-1; m++){
                  var childjr = child.childNodes[m]; 
                  var id=childjr.getAttribute("id");
                  id=id.substring(0,id.length-1);
                  if(childjr.getAttribute("class")=="scond"){childjr.setAttribute("id",id+condCont);}
               }
            }
         }
    }
    condCont++; 
 //  ccc++;     
   }
   else
   {
                  oeid("divPurasCondiciones").appendChild(crearObjetoDOM("div"));   
                  oeid("divPurasCondiciones").lastChild.appendChild(crearObjetoDOM("input","text","","","","",null,null,"ccond")); 
   }

}


function obtenerIndiceObjeto(nompart){
  var ret=-1;
  for(var x=0;x<=cb.campos.length-1;x++){
    if(cb.campos[x].nom==nompart){
      ret=x;
      break; 
    }

  }
 return ret;

}

function configurarCampoBusqueda(){
//alert(actualc+"mira el valor "+(document.querySelectorAll(".partx"))[actualc]).nodeType;
 //if(((document.querySelectorAll(".partx"))[actualc])!=null)
  // delete cb[((document.querySelectorAll(".partx"))[actualc]).id];


//const index = cb.campos.findIndex(x => x.nom === ((document.querySelectorAll(".partx"))[actualc]).id);

//if (index !== undefined) cb.campos.splice(index, 1);

//console.log("After removal:", cb.campos);

var indice=obtenerIndiceObjeto(((document.querySelectorAll(".partx"))[actualc]).id); 
if (indice > -1)
  cb.campos.splice(indice, 1);

var objob={}; 
 





 var obx =(document.querySelectorAll(".partx"))[actualc];  
//alert(obx.id);
 objob.nom=obx.id;
 
 var tipo=(document.querySelectorAll(".selx"))[actualc];
 tipo=tipo.options[tipo.selectedIndex].text;
 objob.t=tipo;
 
 var acb=document.querySelectorAll(".camposb");
 var tablas=[];
 for(var x=0;x<=acb.length-1;x++){tablas.push(acb[x].value);}
 objob.tablas=tablas;


 var tutores=document.querySelectorAll('[id^=selectHtmls]');
 var arrTutores=[];

 var d;

 var condiciones=[];

 for(var x=0;x<=tutores.length-1;x++){
  if(tutores[x].selectedIndex > 0 || tipo=="hidden"){
      arrTutores.push(tutores[x].options[tutores[x].selectedIndex].text);
    
 }}

  var t;
  var cond=document.querySelectorAll(".ccond");
 // alert(oeid("divMoldeCondiciones").childNodes.length);
  //alert(cond.length);
  if (cond.length > 0 && (oeid("divMoldeCondiciones").childNodes.length==0))
     d="s";
  var paracond=-1;
  for(var x=0;x<=cond.length-1;x++){
   if(cond[x].tagName.indexOf("DIV") >-1 || cond[x].tagName.indexOf("div")>-1)
   {
     t="f";
     paracond++;
     condiciones.push(crearCondiciones(paracond,t));
   }
   else{
     t="l"
     condiciones.push(crearCondiciones(x,t));
   }

 }


  objob.tutor=[];
  objob.condiciones=[];
  if(d=="s"){objob.d="s";objob.tutor=arrTutores;}
  if(cond.length > 0)objob.condiciones=condiciones;  
  
  objob.arrayANDOR=[];
  var obsANDOR=document.querySelectorAll(".aor");


  for(var x=0;x<=obsANDOR.length-1;x++){
 //  alert(obsANDOR[x].lastChild.data +"---"+obsANDOR[x]);
    objob.arrayANDOR.push(obsANDOR[x].lastChild.data);

  }
  
  
  
  if(selhiddid >-1){
        objob.campoId=((document.querySelectorAll(".camposb"))[selhiddid]).value;
        objob.descVis=((document.querySelectorAll(".camposb"))[selhidddesc]).value;
   }


  var tcond=[];
  var arrtc=document.querySelectorAll(".ccond");
                                       
  console.log("ddd" +arrtc.length);
  for(var x=0;x<=arrtc.length-1;x++){
     console.log(arrtc[x].nodeName);
     if(arrtc[x].nodeName=="INPUT" || arrtc[x].nodeName=="input")
       tcond.push("l")
     else
       tcond.push("f")

  }
 
  objob.tcond=[];
  objob.tcond=tcond;
  cb.campos.push(objob);
  
  reiniciarSelectsCondiciones();
  removeAllChildNodes(oeid("divhidddesc"));
  removeAllChildNodes(oeid("divhiddid"));
  removeAllChildNodes(oeid("divCamposb"));
  clean(oeid("divMoldeCondiciones"));
 
  if(oeid("divMoldeCondiciones").childNodes.length==0){
     oeid("divMoldeCondiciones").appendChild(oeid("divCondiciones"));
     oeid("divMoldeCondiciones").lastChild.removeAttribute("class");
   }
   

  removeAllChildNodes(oeid("divPurasCondiciones"));
  selhiddid=-1;
  selhidddesc=-1;
  condCont=0;
  acthiddid=-1;
  acthidddesc=-1;

  abrirCerrarModal(oeid("lblcp"),0);


  oeid("json").value=JSON.stringify(cb);
}
function crearCondiciones(x,t){
 var condicion;
 if(t=="f")
 {
 	var tabla=oeid("selectCondTablas"+x).options[oeid("selectCondTablas"+x).selectedIndex].text;
  	var campo=oeid("selectCondCampos"+x).options[oeid("selectCondCampos"+x).selectedIndex].text;
  	var operador=oeid("selectOperadores"+x).options[oeid("selectOperadores"+x).selectedIndex].text;
  	var htmls=oeid("selectHtmls"+x).options[oeid("selectHtmls"+x).selectedIndex].text;
  	var tipopar=oeid("selectValueText"+x).options[oeid("selectValueText"+x).selectedIndex].text;
  	if(tipopar!="value")
       		tipopar="text";
 
        condicion="(" +tabla +"."+campo+" "+operador+" "+tipopar+")";
  }
  else
    condicion="("+(document.querySelectorAll(".ccond"))[x].value+")";
   //alert(condicion);
   return condicion;
   
 }


function htmlDesdeJson(b){
  condCont=0;
  triggerCampo=false;
  campoTrigger="";
  actualc=b.getAttribute("id").replace("btncbx","");
  var t=((document.querySelectorAll(".selx"))[actualc]).value;
  if(((document.querySelectorAll(".partx"))[actualc]).value!=""){
  	if(t=="r")abrirCerrarModal(oeid("lblcr"),1);
  	if(t=="s" || t=="h")abrirCerrarModal(oeid("lblcp"),1);
  }
  else{
    alert("Falta id del campo");
  }
  //alert(((document.querySelectorAll(".partx"))[0]).getAttribute("id"));
  var partx=(document.querySelectorAll(".partx"))[actualc];
  removeAllChildNodes(oeid("divCamposb"));
  partx=partx.id;
  if(cb.campos!=null){
    for(var x=0;x<=cb.campos.length-1;x++){
       if(cb.campos[x].nom==partx){
         //campos de busqueda
           for(var y=0;y<=cb.campos[x].tablas.length-1;y++){

             var div=crearObjetoDOM("div");
             div.appendChild(document.createTextNode(cb.campos[x].tablas[y]));
             agregarCamposb(div,false,false);
             
               if(cb.campos[x].t="hidden"){
                  acthiddid++;
                  acthidddesc++;
                  if(cb.campos[x].campoId!=null){
                     if(cb.campos[x].campoId==cb.campos[x].tablas[y]){oeid("divhiddid").lastChild.checked=true; selhiddid=y;}
                     if(cb.campos[x].descVis==cb.campos[x].tablas[y]){oeid("divhidddesc").lastChild.checked=true;selhidddesc=y;}
                  }} 

            }
         //fin campos busqueda

         //condiciones
         if(cb.campos[x].tcond!=null){

          var arrtcond=cb.campos[x].tcond;
          var ccc=-1;

         for(var y=0;y<=arrtcond.length-1;y++){

           if(arrtcond[y]=="l")
                oeid("selectLibreForm").selectedIndex=indexMatchingText(oeid("selectLibreForm"),"Libre")
           else   
               oeid("selectLibreForm").selectedIndex=indexMatchingText(oeid("selectLibreForm"),"Formulario")
          
          
        if(y< arrtcond.length-1)
           oeid("selectANDOR").selectedIndex=indexMatchingText(oeid("selectANDOR"),cb.campos[x].arrayANDOR[y]);
          
           agregarCondicion();
           if (arrtcond[y]=="l"){
              (document.querySelectorAll(".ccond"))[y].value=cb.campos[x].condiciones[y];

           }
           else{
              ccc++;
              var condicion=cb.campos[x].condiciones[y];
              var tbl=(condicion.split("."))[0];
              tbl=tbl.substring(1,tbl.length);
              var campo=(condicion.split(" "))[0];
              campo=(campo.split("."))[1];
              campo=campo.substring(0,campo.length);
              //arrCmps.push(campo);
              oeid("selectCondTablas"+(condCont-1)).selectedIndex=indexMatchingText(oeid("selectCondTablas"+(condCont-1)),tbl);
              campoTrigger=campo;
              triggerCampo=true;

            
              arrCmps.push(campo);
              obtenerCamposDeCondiciones(oeid("selectCondTablas"+(condCont-1)),condCont);
             //obtenerCamposDeCondiciones(oeid("selectCondTablas"+(ccc)),ccc);


              var op=((condicion.replace("value","").replace("text","").replace(")","")).split(" "))[1];
              oeid("selectOperadores"+(condCont-1)).selectedIndex=indexMatchingText(oeid("selectOperadores"+(condCont-1)),op); 
              oeid("selectOperadores"+(condCont-1)).selectedIndex=indexMatchingText(oeid("selectOperadores"+(condCont-1)),op);
              oeid("selectHtmls"+(condCont-1)).selectedIndex=indexMatchingText(oeid("selectHtmls"+(condCont-1)),cb.campos[x].tutor[condCont-1]);
              var valt=((condicion.split(" "))[2]).replace(")","");
             // console.log("valt vale " +valt);
              oeid("selectValueText"+(condCont-1)).selectedIndex=indexMatchingText(oeid("selectValueText"+(condCont-1)),valt);
             
              
           }

        }

         }




           for(var y=0;y<=cb.campos[x].condiciones.length-1;y++){
             // condicionesJSONtoHTML(y);
                  // "arrayANDOR":["AND"],"tcond":["f","l"]
         


            }



         //fin de condiciones


       }}



  }


}
function reconfigurarCondicionesHidden(x){
   var arr=extraerArregloSinPuntos(cb.campos[x].condiciones);
   oeid("selectCondTablas"+x).selectedIndex=indexMatchingText(oeid("selectCondTablas"+x),arr[0]);   


   obtenerCamposDeCondiciones(oeid("selectCondTablas"));
   arr=extraerArregloSinPuntos(cb.campos[x].condiciones,"u");
   oeid("selectCondCampos").selectedIndex=indexMatchingText(oeid("selectCondCampos"),arr[0]); 
   oeid("selectHtmls").selectedIndex=indexMatchingText(oeid("selectHtmls"),arr[0]); 
   opcx=cb.campos[x];
   
   for(var y=0;y<=arrOperadores.length-1;y++){
    if(opcx.indexOf(arrOperadores[y]+"value")>-1 ||opcx.indexOf(arrOperadores[y]+"text")>1){
         oeid("selectOperadores").selectedIndex=indexMatchingText(oeid("selectOperadores"),arrOperadores[y]);
         break;}}


  for(var y=0;y<=arrOperadores.length-1;y++){
    if(opcx.indexOf(arrOperadores[y]+"value")>-1){     
         oeid("selectValueText").selectedIndex=indexMatchingText(oeid("selectValueText"),"Value");
         break;}
     if(opcx.indexOf(arrOperadores[y]+"text")>-1){     
         oeid("selectValueText").selectedIndex=indexMatchingText(oeid("selectValueText"),"Text");
         break;}}


  
   
}



function condicionesJSONtoHTML(y){
   var arr=extraerArregloSinPuntos(cb.campos[y].condiciones);



}







function actct()
{
  triggerCampo=false;
}



function addRdsConf(){

  oeid("lblsRd0").appendChild(oeid("lblrd0").cloneNode(true));
  oeid("divsRd0").appendChild(oeid("txtrd0").cloneNode(true));
  oeid("lblsRd0").lastChild.value="";
  oeid("divsRd0").lastChild.value="";
 
 
}

function setVlsrds(){
  var actlbl=(document.querySelectorAll(".etx"))[actualc];
  var cadlbl="";
  var cadtxt="";
  var lbls=document.querySelectorAll(".lblrd");
  var txts=document.querySelectorAll(".txtrd");
  for(var x=0;x<=lbls.length-1;x++){cadlbl+=lbls[x].value+"^";}
 // alert(cadlbl)
  
  for(var x=0;x<=txts.length-1;x++){cadtxt+=txts[x].value+"°";}
    actlbl.setAttribute("lbvl",actlbl.value+"|"+cadlbl.slice(0, -1)+"|"+cadtxt.slice(0, -1));
   abrirCerrarModal(oeid("lblcr"),0);
  
 
  //actlbl.value=cadlbl.slice(0, -1)+"|"+cadtxt.slice(0, -1);


}
function setIdpartx(o){
 o.id=o.value;

 console.log(o);


}


function abrirCerrarModal(m,a){
 if(a==0)
  m.parentNode.style.display="none";
 else
  m.parentNode.style.display="block";
}





/*var confBusq='{"campos":['+
'{"nom":"col°estatus","t":"select","tablas":["estatus.id","estatus.nombre"]}'+
',{"nom":"col°estado","t":"select","tablas":["estados.id","estados.nombre"],"tutor":"s","dependientes":["col°municipio"],"evento":"onchange"}'+
',{"nom":"col°municipio","t":"select","tablas":["municipios.id","municipios.nombre"],"condiciones":["municipios.estado"]}'+
',{"nom":"col°vecinos","t":"hidden","tablas":["vecinos.id","vecinos.animo","vecinos.descripcion"],"condiciones":["vecinos.descripcion like"],'+
'"camposCriteria":["vecinos.animo,vecinos.descripcion"],"campoId":"vecinos.id","descVis":"vecinos.descripcion",'+
'"titulosCriteria":["Estado de animo","Descripcion"]'+

'}'+

']}';*/