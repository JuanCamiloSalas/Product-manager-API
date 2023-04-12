//////////////// TAGS //////////////////
/**
 * @swagger
 * tags:
 * - name: Auth
 *   description: Endpoint relacionado con la autenticación usuarios
 * - name: Categories
 *   description: Endpoint relacionado con las categorías de productos
 * - name: Products
 *   description: Endpoint relacionado con los productos
 */


/////////////// SCHEMAS ////////////////
// ProductEntry
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductEntry:
 *       type: object
 *       description: Información necesaria para crear un producto
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         categoryId:
 *           type: string
 *           description: Identificador de la categoría a la que pertenece el producto
 *       required:
 *         - name
 *         - description
 *         - price
 *         - categoryId
 *       example:
 *         name: Portátil Hp
 *         description: El mejor desempeño gracias a su potente procesador y gran capacidad de almacenamiento contenido en un espectacular diseño que respeta el medio ambiente.
 *         price: 45.5
 *         categoryId: 19d3f87a-ab7d-408c-aede-7cf9f1ef0df4
 */
// ProductResponse
/**
 * @swagger
 * components:
 *   schemas: 
 *     ProductResponse:
 *       type: object
 *       description: Información que contiene un producto
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador del producto
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         categoryId:
 *           type: string
 *           description: Identificador de la categoría a la que pertenece el producto
 *         createdAt:
 *           type: date
 *           description: Fecha de creación del producto
 *         updatedAt:
 *           type: date
 *           description: Fecha de última modificación del producto
 *       example:
 *         id: 9250bfa6-c1f7-4ce1-8e5a-7bb6c79b5263
 *         name: Portátil Hp
 *         description: El mejor desempeño gracias a su potente procesador y gran capacidad de almacenamiento contenido en un espectacular diseño que respeta el medio ambiente.
 *         price: 45.5
 *         categoryId: 19d3f87a-ab7d-408c-aede-7cf9f1ef0df4
 *         createdAt: 2023-04-05T02:51:48.729Z
 *         updatedAt: 2023-04-06T16:46:28.348Z
 */
// ProductsListResponse
/**
 * @swagger
 * components:
 *   schemas: 
 *     ProductsListResponse:
 *       type: object
 *       properties:
 *         count:
 *           type: integer
 *           description: Cantidad de resultados.
 *           example: 35
 *         pages: 
 *           type: integer
 *           description: Cantidad de páginas.
 *           example: 4
 *         previus:
 *           type: string
 *           description: Página anterior con los mismos parámetros.
 *           example: https://product-manager-api.up.railway.app/api/products?name=a&alpha=DESC&page=1
 *         next:
 *           type: string
 *           description: Página siguiente con los mismos parámetros.
 *           example: https://product-manager-api.up.railway.app/api/products?name=a&alpha=DESC&page=3
 *         results:
 *           type: array
 *           description: Resultados
 *           items:
 *             $ref: '#/components/schemas/ProductResponse'           
 */
// SignUpEntry
/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpEntry:
 *       type: object
 *       description: Información necesaria para creación de cuenta o inicio de sesión
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de usuario
 *         email:
 *           type: string
 *           description: Correo electrónico
 *         password:
 *           type: string
 *           description: Contraseña
 *       required:
 *         - name
 *         - email
 *         - password
 *       example:
 *         name: usuario prueba
 *         email: usuario@mail.com
 *         password: password-123*
 */
// LogInEntry
/**
 * @swagger
 * components:
 *   schemas:
 *     LogInEntry:
 *       type: object
 *       description: Información necesaria para creación de cuenta o inicio de sesión
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico
 *         password:
 *           type: string
 *           description: Contraseña
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: usuario@mail.com
 *         password: password-123*
 */
// Category
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       description: Información de la categoría
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador de la categoría
 *         name:
 *           type: string
 *           description: Nombre de la categoría
 *       example:
 *         id: 19d3f87a-ab7d-408c-aede-7cf9f1ef0df4
 *         name: Computadores
 */
// CategoriesListResponse
/**
 * @swagger
 * components:
 *   schemas: 
 *     CategoriesListResponse:
 *       type: object
 *       properties:
 *         count:
 *           type: integer
 *           description: Cantidad de resultados
 *           example: 35
 *         results:
 *           type: array
 *           description: Resultados
 *           items:
 *             $ref: '#/components/schemas/Category'
 */


