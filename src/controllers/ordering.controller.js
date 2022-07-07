const userOrderingModel = require('../models/ordering.model');
require('dotenv').config();

// get user by user_login
const getUserByUserLogin = async (req, res)=>{
    try {
      if (req.headers.token === process.env.TOKEN) {
        const { user_login } = req.body;
        const dataUserOrdering = await userOrderingModel.getUserByUserLogin(user_login);

        const response = {
          code: 200,
          status: 'OK',
          message: 'Berhasil mendapatkan data User Ordering',
          data: dataUserOrdering,
        };

        return res.json(response);
      } else {
        const response = {
          code: 400,
          status: 'ERROR',
          message: 'Token tidak valid',
          data: [],
        };
        return res.status(400).send(response);
      }
      } catch (error) {
        // console.log(error);
        const response = {
          code: 400,
          status: 'ERROR',
          message: error.message,
          data: [],
        };

        return res.status(400).send(response);
      }
}

// Update user ordering
const updateUserOrdering = async (req, res) => {
  let logger = {};
  let response = {};

  try {
    if (req.headers.token === process.env.TOKEN) {
      logger = await userOrderingModel.updateUserOrdering(req.body);

      response = {
        code: 200,
        status: 'OK',
        message: 'Berhasil mengubah data User',
      };

      return res.json(response);
    } else {
      const response = {
        code: 400,
        status: 'ERROR',
        message: 'Token tidak valid',
        data: [],
      };
      return res.status(400).send(response);
    }
  } catch (error) {
    response = {
      code: 400,
      status: 'ERROR',
      message: error.message,
    };

    return res.status(400).send(response);
  }
};

const userOrderingController = {
    getUserByUserLogin,
    updateUserOrdering,
};

module.exports = userOrderingController;
