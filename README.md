# TestBackend
Ejercicio telefonia Backend

  Servidor NODE js, endpoint REST para obtener factura telefonica de cliente

Instalación

#Clonar el repositorio

  Ingresar en el directorio del proyecto y ejecutar:

  git clone https://github.com/stephanosJAH/TestBackend.git

#Instalación de dependencias

  npm install

#Run server
  Ingresar en el directorio del proyecto

  npm run dev (ejecuta el script nodemon src/index.js) / node src/index.js

#Creación de la Base de Datos

  Al momento de levantar el servidor se generará automáticamente la base de datos. 
  Dentro de la carpeta scr/db se encuentra el archivo mocks.js que sirve como mock/seeder para la creación de la base de datos. 

  Dentro de este archivo se encuentra la creación de las tablas, índices y los registros.
  
#Ejecución 
    
   Usando POSTMAN/INSOMNIA: 
   
   [URL] 
   GET - http://localhost:4000/api/consumos
   
   [BODY]
   {
      "nro_linea": "0111133003300",
      "periodo" : 1
   }

   numeros de clientes:
   
    0111599001100 (mayor cantidad de registros)
    0116511001100
    0111700770077
    0111133003300
    
    periodos [ 1 mensual ] [ 2 anual ]
    
#CONCLUSIONES Y ACLARACIONES

1 - La tabla de llamadas no cuenta con más registros, entiendo que con los creados alcanza para las pruebas generales.

2 – NOMBRE DE VARIABLES: opté por escribirlas en castellano para que sea uniforme en todo el código a fin de dar mayor claridad en el código, a simple vista, y camelcase por estándar de javascrip.

3 – LLAMADAS INTERNACIONALES: para el supuesto caso de las llamadas internaciones exceptuadas de URU/CHI, al no estar aclarado en el enunciado el valor de las mismas, me incliné por darle el valor de nacionales (día de semana), y no incluir el filtro de días de semana o días de fin de semana.

4 – Finalmente, en el hipotético que fuera un proyecto real, considero como alternativa viable: tener un proceso que corra periódicamente (a determinar) para el cálculo de los consumos de los usuarios, creándose una tabla, que contenga los acumuladores para las distintas llamadas y el valor de las mismas. De este modo, siempre tendríamos la mayor parte del periodo procesado y en el caso de solicitarse el consumo a facturar de un usuario (a demanda), restaría únicamente procesar el periodo entre en último proceso y el momento de la solicitud, generandose mayor performance para el endpoint.
