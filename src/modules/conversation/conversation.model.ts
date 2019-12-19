import { Schema, Document, model } from "mongoose";

export type IConversationDocument = Document & {
  participants: [string]
};

const messageSchema = new Schema({
  participants: [Schema.Types.ObjectId]
}, { timestamps: true });

export default model<IConversationDocument>("Conversation", messageSchema);
