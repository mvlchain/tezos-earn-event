export default class EarnEventClaimErrorService {
  notFoundEarnEventException(earnEventId: string) {
    return new Error(`Not Found Earn Event by ${earnEventId}`);
  }

  alreadyClaimed(earnEventId: string, userId: string) {
    return new Error(`Already Claimed Earn Event ${earnEventId} by user ${userId}`);
  }

  notFoundAppInEarnEvent(earnEventId: string) {
    return new Error(`Not Found App In Earn Event ${earnEventId}`);
  }

  notClaimablePeriod(earnEventId: string) {
    return new Error(`Not Claimable Period Earn Event: ${earnEventId}`);
  }

  notEnoughClaimReward(earnEventId: string) {
    return new Error(`Not Enough Claim Reward For Earn Event ${earnEventId}`);
  }

  notFoundCurrencyExchangeRate(earnEventId: string, currencyId0: string, currencyId1: string) {
    return new Error(
      `Not Found Exchange Rate ${currencyId0}, ${currencyId1} for Earn Event ${earnEventId}`,
    );
  }
}
