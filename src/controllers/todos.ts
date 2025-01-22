import { Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo";

class TodoController {
  private todos: Todo[] = [];

  constructor() {
    this.todos = [];

    this.getTodos = this.getTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  public getTodos(req: Request, res: Response): void {
    try {
      res.status(200).json({ tasks: this.todos });
    } catch (error) {
      console.log(error);
    }
  }

  public createTodo(req: Request, res: Response): void {
    try {
      const task = (req.body as { task: string }).task;
      const newTodo = new Todo(Math.random().toString(), task);
      this.todos.push(newTodo);
      res.status(201).json({
        message: "Todo created successfully",
        createdTask: newTodo,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public updateTodo(req: Request, res: Response): void {
    try {
      const todoId = req.params.id;
      const updatedTask = (req.body as { task: string }).task;
      const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);

      if (todoIndex < 0) {
        throw new Error("Could not find todo with such id");
      }

      this.todos[todoIndex] = new Todo(this.todos[todoIndex].id, updatedTask);

      res.status(201).json({
        message: "Todo updated successfully",
        updatedTask: this.todos[todoIndex],
      });
    } catch (error) {
      console.log(error);
    }
  }

  public deleteTodo(req: Request, res: Response): void {
    try {
      const todoId = req.params.id;
      const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
      if (todoIndex < 0) {
        throw new Error("Could not find todo with such id");
      }
      this.todos.splice(todoIndex, 1);
      res.status(200).json({
        message: "Todo deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default TodoController;
