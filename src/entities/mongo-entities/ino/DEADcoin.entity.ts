import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DEADcoinSchema = new Schema(
  {
    user: {
      id: {
        type: Number,
      },
      name: {
        type: String,
      },
      wallet: {
        type: String,
      },
      giftcode: {
        type: String,
      },
    },
    referalCode: {
      type: String,
    },
    vns_data: {
      type: Number,
    },
  },
  { collection: 'DEADcoin' },
);
const DEADcoinModel = mongoose.model<mongoose.Document>(
  'DEADcoin',
  DEADcoinSchema,
);
export { DEADcoinModel, DEADcoinSchema };
export default DEADcoinModel;
