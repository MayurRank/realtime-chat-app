import { Request, Response } from "express";
import conversationModel, { IConversationDocument } from './conversation.model';
import ResponseHelper from '../../util/response.helper';

export const _getConversation = async (participants: string[]) => {
  if (participants) {
    return await conversationModel.findOne({ participants: { $all: participants } });
  }
}

export const _addConversation = async (data: IConversationDocument | any) => {
  if (data) {
    const foundConversation = await _getConversation(data.participants);
    if (foundConversation) {
      return foundConversation;
    }
    return await conversationModel.create(data);
  }
}