const mongoose = require('mongoose');
const color = require('colors')


mongoose.connect('mongodb+srv://vic_ortiz:leonorlopez@cluster0-ehwpm.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() =>console.log(color.green('DB conectada')))
.catch(e =>console.log(e));