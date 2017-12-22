import mongoose from 'mongoose'
const Schema = mongoose.Schema

const GarbageBinLog = new Schema({
  garbageBin: {
    type: Schema.Types.ObjectId,
    ref: 'GarbageBin',
    index: true
  },
  /**
   * In centimeter
   * @type {String}
   */
  elevation: String,
  /**
   * Percentage, 0 - 100
   * @type {String}
   */
  humidity: String,
  /**
   * In celcius
   * @type {String}
   */
  temperature: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('GarbageBinLog', GarbageBinLog)
