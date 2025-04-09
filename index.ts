import expres from 'express';
import { getRatesBolivars } from './getRatesBolivars';

const app = expres();

// obtener el precio del dolar segun la query
app.get('/v1/tasa', (req, res) => {
    const rate = req.query.dolar as string;

    console.log(rate);
    getRatesBolivars(rate).then((value) => res.send(value));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
