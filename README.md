# Descripción del Proyecto

Este proyecto es parte de una prueba técnica hecha en NestJs, PostrgreSQL, TypeORM, Docker

## Características Clave

-   **Autenticación**: El módulo auth maneja la autenticación de usuarios utilizando JWT (JSON Web Tokens). El secreto JWT es configurable a través de variables de entorno.

-   **Gestión de Usuarios**: El módulo users proporciona funcionalidad para la gestión de usuarios, incluyendo la creación, actualización y eliminación de usuarios.

-   **Gestión de Productos**: El módulo products permite la gestión de productos, incluyendo la creación, actualización y eliminación de productos.

-   **Control de Acceso Basado en Roles**: El módulo roles proporciona control de acceso basado en roles, permitiendo permisos y control de acceso de granularidad fina.

## Instalación

Para instalar las dependencias del proyecto, sigue estos pasos:

1. Asegúrate de tener Node.js y npm instalados en tu máquina.
2. Clona el repositorio en tu máquina local.
3. Navega al directorio del proyecto en tu terminal.
4. Ejecuta el siguiente comando para instalar las dependencias del proyecto:

-   npm install
-   docker compose up -d
-   npm run start:dev

## Uso

Una vez instaladas las dependencias, puedes iniciar la aplicación ejecutando:

Esto iniciará la aplicación en tu máquina local.

## Tener en Cuenta

Aquí puede ver detalle de cada endpoint de la API: [DOCUMENTACIÓN DE LOS ENPOINTS](https://documenter.getpostman.com/view/21358427/2sA2xmWBG4).
Es necesario que al iniciar el proyecto verifique que roles han sido creados en la siguiente url: [GET roles](http://localhost:3000/api/v1/role/get), en base a esos roles deberá crearse su usuario y contraseña, en la siguiente url: [CREAR usuario](http://localhost:3000/api/v1/user/create), tener en cuenta que es necesario colocar el id del rol en un array al crear el usuario.
Luego una vez creado su usuario en el response le saldrá los datos de sus usuario creado, deberá guardar el token que se muestra en el response ya que le servirá para poder cambiar su contraseña en caso lo requiera. Finalmente para poder acceder a los demás recursos deberá loguearse con su usuario y contraseña, estos son algunos recursos y/o rutas protegidas:

-   [CREAR producto](http://localhost:3000/api/v1/product/create)
-   [ACTUALIZAR producto](http://localhost:3000/api/v1/product/update/<id>) ejemplo: http://localhost:3000/api/v1/product/update/74d69ec0-9fbc-4814-94c3-219ce2e0d2dd
-   [DESHABILITAR producto](http://localhost:3000/api/v1/product/disable/<id>) ejemplo: http://localhost:3000/api/v1/product/disable/74d69ec0-9fbc-4814-94c3-219ce2e0d2dd
-   [ACTUALIZAR usuario](http://localhost:3000/api/v1/user/update/<id>) ejemplo: http://localhost:3000/api/v1/user/update/26cd9b11-c6bd-4a1b-9c63-44984b416948
-   [CREAR rol](http://localhost:3000/api/v1/role/create)

Todas la operaciones de insercción, actualización y eliminación requieres de los roles ["admin" y "creator"]

## Endpoints Clave

Aquí están algunos de los endpoints clave disponibles en la aplicación:

### Gestión de Usuarios:

-   Crear Usuario: POST api/v1/user/get
-   Actualizar Usuario: PUT api/v1/user/get/:id
-   Eliminar Usuario: DELETE /user//:id

### Gestión de Productos:

-   Crear Producto: POST api/v1/product
-   Actualizar Producto: PUT api/v1/product/:id
-   Eliminar Producto: DELETE api/v1/product/:id

### Autenticación:

-   Iniciar Sesión: POST api/v1/auth/login
-   Cambiar contraseña: PATCH api/v1/auth/changePassword/:userToken

Por favor, consulta la documentación de la API de la aplicación para obtener información más detallada sobre cómo utilizar estos endpoints, incluyendo los parámetros requeridos y los posibles valores de respuesta.

### Creado por

Carlos Chumpitaz Linares.
