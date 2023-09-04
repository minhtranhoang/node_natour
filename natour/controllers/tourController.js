const fs = require('node:fs');

console.log('Start init tour controller');
// Read tours string
const tour_string = fs.readFileSync(
  `${__dirname}/../dev-data/data/tours-simple.json`
);
const tours = JSON.parse(tour_string);

var controller = {
  checkID: function (req, res, next, val) {
    console.log(`Tour id is: ${val}`);
    next();
  },

  checkBody: function (req, resp, next, val) {
    if (!req.body.name || !req.body.price) {
      return resp.status(404).json({
        status: 'error',
        message: 'Param error',
      });
    }
    next();
  },

  getAllTours: function (req, res) {
    let respObject = {
      status: 'OK',
      itemSize: tours.length,
      tours: tours,
    };
    res.status(200).json(respObject);
  },

  getTour: function (req, res) {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find((item) => {
      return item.id === id;
    });

    if (tour) {
      res.status(200).json({
        status: 'OK',
        data: {
          tours: tour,
        },
      });
    } else {
      res.status(404).json({
        status: 'Error',
        message: 'Tour is not found',
      });
    }
  },

  createNewTour: function (req, res) {
    console.log(req.body);
    const reqTour = req.body;
    if (reqTour) {
      // Copy request tour
      const newTour = JSON.parse(JSON.stringify(reqTour));
      // Prepare new tour
      const newID = tours[tours.length - 1].id + 1;
      newTour.id = newID;
      // Save tour in array
      tours.push(newTour);
      // Write all tours
      fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
          if (err) res.send('Write file error');
          else res.send('Write done');
        }
      );
    } else {
      res.send('Object identify');
    }
  },

  updateTour: function (req, resp) {
    const id = req.params.id * 1;
    const tour = tours.find((item) => {
      return item.id == id;
    });

    if (tour) {
      return resp.status(200).json({
        status: 'success',
        message: 'Update data success',
      });
    } else {
      return resp.status(404).json({
        status: 'error',
        message: 'update tour is error',
      });
    }
  },

  deleteTour: function (req, res) {
    return resp.status(200).json({
      status: 'success',
      message: 'Delete tour',
    });
  },
};

module.exports = controller;
