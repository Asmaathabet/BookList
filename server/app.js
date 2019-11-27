const express = require('express'); 
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// allow cross origin requests
app.use(cors())
//connect to mlab - mongoDB
mongoose
.connect('mongodb+srv://asmaa:123@cluster0-8kezu.mongodb.net/test?retryWrites=true&w=majority',  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
.then(()=>console.log('DB Connected'))  
.catch(err => {
    console.log(`DB Connection error: ${err.message}`);
});
mongoose.connection.once('open', ()=> {
    console.log('*******connected to database*******');
})
// add schema to graphql middleware to work & retrive the data
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(5000, ()=>{
    console.log('now listening for requests on  http://localhost:5000');
})