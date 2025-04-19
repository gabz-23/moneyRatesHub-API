# MONEY DATE HUB API

La API esta desarrollada para obtener las tasas en bolivares de dolares en distintas
plataformas de comercio electronico. En la documentacion se encuentra la informacion de las
plataformas que se pueden consultar.

[Sitio deplegado](https://moneyrateshub-api.fly.dev/)

## Plataformas

| Plataforma     | Query         |
| -------------- | ------------- |
| Dolar BCV      | dolarbcv      |
| Dolar Monitor  | dolarmonitor  |
| Dolar Promedio | dolarpromedio |
| Cripto Dolar   | criptodolar   |
| Dolar Binance  | dolarbinance  |
| Dolar Paypal   | dolarpaypal   |
| Dolar Uphold   | dolaruphold   |
| Dolar Skrill   | dolarskrill   |

### Consumo de la API

El consumo de la API se realiza mediante una peticion GET a la siguiente URL:

`https://moneyrateshub-api.fly.dev/api/v1/tasa?dolar=dolarbcv`

La query de la peticion debe tener el nombre de la plataforma que se desea consultar. tal y
como se muestra en la tabla de arriba.
