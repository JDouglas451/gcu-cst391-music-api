import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

// convert times to ms strings
const getProcessingTimeInMS = (time: [number, number]): string => {
    return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)} ms`;
};

// logs with request IDs and timestamps for the start and end of each API request
export default function logger(req: Request, res: Response, next: NextFunction) {
    // generate unique identifier
    const id = uuidv4();

    // get timestamp
    const now = new Date();
    const timestamp = [
        now.getFullYear(), '-', now.getMonth() + 1, '-', now.getDate(), ' ',
        now.getHours(), ':', now.getMinutes(), ':', now.getSeconds()
    ].join('');

    // get api endpoint
    const { method, url } = req;

    // log start of execution process
    const start = process.hrtime();
    const start_text = `START:${getProcessingTimeInMS(start)}`;
    const id_text = `[${id}]`;
    const timestamp_text = `[${timestamp}]`;

    // show completed entry text
    console.log(`${id_text}${timestamp_text} ${method}:${url} ${start_text}`);

    // trigger once a response is sent
    res.once('finish', () => {
        // log end of execution process
        const end = process.hrtime(start);
        const end_text = `END:${getProcessingTimeInMS(end)}`;
        
        console.log(`${id_text}${timestamp_text} ${method}:${url} ${end_text}`);
    });

    // execute next middleware/event handler
    next();
};
