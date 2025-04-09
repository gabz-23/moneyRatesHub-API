import puppeteer from 'puppeteer';

export async function getRatesBolivars(rate: string): Promise<string> {
    const browser = await puppeteer.launch({
        headless: true, // También puedes probar con false
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.goto('https://criptodolar.net/', {
        waitUntil: 'networkidle0', // Espera a que terminen las peticiones
    });

    const dollarPrice = await page.evaluate((rate) => {
        const rates: { [key: string]: string } = {
            dolarbcv: 'Dólar BCV',
            dolarmonitor: 'Dólar Monitor',
            dolarpromedio: 'Dólar Promedio',
            criptodolar: 'Cripto Dólar',
            dolarbinance: 'Dólar Binance',
            dolarpaypal: 'Dólar Paypal',
            dolaruphold: 'Dólar Uphold',
            dolarskrill: 'Dólar Skrill',
        };

        const rows = Array.from(document.querySelectorAll('tr'));
        const targetRow = rows.find((row) => row.textContent?.includes(rates[rate]));

        if (targetRow) {
            const value = targetRow.querySelectorAll('td')[1];
            return value.textContent?.split('Bs. ')[1].trim();
        }

        return null;
    }, rate);

    await browser.close();
    return dollarPrice || 'No encontrado';
}
