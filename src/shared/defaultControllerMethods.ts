import { Response } from 'express';

export function defaultErrorHandler(error: any, res: Response) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
}
