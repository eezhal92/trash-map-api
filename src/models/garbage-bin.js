import mongoose from 'mongoose'
const Schema = mongoose.Schema

const GarbageBin = new Schema({
  name: String,
  address: String,
  latitude: Number,
  longitude: Number,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('GarbageBin', GarbageBin)
