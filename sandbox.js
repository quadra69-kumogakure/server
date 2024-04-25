const axios = require('axios');

const fetchData = async () => {
    try {
        const {data} = await axios({
            method : 'GET',
            url : 'https://messenger.stipop.io/v1/search',
            headers : {
                apikey : "c249b161249f7b8802d55eddc2d7e566"
            },
            params : {
                userId : "9937",
                q : "Excited"
            }
        })
        
        const response = data.body.stickerList;
        const stickers = response.map((el) => {
            const {keyword, stickerImg} = el;

            return {
                title : keyword, 
                url : stickerImg
            }
        });

        console.log(stickers)
    } catch (error) {
        console.log(error);
    }
};



fetchData();

