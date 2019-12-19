import { Response } from "express";

// Response helpers
const Helper = (res: Response, statusCode: number, success: boolean, message: string, result: Array<Object> | Object | null = null): void => {
    res.json({ statusCode, success, message, result })
}

export default Helper;