const express = require('express');
const app = express();
app.get("/users", (req, res) => {
   res.send('User List')
});
app.get("/users/:id", (req, res) => {

   let { userId } = req.query;
   res.send('User id is ' + req.body);
});
app.listen(3000, () => {
   console.log('Server is running on port 3000');
});