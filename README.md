<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ git clone https://github.com/AndreiZaretski/crypto-currency-api.git
```

```bash
$ cd  crypto-currency-api
```

```bash
$ npm install
```

```
rename file .env.example to .env
```

```bash
$ docker-compose up -d
```

## Running the app

```bash
# development watch mode
$ npm run start:prisma:dev

# production mode
$ npm run start:prisma
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Enpoints


Base url ```http://localhost:4000```



Get ```/last/```

Get ```/last/:id``` - get one pairs crypto currency

```:id``` - number or symbol. You can use id and symbol.

return value example 

``` 
[
    {
        "id": 1,
        "symbol": "MNDE-USDT",
        "price": 0.26045,
        "createdAt": "2024-02-19T14:35:59.057Z"
    },
    {
        "id": 2,
        "symbol": "NKN-USDT",
        "price": 0.127229,
        "createdAt": "2024-02-19T14:35:59.057Z"
    },... ] 

```



Get ``` /history/:id?start=2024-02-19T11:26:57.003Z&end=2024-02-19T14:28:57.033Z```

optional query params: ```start``` - start time
                       ```end```   - end time


return value example

```
[
    {
        "historyId": 63862,
        "time": "2024-02-19T11:26:57.003Z",
        "price": 5.714e-7,
        "tickerSymbol": "NIM-ETH"
    },
    {
        "historyId": 67618,
        "time": "2024-02-19T11:29:57.010Z",
        "price": 5.717e-7,
        "tickerSymbol": "NIM-ETH"
    },...]
```


Post ```/auth/login```

Post ```/auth/signup```

Body in JSON format

```
interface CreateAuthDto {
  name: string;
  password: string;
}
```
If you request OK - it return jwt token


In order to use endpoints ```/last``` and ```/history```, 
you need to log in and enter the token in the headers  "```Authorization```" type ```Bearer ``` 
or enter the following information in the header ```Authorization```: ```Auth YouCanEnter```


