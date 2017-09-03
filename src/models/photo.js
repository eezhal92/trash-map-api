import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Photo = new Schema({
  filename: String,
  url: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Photo', Photo)
