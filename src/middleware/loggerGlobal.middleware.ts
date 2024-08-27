import { NextFunction, Request, Response } from "express"

export const loggerGlobal = (req: Request, res: Response, next: NextFunction) => {
    console.log(`A accedido a ${req.url} utilizando el método ${req.method} el ${(new Date()).toLocaleString()}`)
    next()
}