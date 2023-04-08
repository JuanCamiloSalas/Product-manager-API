const supertest = require("supertest");
const app = require("../src/app.js");
// const server = require("../index.js");
const { Category, Product } = require("../src/db.js");

const api = supertest(app);

const token = process.env.ADMIN_TOKEN_DB_TEST;

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
    Category.destroy({truncate: true, cascade: true});
    
    const computadores = await Category.create(initialCategories[0]);
    categoriesIds.computadores = computadores.dataValues.id;
    const accesorios = await Category.create(initialCategories[1]);
    categoriesIds.accesorios = accesorios.dataValues.id;

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
    test("should respond with 401 status when Unauthorized", async () => {
        const newProduct = {
            name: "Teclado hp",
            description: "Teclado logitech",
            price: 10.75,
        }
    
        const  response = await api.post('/api/products')
            .set('x-auth-token', `Bearer ${token}`)
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
            .set('x-auth-token', `Bearer ${token}`)
            .send(newProduct);

        const response = await Product.findAll();
        expect(response).toHaveLength(initialProducts.length + 1);
    });
});

describe('GET: /products/:id', () => {
    test("should respond with 401 status when user is not logged in", async () => {
        await api
            .get(`/api/products/${productsIds.portatil}`)
            .expect(401)
    });

    test.skip("should respond with 400 status when bad request id", async () => {
        await api
            .get(`/api/products/wrongid`)
            .expect(400)
    });
});