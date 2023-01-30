import DefaultError from '../../default-error';
export default class EarnEventErrorService extends DefaultError {
    notFoundApp(appId: string): Error;
    notFoundAppAndIdentifier(appId: string, identifier?: string): Error;
    invaliedThirdPartyJwt(appId: string, jwtToken: string): Error;
    alreadyConnectedUser(appId: string, thirdParyUserIdentifier: string): Error;
    notFoundCurrency(alias: string): Error;
    notMatchThirdPartyIdentifierAndUserId(appId: string, userId: string, thirdPartyUserIdentifier: string): Error;
    notFoundEarnEventByAppIdAndEarnEventAlias(earnEventAlias: string): Error;
    invaliedKeyOfEarnEvent(earnEventAlias: string, key: string): Error;
    notFoundEarnEventParticipationLog(appAlias: string, requestId: string): Error;
    overFlowedMaximumParticipation(earnEventAlias: string): Error;
    overFlowedMaximumParticipationSumPerDay(earnEventAlias: string): Error;
    overFlowedMaximumReward(earnEventAlias: string): Error;
    notEventPeriod(earnEventAlias: string): Error;
}