////////////// PARAMETERS //////////////
/**
 * @swagger
 * components:
 *   parameters:
 *     id:
 *       in: path
 *       name: id
 *       required: true
 *       description: Identificador
 *       schema:
 *         type: string
 * 
 *     x-auth-token:
 *       in: header
 *       name: x-auth-token
 *       required: true
 *       description: Tóken de autenticación de usuario (proporcionado en rutas /auth)
 *       schema:
 *         type: string
 *     
 *     page:
 *       in: query
 *       name: page
 *       required: false
 *       description: Retorna la página indicada, si no se especifica en su defecto es la primera
 *       schema:
 *         type: integer
 * 
 *     name:
 *       in: query
 *       name: name
 *       required: false
 *       description: Filtra los resultados por nombre
 *       schema:
 *         type: string
 * 
 *     nameToCreate:
 *       in: query
 *       name: name
 *       required: true
 *       description: Nombre del registro
 *       schema:
 *         type: string
 *     
 *     categoryId:
 *       in: query
 *       name: categoryId
 *       required: false
 *       description: Filtra los resultados por categoría con el uso del id
 *       schema:
 *         type: string
 *     
 *     alpha:
 *       in: query
 *       name: alpha
 *       required: false
 *       description: Ordena los resultados por alfabéticamente tanto ascendente como descendentemente
 *       schema:
 *         type: string
 *         enum: ['ASC', 'DESC']
 * 
 *     price:
 *       in: query
 *       name: price
 *       required: false
 *       description: Ordena los resultados por precio tanto ascendente como descendentemente
 *       schema:
 *         type: string
 *         enum: ['ASC', 'DESC']
 * 
 *     createdAt:
 *       in: query
 *       name: createdAt
 *       required: false
 *       description: Ordena los resultados por fecha de creación tanto ascendente como descendentemente
 *       schema:
 *         type: string
 *         enum: ['ASC', 'DESC']
 *         
*/


/////////////// RESPONSES ///////////////
/**
 * @swagger
 * components:
 *   responses:
 *     Unauthorized:
 *       description: (Unauthorized) no hay autorización al llamar al servidor 
 *     NotFound:
 *       description: (NotFound) no se encontró la información 
 *     BadRequest:
 *       description: (BadRequest) los datos enviados son incorrectos o hay datos obligatorios no enviados
 *     ServerError:
 *       description: (ServerError) Error en el servidor
 */


///////////////// RUTAS /////////////////
// PRODUCTS
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna una lista de productos
 *     description: Los resultados llegan paginados de a 10, si es un administrador retorna todos los productos si es un usuario o no ha iniciado sesión solo los productos que no están ocultos a público (ver ruta /products/{id}/hide)
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/name'
 *       - $ref: '#/components/parameters/categoryId'
 *       - $ref: '#/components/parameters/price'
 *       - $ref: '#/components/parameters/alpha'
 *       - $ref: '#/components/parameters/createdAt'
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsListResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 *   post:
 *     summary: Crea un producto
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/x-auth-token'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductEntry'  
 *     responses:
 *       200:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
/**
 * @swagger
 * /products/csv:
 *   post:
 *     summary: Crea varios productos a partir de un archivo csv
 *     consumes:
 *       - text/csv
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *     responses:
 *       200:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna los detalles de un producto
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Retorna un objeto con el producto deseado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 *   put:
 *     summary: Edita los detalles de un producto
 *     description: No es necesario pasar todos los valores
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/id'
 *     requestBody:
 *       description: Información a editar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductEntry'  
 *     responses:
 *       200:
 *         description: Mensaje de confirmación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Producto actualizado exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/id' 
 *     responses:
 *       200:
 *         description: Mensaje de confirmación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Producto eliminado exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
/**
 * @swagger
 * /products/{id}/hide:
 *   put:
 *     summary: Oculta/Muestra un producto a los usuarios
 *     description: Si el producto ya está oculto esta ruta sirve para hacer público el producto nuevamente
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/id' 
 *     responses:
 *       200:
 *         description: Mensaje de confirmación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: El producto se ha ocultado / El producto es ahora público
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

// AUTH
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registro de cuenta nueva
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpEntry'  
 *     responses:
 *       200:
 *         description: Mensaje de confirmación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicio de sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogInEntry'  
 *     responses:
 *       200:
 *         description: Mensaje de confirmación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

// CATEGORIES
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retorna una lista de categorías
 *     description: hola
 *     tags: [Categories]
 *     parameters:
 *       - $ref: '#/components/parameters/name'
 *       - $ref: '#/components/parameters/alpha'
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriesListResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 *   post:
 *     summary: Crea una categoría
 *     tags: [Categories]
 *     parameters:
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/nameToCreate'
 *     responses:
 *       200:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Edita una categoría
 *     tags: [Categories]
 *     parameters:
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/id'
 *       - $ref: '#/components/parameters/nameToCreate'
 *     responses:
 *       200:
 *         description: Mensaje de confirmación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Categoría actualizada exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 *   delete:
 *     summary: Elimina una categoría
 *     tags: [Categories]
 *     parameters:
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Mensaje de confirmación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Categoría eliminada exitosamente, así como sus productos(cantidad de registros eliminados)
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */