const { db102 } = require('../../config/db.config');
const CustomError = require('../exceptions/CustomError');

// get user by user_login
const getUserByUserLogin = async (user_login) => {
    const userByUserLogin = await db102.query(
        `
        SELECT
            a.user_login,
            a.email,
            a.phone,
            d.s_firstname,
            d.s_phone,
            d.s_address,
            d.s_city,
            d.s_zipcode
        FROM
            topan_ordering.topan_users a
        JOIN topan_ordering.topan_netofidea_stores b ON b.le_code = a.user_login
        JOIN topan_ordering.topan_netofidea_distributors c ON c.distributor_id = b.distributor_id
        JOIN topan_ordering.topan_user_profiles d ON d.user_id = a.user_id
        WHERE a.user_login = ?
        `,
        [user_login],
    );

    if (userByUserLogin.length === 0) {
        throw new CustomError('User Tidak Ditemukan', 404);
    }

    return userByUserLogin;
};

const updateUserOrdering = async (data) => {
    const update = await db102.query(
        `
        UPDATE topan_ordering.topan_user_profiles a
        JOIN topan_ordering.topan_users b ON a.user_id = b.user_id
        JOIN topan_ordering.topan_netofidea_stores c ON c.le_code = b.user_login
        JOIN topan_ordering.topan_netofidea_distributors d ON d.distributor_id = c.distributor_id
        SET a.s_zipcode=?, a.s_city=?, a.s_address=?, a.s_phone=?
        WHERE b.user_login = ?
        `,
      [data.s_zipcode, data.s_city, data.s_address, data.s_phone, data.user_login],
    );

    return update;
  };

const userOrderingModel = {
    getUserByUserLogin,
    updateUserOrdering,
};

module.exports = userOrderingModel;