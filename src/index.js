const express = require("express");
const app = express();
const cors = require("cors");
const connectToDatabase = require("./database/database");
require("dotenv").config();

const authRoutes = require("./auth/auth.routes");
const charactersRoutes = require("./characters/characters.routes");
const usersRoutes = require("./users/users.routes");

connectToDatabase();
app.use(cors());
app.use(express.json());

const swagger = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger.json");
app.use("/docs", swagger.serve, swagger.setup(swaggerDocs));

app.use("/auth", authRoutes);
app.use("/characters", charactersRoutes);
app.use("/users", usersRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Running at port ${port}`);
});
