const db = require("./mongo")

const service = {
  async find(req, res) {
    try{
      const data = await db.todos.find().toArray();
      res.send(data);
    } catch(err) {
      console.log(err);
      res.send({ error: { message: "Operation failed" }});
    }
  },
  async create(req, res) {
    try{
      if(!req.text || !req.priority) {
        return res.send({success: false, message: "Incomplete data"});
      }
      const data = await db.todos.insertOne({ text: req.text, priority: req.priority });
      res.send(data);
    } catch(err) {
      console.log(err);
      res.send({ error: { message: "Operation failed" }});
    }
  }
}

module.exports = service;