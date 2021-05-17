require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')


const PORT = process.env.PORT

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/note', require ('./routes/note.routes'))


app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})





async function startServer(){
 try {
await mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
app.listen(PORT || 5000, ()=> console.log(`server started on port ${PORT}`))

 }
catch (error){
    console.log('Error on server', error.message)
    process.exit(1)
}

}

startServer()


