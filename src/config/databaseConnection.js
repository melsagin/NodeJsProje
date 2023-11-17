const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_CONECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
    .then(() => {
        console.log("Veritabanına Başarıyla Bağlandı");
    })
    .catch((err) => {
        console.log("Veritabanına Bağlanılamadı : " + err);
    })