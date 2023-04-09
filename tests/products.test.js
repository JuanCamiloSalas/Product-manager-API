const supertest = require("supertest");
const app = require("../src/app.js");
// const server = require("../index.js");
const { Category, Product } = require("../src/db.js");

const api = supertest(app);

// Tóken de autorización para rutas de administrador
const adminToken = process.env.ADMIN_TOKEN_DB_TEST;

const initialCategories = [
    { name: "Computadores" },
    { name: "Accesorios" }
]

const categoriesIds = {};
const productsIds = {};

const initialProducts = [
    {
        name: "Portátil Lenovo",
        description: "Computador de 8 de RAM, core i7, 1TB de almacenamiento",
        price: 300.50,
    },
    {
        name: "Mouse Genius",
        description: "Mouse inalámbrico con pilas recargables",
        price: 5.20,
    }
]

beforeEach( async () => {
    // Eliminar todos los registros al iniciar cualquier test
    Category.destroy({truncate: true, cascade: true});
    
    // Crear categorías iniciales y asignar sus ids al objeto categoriesIds
    const computadores = await Category.create(initialCategories[0]);
    categoriesIds.computadores = computadores.dataValues.id;
    const accesorios = await Category.create(initialCategories[1]);
    categoriesIds.accesorios = accesorios.dataValues.id;

    // Crear productos iniciales y asignar sus ids al objeto productsIds
    const portatil = await Product.create({ ...initialProducts[0], categoryId: computadores.dataValues.id });
    productsIds.portatil = portatil.dataValues.id;
    const mouse = await Product.create({ ...initialProducts[1], categoryId: accesorios.dataValues.id });
    productsIds.mouse = mouse.dataValues.id;
});
 

///////////////////    TESTS    ////////////////////////
describe('GET: /products', () => {
    test("products are returned as json", async () => {
        await api
            .get('/api/products')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });
});

describe('POST: /products', () => {
    test("should respond with status code 401 when Unauthorized", async () => {
        const newProduct = {
            name: "Teclado hp",
            description: "Teclado logitech",
            price: 10.75,
        }
    
        const  response = await api.post('/api/products')
            .set('x-auth-token', `Bearer ${adminToken}`)
            .send(newProduct);
        expect(response.statusCode).toBe(401);
    });
    
    test.skip(`there must be ${initialProducts.length + 1} products when created`, async () => {
        const newProduct = {
            name: "Teclado hp",
            description: "Teclado mecánico por cable",
            price: 10.75,
            categoryId: categoriesIds.accesorios,
        }
        await api.post('/api/products')
            .set('x-auth-token', `Bearer ${adminToken}`)
            .send(newProduct);

        const response = await Product.findAll();
        expect(response).toHaveLength(initialProducts.length + 1);
    });
});

describe.skip('GET: /products/:id', () => {
    test("should respond with status code 401 when user is not logged in", async () => {
        await api
            .get(`/api/products/${productsIds.portatil}`)
            .expect(401)
    });

    test("should respond with status code 400 when bad request id", async () => {
        await api
            .get(`/api/products/wrongid`)
            .expect(400)
    });

    test("should respond with status code 404 when product does not exists", async () => {
        const inventedUUID = "136d2fbd-efb6-4690-bf69-e6766cf31828";
        await api
            .get(`/api/products/${inventedUUID}`)
            .expect(404)
    });

    test("should respond with status code 200 when product exists", async () => {
        await api
            .get(`/api/products/${productsIds.portatil}`)
            .set('x-auth-token', `Bearer ${adminToken}`)
            .expect('Content-Type', /application\/json/)
    });

    test("should respond with aplication/json when successfully", async () => {
        
        await api
            .get(`/api/products/${productsIds.portatil}`)
            .set('x-auth-token', `Bearer ${adminToken}`)
            .send(updatedProduct)
            .expect(200)
    });
});

describe.skip('PUT: /products/:id', () => {
    test("should respond with status code 401 when user is not logged in", async () => {
        await api
            .put(`/api/products/${productsIds.portatil}`)
            .expect(401)
    });

    test("should respond with status code 400 when bad request id", async () => {
        await api
            .put(`/api/products/wrongid`)
            .expect(400)
    });

    test("should respond with status code 404 when product does not exists", async () => {
        const inventedUUID = "136d2fbd-efb6-4690-bf69-e6766cf31828";
        await api
            .put(`/api/products/${inventedUUID}`)
            .expect(404)
    });

    test("should respond with status code 200 when product exists", async () => {
        const updatedProduct = {
            name: "Portátil Lenovo 2.0",
            description: "portátil subió de precio",
            price: 320,
        }
        
        await api
            .put(`/api/products/${productsIds.portatil}`)
            .set('x-auth-token', `Bearer ${adminToken}`)
            .send(updatedProduct)
            .expect(200)
    });

    test("should respond with aplication/json when successfully", async () => {
        const updatedProduct = {
            name: "Portátil Lenovo 2.0",
            description: "portátil subió de precio",
            price: 320,
        }
        
        await api
            .put(`/api/products/${productsIds.portatil}`)
            .set('x-auth-token', `Bearer ${adminToken}`)
            .send(updatedProduct)
            .expect(200)
    });
});

describe.skip('DELETE: /products/:id', () => {
    test("should respond with status code 401 when user is not logged in", async () => {
        await api
            .delete(`/api/products/${productsIds.portatil}`)
            .expect(401)
    });

    test("should respond with status code 400 when bad request id", async () => {
        await api
            .delete(`/api/products/wrongid`)
            .expect(400)
    });

    test("should respond with status code 404 when product does not exists", async () => {
        const inventedUUID = "136d2fbd-efb6-4690-bf69-e6766cf31828";
        await api
            .delete(`/api/products/${inventedUUID}`)
            .expect(404)
    });

    test("should respond with status code 200 when product exists", async () => {
        await api
            .delete(`/api/products/${productsIds.portatil}`)
            .set('x-auth-token', `Bearer ${adminToken}`)
            .expect('Content-Type', /application\/json/)
    });

    test("should respond with aplication/json when successfully", async () => {
        
        await api
            .delete(`/api/products/${productsIds.portatil}`)
            .set('x-auth-token', `Bearer ${adminToken}`)
            .send(updatedProduct)
            .expect(200)
    });
});
