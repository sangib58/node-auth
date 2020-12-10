const express=require('express');
const app=express();
const swaggerUi=require('swagger-ui-express');
const specs=require('./swagger');

app.use(express.json());

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));

//Import routes
const authRoute=require('./routes/auth');

//Route Middlewares
app.use('/api/users',authRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on ${port}`));
