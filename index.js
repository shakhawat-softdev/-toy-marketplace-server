const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
   res.send('Toy Marketplace Server is Running............')
});







app.listen(port, () => {
   console.log(`Toy Marketplace Server is Running on port ${port}`)
})