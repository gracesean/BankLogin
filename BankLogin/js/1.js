//----------- VARIABLES --------------
var pads=document.getElementsByClassName("pad");
var input=document.getElementById("login");
var pins=document.getElementsByClassName('pin');
var celdas=document.getElementById('celdaspin');
var z=0;
var pin=[];
var pinpos=[];
var id;
var realpin;
var verifycode=false;
var verifypin=false;
var contpads;
var l;
var p;
var login='{"clienteId-04563":{"code":"261533-9","pin":849371},"clienteId-09392":{"code":"939154-1","pin":913597},"clienteId-03463":{"code":"004967-1","pin":465625},"clienteId-25967":{"code":"576369-0","pin":676357},"clienteId-15045":{"code":"000000-1","pin":111111},"clienteId-74045":{"code":"211281-7","pin":211281}}';
var aceptar = document.getElementById("aceptar");
var del = document.getElementById("borrar");
var perror=document.getElementById("errorid");  // CAMPO ADVERTENCIAS 
var idinput=document.getElementById("input1"); //IDENTIFICADOR
idinput.addEventListener("keyup",function(){check()}); // gestión de evento para IDENTIFICADOR.
del.onclick = function() {borrado()};
borrado();

//---------- FUNCIONES -------------------

//funcion que comprueba sintaxis, digito comprobador y 3 pads.
function check(){ 
	numero=document.getElementById('input1').value; // valor del input
	perror.innerHTML=""; //limpiamos el área de advertencias
	perror.id="errorid";

	//calculo del digito de control.
	var suma=7*numero[0]+6*numero[1]+5*numero[2]+4*numero[3]+3*numero[4]+2*numero[5];
	var resto=suma%11;
	var cc=11-resto;
	if(cc<10){}
	if(cc>=10){
		cc=cc-10;
	}
	//aceptar desactivo inicialmente hasta comprobar:
	aceptar.className="disabled";
//	aceptar.setAttribute("disabled","disabled");
	//comprobar sintaxis +digito control OK.
	if((numero[7]==cc)&&(numero[6]=="-")){
		if(contpads==3){ 
			aceptar.removeAttribute("disabled");
			aceptar.className="aceptar";
			perror.id="correct";
			perror.innerHTML="Datos sintacticamente correctos, digito de control correcto y pin insertado!!";
			aceptar.onclick = function() {sessionstart()};
		}
		idinput.setAttribute("style","border-color: green");
	}
	//Comprobación digitos y sus mensajes (advertencias):
	if(numero.length==8){
		if(numero[7]!=cc){
			perror.innerHTML="El codigo de control es erroneo!!";
		}
		if(numero[6]!="-"){
			perror.innerHTML="La estructura del identificador no es correcta tiene que ser del tipo 123456-1!!";
		}
		for(p=0;p<5;p++){
			if(isNaN(numero[p])==true){
				perror.innerHTML="La estructura del identificador no es correcta tiene que ser del tipo 123456-1!!";

			}
		}		
	}else{
		idinput.setAttribute("style","border-color: red");
		perror.innerHTML="La estructura del identificador no es correcta tiene que ser del tipo 123456-1!!";
	}

}
//Función aleatorizacion de PADS:
function random(){
	for(i=0;i<=50;i++){
			n=Math.round((Math.random()*9)+0);
			k=Math.round((Math.random()*9)+0);
			input.appendChild(pads[k],input.childNodes[n]);
		}
}
//Función aleatorizacion de PINS
function randompin(){
	for(i=0;i<=50;i++){
		n=Math.round((Math.random()*5)+0);
		k=Math.round((Math.random()*5)+0);
		celdas.appendChild(pins[k],celdas.childNodes[n]);
	}
}
//Función de reseteo del estado.
function borrado () {
	idinput.value="";
	idinput.setAttribute("style","border-color: red");
	contpads = 0;
	z=0;
	pins = document.getElementsByClassName("pin");
	for (var i =0; i < pins.length ; i++) {
		pins[i].value = "";
	}
	random();
	randompin();
	aceptar.className="disabled";
//	aceptar.setAttribute("disabled","disabled");
	perror.innerHTML="";
}
//Función activa al pulsar pad.
function padpulsado(k) {
	if (contpads<3){
		while(pins[z].hasAttribute("placeholder")==true){
			z++;
		}
		pins[z].value=k;
		pin[contpads]=k;
		pinpos[contpads]=z;
		contpads++;

	}else {alert("Ya has introducido 3 numeros!");}
	z++;
	check();
}
// Función que comprueba usuario introducido con la base de datos.
function sessionstart() {
	verifycode=false;
	verifypin=false;
	id=JSON.parse(login);
	clientes=Object.keys(id);
	for(l=0;l<clientes.length;l++){
		if(input1.value==id[clientes[l]]['code']){
			verifycode=true;
			realpin=id[clientes[l]]['pin'].toString(10);
			if(realpin[pinpos[0]]==pin[0]&&(realpin[pinpos[1]]==pin[1])&&realpin[pinpos[2]]==pin[2]){
				verifypin=true;
				break;
			}
		}
	}
	if((verifycode==false)||(verifypin==false)){
		alert("Los datos introducidos son erroneos!");
		borrado();
	}
	if((verifycode==true)&&(verifypin==true)){
		alert("Bienvenido !!!!"+"\n"+"Usuario: "+clientes[l]);
	}
}