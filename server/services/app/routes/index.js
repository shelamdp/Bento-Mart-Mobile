const router = require("express").Router()
const Controller = require("../controllers")

router.get("/menus", Controller.fetchMenu)
router.get("/categories", Controller.fetchCategory)
router.post("/menus", Controller.addMenu)
router.post("/categories", Controller.addCategory)
router.get("/menus/:id", Controller.detailMenu)
router.get("/categories/:id", Controller.detailCategory)
router.put("/menus/:id", Controller.editMenu)
router.put("/categories/:id", Controller.editCategory)
router.delete("/menus/:id", Controller.deleteMenu)
router.delete("/categories/:id", Controller.deleteCategory)

module.exports = router