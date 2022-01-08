const { ObjectId } = require("mongodb");
const db = require("./mongo")

const todoStatus = {
  PENDING: "pending",
  DONE: "done"
}

const service = {
  async find(req, res) {
    try{
      const data = await db.todos.find().toArray();
      res.send(data);
    } catch(err) {
      console.log(err);
      res.send({ success: false, message: "Operation failed" });
    }
  },
  async create(req, res) {
    try{
      let body = req.body;
      if(!body.text || !body.priority) {
        return res.send({success: false, message: "Incomplete data"});
      }
      const data = await db.todos.insertOne({ text: body.text, priority: body.priority, status: todoStatus.PENDING, createdAt: new Date() });
      res.send({ success: true, message: "Todo added successfully" });
    } catch(err) {
      console.log(err);
      res.send({ success: false, message: "Operation failed" });
    }
  },
  async updateStatus(req, res) {
    try{
      let body = req.body;
      let todo_id = req.params.id;
      if(!body.status) {
        return res.send({success: false, message: "No status given"});
      }
      let todo = db.todos.findOne({ _id: new ObjectId(todo_id) });
      if(!todo) {
        return res.send({success: false, message: "Todo not found"});
      }
      await db.todos.updateOne({ _id: new ObjectId(todo_id) }, { $set: { ...todo, status: body.status }});
      res.send({ success: true, message: "Todo updated successfully" });
    } catch(err) {
      console.log(err);
      res.send({ success: false, message: "Operation failed" });
    }
  }
}

module.exports = service;