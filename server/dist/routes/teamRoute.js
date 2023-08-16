"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRoute = void 0;
const express_1 = __importDefault(require("express"));
const teamMemberController_1 = require("../controllers/teamMemberController");
const router = express_1.default.Router();
exports.teamRoute = router;
router.post('/', teamMemberController_1.addTeamMember);
router.get('/', teamMemberController_1.getTeamMembers);
router.delete('/:id', teamMemberController_1.deleteTeamMember);
