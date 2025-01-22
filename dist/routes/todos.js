"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = __importDefault(require("../controllers/todos"));
const router = (0, express_1.Router)();
const todoController = new todos_1.default();
router.post("/", todoController.createTodo);
router.get("/", todoController.getTodos);
router.patch("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
exports.default = router;
