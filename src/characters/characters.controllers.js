const charactersServices = require("./characters.services");

class CharactersControllers {
  createCharactersController = async (req, res) => {
    try {
      const { user, name, imageUrl } = req.body;
      const findByName = await charactersServices.findByNameService(name);

      if (findByName) {
        res.status(400).send({ message: "Name already registered" });
      } else {
        const created = await charactersServices.createCharactersService({
          user,
          name,
          imageUrl,
        });
        if (!created) {
          res.status(400).send({ message: "Error creating character" });
        } else {
          res.status(201).send(created);
        }
      }
    } catch (err) {
      res.status(400).send({ message: "Error creating character" });
    }
  };

  getAllCharactersController = async (req, res) => {
    try {
      const limit = req.query.limit;
      const offset = req.query.offset;
      const characterList = await charactersServices.getAllCharactersService(
        limit,
        offset
      );
      if (!characterList || characterList.length === 0) {
        res.status(404).send({ message: "Characters not found" });
      } else {
        res.status(200).send(characterList);
      }
    } catch (err) {
      res.status(404).send({ message: "Error getting characters" });
    }
  };

  findByIdController = async (req, res) => {
    try {
      const foundChar = await charactersServices.findByIdService(req.params.id);
      if (!foundChar || foundChar.length === 0) {
        res.status(404).send({ message: "Id not Found" });
      } else {
        res.status(200).send(foundChar);
      }
    } catch (err) {
      res.status(404).send({ message: "Error finding id" });
    }
  };

  updateCharactersController = async (req, res) => {
    try {
      const id = req.params.id;
      const { name, imageUrl } = req.body;
      const updated = await charactersServices.updateCharactersService(id, {
        name,
        imageUrl,
      });
      if (!updated) {
        res.status(400).send({ message: "Id not found" });
      } else {
        res.status(200).send(updated);
      }
    } catch (err) {
      res.status(400).send({ message: "Error updating character" });
    }
  };

  deleteCharacterController = async (req, res) => {
    try {
      const deleatedChar = await charactersServices.deleteCharacterService(
        req.params.id
      );
      if (!deleatedChar) {
        res.status(404).send({ message: "Id not Found" });
      } else {
        res.status(200).send(deleatedChar);
      }
    } catch (err) {
      res.status(404).send({ message: "Error deleting character" });
    }
  };

  searchCharactersController = async (req, res) => {
    try {
      const name = req.query.name;

      const searchedChar = await charactersServices.searchCharactersService(
        name
      );
      if (!searchedChar) {
        res.status(404).send({ message: "Name not Found" });
      } else {
        res.status(200).send(searchedChar);
      }
    } catch (err) {
      res.status(404).send({ message: "Error finding character" });
    }
  };
}

module.exports = charactersControllers = new CharactersControllers();
