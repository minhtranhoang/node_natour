const express = require('express');
const fs = require('node:fs');
const app = express();
const port = 3001;

// Read tours string
const tour_string = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`
);
const tours = JSON.parse(tour_string);

app.use(express.json());

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

app.get('/api/v1/tours', (req, res) => {
  console.log('Receive /api/v1/tours');
  res.status(200).json({
    status: 'success',
    length: tours.length,
    data: tours,
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  const reqObject = req.body;
  if (reqObject) {
    const newID = tours[tours.length - 1].id + 1;
    const newTour = JSON.parse(JSON.stringify(reqObject));
    newTour.id = newID;
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        if (err) res.send('Write file error');
        else res.send('Write done');
      }
    );
  } else {
    res.send('Object identify');
  }
});

app.listen(port, () => {
  console.log(`App running in port ${port}...`);
});
