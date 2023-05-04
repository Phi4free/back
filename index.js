const app = require('./api/index');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000

console.log(process.env.URI);
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(porta = port, () => {
      console.log("Servidor executando na porta "
          + porta);
    });
  })
  .catch(err => console.log(err));





