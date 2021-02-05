# forms
Es un asistente para crear formularios y el guardado de datos, el ambiente es de php y mysql.

Ejemplo de funcionamiento.
*En los archivos php adecuar el usuario y password.

Supongamos que tenemos una base de datos en mysql con las tablas paises,estados,municipios,ciudades y colonias. Y deseamos hacer formularios de captura para cada una de esas tablas.

Empezemos con PAISES, con los campos id y nombre, el id es auto-increment.

* Abrir el asistente, el cual mostrara la lista de tablas de la base de datos. Se da click en el nombre de la tabla y se selecciona el checkbox, si es que se desea guardar los datos, al dar click en el nombre de la tabla aparecen del lado derecho los campos de esa tabla, se selecciona en este caso, nombre solamente ya que el id se autogenera, luego en configuracion de elementos en la columna de "etiquetas" se pone precisamente la etiqueta o titulo del campo, en este caso pais. En la columna de participantes aparece ya configurado el id del componente html que servira de campo de captura, ese hay que dejarlo asi.  Bajo la etiqueta de "tipo de nodo" selecciona input.
Abajo hay dos botones uno que dice "Vista previa flexbox" y otro que dice "Vista previa bootstrap", por ejemplo dar click en "vista previa bootstrap".
Debe aparecer una pagina con un campo de captura y una etiqueta, aparece un cuadro de texto con place-holder que dice nombre del archivo, ahi se captura el nombre del archivo que va a tener la pagina, no se captura la extension html o php. Se le da click al Boton crear archivo y el asistente lleva a la pagina segun el nombre que se le dio, y ya esta listo para guardar, por ejemplo, se puede poner "Mexico" se le da a guardar y se graba en la base de datos.

Sigue ESTADOS, la tabla estado con los campos id,pais,nombre.
Aqui la diferencia es que el campos pais se alimenta de la tabla paises. Se sigue el procedimiento anterior, pero en tipo nodo para el campo pais se selecciona "select",se oprime el boton configurar, aparece un area con las tablas, se selecciona la que dice paises y de ahi los campos id y nombre y se da click en el boton aceptar, (cuando se cree el formulario el combo box contara con los datos de la tabla paises), y se sigue como en el caso anterior, vista previa, crear archivo.

MUNICIPIOS, campos nombre y estado. Para este formulario se requieren 3 campos: Pais, estado, nombre de muncipio, ya que el estado depende de un pais y el municipio de un esado. Para el campo html de pais, se selecciona de la columna elementos html la opcion "select" se le captura, el id, en este caso se debe poner el id en la columna "participantes", se da click boton configurar se selecciona la tabla paises y los campos id y nombre, click en boton aceptar, luego se prosigue con los otros campos, se selecciona la tabla municipios y se seleccionan los campos estado y nombre, para estado se selecciona el tipo select se da el boton configurar se selecciona de la tabla estados id y nombre,luego, del lado derecho aparecen dos selects y un boton "+" del segundo select se selecciona formulario y se oprime el boton "+" aparece una tabla con 5 selects o combos, sirven para agregar condiciones en base a basde datos y elementos del formulario, en este caso estamos buscando que el estado se de acuerdo al pais, entonces del primero select se selecciona la tabla estados, del segundo selecto el campo pais, del tercer select la opcion "=" , en el cuarto select aparecen los ids de los elementos actuales del formulario, en este caso se seleccion el id que se haya dado al campo pais, en el quinto select se selecciona la opcion value. Y es todo, click en el boton aceptar, se procede como en los casos anteriores y se va a tener un formulario listo para usarse y guardar datos sin escribir mas codigo. 

La creacion de formularios incluye "campos de busqueda", que son los componentes html-select, por ejemplo, que en la creacion de un formulario obtienen sus datos de una tabla, y tambien cuando los datos que traen incluyen una condicion.
Despues de crear el formulario este puede ser guardado en la tabla.
El ambiente, como se menciona, es en php y mysql.
Se contempla seguir añadiendo opciones, por ejemplo, agregar imagenes, y relaciones master-detail.

Cualquier duda el correo es mariohecte2@gmail.com Telefono codigo de Mexico, 6145102715.
                     

