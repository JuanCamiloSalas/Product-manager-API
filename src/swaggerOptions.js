const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Product Manager API",
            version: "1.0.0",
            description: "Controle el registro de sus productos"
        },
        servers: [
            {
                url: "https://product-manager-api.up.railway.app/api"
            },
            {
                url: "http://localhost:3000"
            },
        ]
    },
    apis: ["./src/routes/*.js"]
}

module.exports = swaggerSpec;