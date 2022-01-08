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
      const data = await db.todos.insertOne({ text: body.text, priority: body.priority, status: todoStatus.PENDING });
      res.send({ success: true, message: "Todo added successfully" });
    } catch(err) {
      console.log(err);
      res.send({ success: false, message: "Operation failed" });
    }
  }
}

module.exports = service;