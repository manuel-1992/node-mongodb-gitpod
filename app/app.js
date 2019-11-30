const express = require('express');
const path = require('path');
const color = require('colors')
const app = express();
const Tarea = require('./models/Tarea')
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');

app.engine('.hbs', exphbs ({
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layouts')
  }));
app.set('view engine', '.hbs');
app.set('views',path.join(__dirname,'views'))




//midleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'My_web',
     resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use(morgan('dev'));



//Variables globales
app.use((req, res, next)=>{
    app.locals.message = req.flash('success');
    app.locals.errors = req.flash('error');
    next();
});


app.get('/add', (req, res)=>{
    res.render('index');
})

app.post('/create', async (req, res)=>{     
 const {tarea,descripcion} = req.body;
    newTarea  =  new Tarea({
        tarea: req.body.tarea,
        descripcion: req.body.descripcion
    });   
   
if(!tarea.length){
    req.flash('error', 'El campo tarea está vacio!');
   res.redirect('/add');
}
if(!descripcion){
    req.flash('error', 'El campo descripción está vacio!');
   res.redirect('/add');
}else{
 await newTarea.save();
    req.flash('success', 'Tarea agrega exitosamente!');
   res.redirect('/')
}
   
});

app.get('/', async (req, res)=>{
    const tareas = await Tarea.find();
    
    res.render('tareas', {
        tareas
    });
})

app.get('/edit/:id',  async (req, res)=>{  
    const {id} = req.params
  const tareaUdate = await Tarea.findById(id );  
    res.render('edit' , {
        tareaUdate
    });
})
app.post('/edit/:id', async (req, res)=>{      
   const {id} = req.params;
   await Tarea.update({_id: id}, req.body) 
 req.flash('success', 'Tarea actualizada exitosamente!')
    res.redirect('/');

});
app.get('/delete/:id', async (req, res)=>{      
   const {id} = req.params;
   await Tarea.findByIdAndDelete(id) 
    req.flash('success', 'Tarea eliminada exitosamente!')
    res.redirect('/');

});




module.exports = app;