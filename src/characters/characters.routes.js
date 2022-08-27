const router = require("express").Router();
const charactersControllers = require("./characters.controllers");
const authMiddleware = require("../auth/auth.middleware");

router.get(
  "/search",
  authMiddleware,
  charactersControllers.searchCharactersController
);
router.post(
  "/create",
  authMiddleware,
  charactersControllers.createCharactersController
);
router.get(
  "",
  authMiddleware,
  charactersControllers.getAllCharactersController
);
router.get(
  "/find/:id",
  authMiddleware,
  charactersControllers.findByIdController
);
router.put(
  "/update/:id",
  authMiddleware,
  charactersControllers.updateCharactersController
);
router.delete(
  "/delete/:id",
  authMiddleware,
  charactersControllers.deleteCharacterController
);
module.exports = router;
