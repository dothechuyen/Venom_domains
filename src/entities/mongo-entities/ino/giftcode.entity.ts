import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const giftcodeSchema = new Schema(
  {
    code: {
      type: String,
    },
    isUsed: {
      type: Boolean,
    },
    usedBy: {
      type: String,
    },
  },
  { collection: 'giftcode' },
);
const giftcodeModel = mongoose.model<mongoose.Document>(
  'giftcode',
  giftcodeSchema,
);
export { giftcodeModel, giftcodeSchema };
export default giftcodeModel;
