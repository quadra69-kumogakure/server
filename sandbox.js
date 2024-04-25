const axios = require('axios');
const {User} = require('./models');

const fetchData = async () => {
    try {
        const findUser = await User.findByPk(1);

        console.log(findUser.firstName, findUser.lastName);
    } catch (error) {
        console.log(error);
    }
};



fetchData();

