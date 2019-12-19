import { Schema, Document, model } from "mongoose";

export type IMessageDocument = Document & {
  from: string,
  to: string,
  message: string,
  seen: Boolean,
  conversation: string
};

const messageSchema = new Schema({
  from: { type: Schema.Types.ObjectId },
  to: { type: Schema.Types.ObjectId },
  message: { type : String, default : '', trim : true },
  seen: Boolean,
  conversation: { type: Schema.Types.ObjectId }
}, { timestamps: true });

export default model<IMessageDocument>("Message", messageSchema);
