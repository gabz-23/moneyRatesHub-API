import express, { Request, Response } from 'express';
import { getRatesBolivars } from './getRatesBolivars';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// renderiza la pagina principal
app.get('/', (req: Request, res: Response) => res.sendFile(__dirname + '/public/index.html'));

// obtener el precio del dolar segun la query
app.get('/api/v1/tasa', (req: Request, res: Response) => {
    const rate = req.query.dolar as string;

    getRatesBolivars(rate).then((value) => res.json(value));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
