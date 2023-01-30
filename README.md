<div align="center">
  <h1>Tezos Earn Event</h1>
  <br />
  <hr />
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
