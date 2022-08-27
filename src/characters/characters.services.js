const Character = require("./characters.model");

class CharactersServices {
  createCharactersService = async (body) => {
    return await Character.create(body);
  };
  findByNameService = async (name) => {
    return await Character.findOne({ name: name });
  };
  findByIdService = async (id) => {
    return await Character.find({ _id: id });
  };
  updateCharactersService = async (id, body) => {
    return await Character.findOneAndUpdate({ _id: id }, body, { new: true });
  };
  deleteCharacterService = async (id) => {
    return await Character.findOneAndDelete({ _id: id });
  };
  searchCharactersService = async (name) => {
    return await Character.findOne({ name: name });
  };
  getAllCharactersService = async (limit, offset) => {
    const allCharacters = await Character.find();
    const setOffset = Number(offset) > 0 ? Number(offset - 1) : 0;
    const setLimit =
      Number(limit) > 0 ? Number(limit) : allCharacters.length - setOffset;
    const showCharacters = await allCharacters.splice(setOffset, setLimit);
    return await showCharacters;
  };
}

module.exports = charactersServices = new CharactersServices();
