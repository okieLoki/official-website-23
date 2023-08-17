"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoute = void 0;
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const router = express_1.default.Router();
exports.projectRoute = router;
router.post('/', projectController_1.addProject);
router.get('/', projectController_1.getProjects);
router.delete('/:id', projectController_1.deleteProject);
