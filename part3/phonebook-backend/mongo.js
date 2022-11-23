const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://react:${password}@cluster0.pl6cp5d.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    Note.find({}).then(result => {
      result.forEach(note => {
        console.log(note)
      })
      mongoose.connection.close()
    })
    // const note = new Note({
    //   content: 'HTML is Easy',
    //   date: new Date(),
    //   important: true,
    // })

    // return note.save()
  })
  // .then(() => {
  //   console.log('note saved!')
  //   return mongoose.connection.close()
  // })
  .catch((err) => console.log(err))