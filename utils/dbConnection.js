const { connect } = require("mongoose");


exports.dbConnection = (mongoURL) => {
    connect(mongoURL).then(() => { console.log(`Database Connected : ${process.env.MONGO_URL.split('/')[3]}`) }).catch((err) => { console.log(err) })
}