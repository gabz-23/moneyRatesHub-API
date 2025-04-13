import puppeteer from 'puppeteer';
import { Rate } from './interfaces';

export async function getRatesBolivars(rate: string): Promise<Rate | {}> {
    const browser = await puppeteer.launch({
        headless: true, // También puedes probar con false
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto('https://criptodolar.net/');

    await page.waitForSelector('tr');

    const platforms: { [key: string]: string } = {
        dolarbcv: 'Dólar BCV',
        dolarmonitor: 'Dólar Monitor',
        dolarpromedio: 'Dólar Promedio',
        criptodolar: 'Cripto Dólar',
        dolarbinance: 'Dólar Binance',
        dolarpaypal: 'Dólar Paypal',
        dolaruphold: 'Dólar Uphold',
        dolarskrill: 'Dólar Skrill',
    };

    if (!platforms[rate]) {
        return {};
    }

    let targetValue: string = await page.$$eval(
        'tr',
        (row, platforms) => {
            return row
                .find((el) => el.textContent?.includes(platforms))
                ?.textContent?.split('\n')[1] as string;
        },
        platforms[rate]
    );

    const value = parseFloat(targetValue.replace('Bs. ', '').replace(',', '.').trim());

    await browser.close();

    return {
        name: platforms[rate],
        value,
    };
}
