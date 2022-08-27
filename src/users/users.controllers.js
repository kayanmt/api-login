const usersServices = require("./users.services");
const bcrypt = require("bcryptjs");

class UsersControllers {
  createUsersController = async (req, res) => {
    try {
      const { name, username, email, password, photo } = req.body;
      const findByEmail = await usersServices.findByEmail(email);
      const findByUsername = await usersServices.findByUsername(username);
      const encryptePassword = await bcrypt.hash(password, 10);

      if (findByEmail) {
        res.status(400).send({ message: "Email already registered" });
      } else if (findByUsername) {
        res.status(400).send({ message: "Username already registered" });
      } else {
        const created = await usersServices.createUsersService({
          name,
          username,
          email,
          password: encryptePassword,
          photo,
        });

        if (!created) {
          res.status(400).send({ message: "Error creating user" });
        } else {
          res.status(201).send(created);
        }
      }
    } catch (err) {
      res.status(400).send({ message: "Error creating user" });
    }
  };

  getAllUsersController = async (req, res) => {
    try {
      const userList = await usersServices.getAllUsersService();
      if (!userList || userList.length === 0) {
        res.status(404).send({ message: "Users not found" });
      } else {
        res.status(200).send(userList);
      }
    } catch (err) {
      res.status(404).send({ message: "Users not found" });
    }
  };
}

module.exports = usersControllers = new UsersControllers();
