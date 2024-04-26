const {User} = require('../models');
const midtransClient = require('midtrans-client');

class paymentController {

  static async generateToken(req, res, next) {
    try {
        const findUser = await User.findByPk(req.user.id);

        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
        });

        let parameter = {
            transaction_details: {
            order_id:
                "TRANSACTION_" + Math.floor(1000000 + Math.random() * 900000),
            gross_amount: 10000,
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                first_name: findUser.firstName,
                last_name: findUser.lastName,
                email: findUser.email,
            },
        };

        const midtransToken = await snap.createTransaction(parameter)
        
        res.status(201).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = paymentController;
