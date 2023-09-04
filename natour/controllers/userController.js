console.log('Start init user controller');

const controller = {
  getAllUsers: function (req, resp) {
    resp.status(200).json({
      status: 'OK',
      message: 'This router is not yet defined',
    });
  },

  getUser: function (req, resp) {
    resp.status(200).json({
      status: 'OK',
      message: 'This router is not yet defined',
    });
  },

  createUser: function (req, resp) {
    resp.status(200).json({
      status: 'OK',
      message: 'This router is not yet defined',
    });
  },

  updateUser: function (req, resp) {
    resp.status(200).json({
      status: 'OK',
      message: 'This router is not yet defined',
    });
  },

  deleteUser: function (req, resp) {
    resp.status(200).json({
      status: 'OK',
      message: 'This router is not yet defined',
    });
  },
};

module.exports = controller;
