<div align="center">
  <h1>Tezos Earn Event</h1>
  <br />
</div>

## What is Tezos Earn Event?

"Tezos Earn Event" is a package that allows you to provide XTZs to specific users based on points.
You can only implement Repository in NestJS, NextJS, and ExpressJS and use it by entering Tezos Wallet information.


- [**setPoint**]: You can add as many points as you enter for a specific user. <br/>
In this case, exceptions are made to meet constraints such as maximum number of participations and maximum number of coins earned, depending on the event.
- [**getClaimInformation**]: The points acquired by the user are calculated and returned by the value of the fee set in the event, the amount of coins per point, etc. 
- [**claim**]: Calculate the amount of coins to receive according to the points the user has made and send them from the tezos wallet entered in advance.

> **The Repository must be implemented separately for the interfaces provided so that data can be maintained.**.

## Getting started

```ts
  const currencyRepo = new CurrencyRepository();
  const earnEventRepo = new EarnEventRepository();
  const earnEventClaimRepo = new EarnEventClaimRepository();
  const participationLogRepo = new ParticipationLogRepository();

  const tezosEarnEvent = new TezosEarnEvent(
    {
      address: 'xtz wallet address',
      privateKey: 'private key of wallet address',
    },
    participationLogRepo,
    earnEventRepo,
    currencyRepo,
    earnEventClaimRepo,
  );

  // set point
  await tezosEarnEvent.setPoint('event alias', '1', 'ko', 'unique string per request');

  // get claim information
  await tezosEarnEvent.getClaimInformation('earn event id', 'user id');

  // request claim information
  await tezosEarnEvent.claim('event id', 'user id to receive', 'xtz address to receive');

```

## License
 
The MIT License (MIT)

Copyright (c) 2023 MVL

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
