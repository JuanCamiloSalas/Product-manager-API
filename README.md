# Product Manager API
La API para controlar el registro de productos

#### Probar la API
Puede ver y probar todos los endpoints en el enlace de la documentación del proyecto:
> https://product-manager-api.up.railway.app/docs

Para poder probar el endpoint de csv es necesario hacerlo desde una plataforma API como Postman o Insomnia.

#### Autenticación y permisos
La autenticación de usuario se realizó con JWT, se creó un middleware que se aplica a todas las rutas que solo deben ser utilizadas por los usuarios con rol de administrador.

#### Base de datos
La base de datos se deployó a través del servicio de RDS de AWS, y se crearon las siguientes tablas:

- User
- Category
- Product

#### Testing
Para poder ejecutar los test es necesario descargar el proyecto a local, levantar una base de datos postgres y crear un archivo .env en la carpeta raíz con los siguientes valores:

	
    PORT = 3001
    URL = http://localhost:3001/api
    DB_USER = //Su usuario postgres
    DB_HOST = localhost
    DB_PASSWORD = // Su password postgres
    SECRETA = Una clave a determinación propia para JWT

Por último, ejecutar los comandos `npm install` y `npm test`.


#### Features Extra!
Se agregó la posibilidad de ordenar y filtrar los resultados de las rutas get de  `/categories` y `products`; asimismo, se agregó dentro de la respuesta de estos endpoints información extra como la cantidad de resultados, la cantidad de páginas, y la URL  de consulta de la anterior y siguiente página con los mismos parámetros ingresados.
