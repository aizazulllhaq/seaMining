const { connect } = require("mongoose")

exports.dbConnection = () => {

    connect(process.env.MONGO_URL).then(() => console.log("Database Connected : ${process.env.MONGO_URL.split('/')[3]}"))
}