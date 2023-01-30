export default class EarnEventClaimErrorService {
    notFoundEarnEventException(earnEventId: string): Error;
    alreadyClaimed(earnEventId: string, userId: string): Error;
    notFoundAppInEarnEvent(earnEventId: string): Error;
    notClaimablePeriod(earnEventId: string): Error;
    notEnoughClaimReward(earnEventId: string): Error;
    notFoundCurrencyExchangeRate(earnEventId: string, currencyId0: string, currencyId1: string): Error;
}
