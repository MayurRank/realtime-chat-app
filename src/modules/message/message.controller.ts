import { Request, Response } from "express";
import messageModel, { IMessageDocument } from './message.model';
import ResponseHelper from '../../util/response.helper';
import { _getConversation } from '../conversation/conversation.controller';

export const fetchMessages = async (req: Request, res: Response) => {
  if (req.query.from && req.query.to) {
    const foundConversation = await _getConversation([req.query.from, req.query.to]);
    if (foundConversation) {
      const messages: IMessageDocument[] = await messageModel.find({ conversation: foundConversation });
      messages && messages.length ? ResponseHelper(res, 200, true, `Messages`, messages) : ResponseHelper(res, 404, false, `No Message Found`);
    } else {
      ResponseHelper(res, 404, false, `No Conversation Found`);
    }
  } else ResponseHelper(res, 400, false, "Missing parameters");
}

export const _setMessagesToSeen = async (data: any) => {
  if (data.from && data.to) {
    return await messageModel.updateMany({ from: data.from, to: data.to },{$set: { seen: true }},{ multi: true});
  }
}

export const _addMessage = async (data: IMessageDocument | any) => {
  if (data) {
    return await messageModel.create(data);
  }
}