import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Trash = new Schema({
  latitude: Number,
  longitude: Number,
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Photo',
    index: true
  },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Trash', Trash)
