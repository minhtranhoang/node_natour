const express = require('express');
const tourRouter = require(`${__dirname}/routes/tourRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);

// 1) Use express
const app = express();

if (process.env.NODE_ENV === 'development') {
  console.log('Use morgan middleware');
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// 1)Use middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createNewTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// 2)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
