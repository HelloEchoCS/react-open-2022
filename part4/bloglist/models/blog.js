const config = require('../utils/config');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

logger.info('Connecting to MongoDB...');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});
const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.MONGO_URL).then(() => logger.info('Connected to MongoDB!'));
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Blog;