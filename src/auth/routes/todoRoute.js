"use strict";

const express = require("express");
const router = express.Router();
const permissions = require("../middleware/acl.js");
const bearerAuth = require("../middleware/bearerAuth");
const { userCollection, users, todoModel, todoCollection } = require("../models/index");


// add routes
router.get("/Item", bearerAuth, permissions("delete"), getItem);
router.get("/todo", bearerAuth, getItemById);
router.post("/todo", bearerAuth, createItem);
router.delete("/todo", bearerAuth, deleteItem);

async function getItem(req, res) {
  let Item = await userCollection.read();
  res.status(200).json(Item);
}

async function getItemById(req, res) {
  const id = req.userId;
  let Item = await todoModel.findOne({ where: { userId: id } });
  res.status(200).json(Item);
}

async function createItem(req, res) {
  let update = req.body;
  let data = await todoModel.findOne({ where: { userId: req.userId } });
  let id = data.dataValues.id;
  let item = data.dataValues.todo;
  let newArray = [...item, update];
  let toDo = await todoCollection.update(id, { todo: newArray });
  res.send(toDo);
}

async function deleteItem(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await todoModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.todo;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let toDo = await todoCollection.update(id, { todo: item });
  res.status(200).json(toDo);
}

module.exports = router;
