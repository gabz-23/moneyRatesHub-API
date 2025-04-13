import express, { Request, Response } from 'express';
import { getRatesBolivars } from './getRatesBolivars';

const app = express();

// obtener el precio del dolar segun la query
app.get('/v1/tasa', (req: Request, res: Response) => {
    const rate = req.query.dolar as string;

    getRatesBolivars(rate).then((value) => res.json(value));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
