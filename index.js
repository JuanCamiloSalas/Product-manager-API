const app = require("./src/app.js");
const { conn } = require("./src/db.js");

const port = process.env.PORT || 3001;
conn.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});