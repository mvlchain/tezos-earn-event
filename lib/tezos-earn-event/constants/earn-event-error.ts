import DefaultError from '../../default-error';

enum ThirdPartyErrorCodeEnum {
  NOT_FOUND_APP = 'NOT_FOUND_APP',
  NOT_FOUND_CONNECTION_INFO = 'NOT_FOUND_CONNECTION_INFO',
  INVALID_JWT_TOKEN = 'INVALID_JWT_TOKEN',
  ALREADY_CONNECTED = 'ALREADY_CONNECTED',
  NOT_FOUND_CURRENCY = 'NOT_FOUND_CURRENCY',
  NOT_MATCHED_USER = 'NOT_MATCHED_USER',
  NOT_FOUND_EVENT = 'NOT_FOUND_EVENT',
  INVALID_KEY = 'INVALID_KEY',
  NOT_FOUND_EVENT_PARTICIPATION_LOG = 'NOT_FOUND_EVENT_PARTICIPATION_LOG',
  EXCEEDED_MAXIMUM_PARTICIPATION = 'EXCEEDED_MAXIMUM_PARTICIPATION',
  EXCEEDED_MAXIMUM_PARTICIPATION_PER_DAY = 'EXCEEDED_MAXIMUM_PARTICIPATION_PER_DAY',
  EXCEEDED_MAXIMUM_REWARD = 'EXCEEDED_MAXIMUM_REWARD',
  NOT_EVENT_PERIOD = 'NOT_EVENT_PERIOD',
}

export default class EarnEventErrorService extends DefaultError {
  notFoundApp(appId: string) {
    return new Error(
      this.returnErrorObject(`Not Found App: by ${appId}`, ThirdPartyErrorCodeEnum.NOT_FOUND_APP),
    );
  }

  notFoundAppAndIdentifier(appId: string, identifier?: string) {
    return new Error(
      this.returnErrorObject(
        `Not Found connection info by appId: ${appId}${
          identifier ? ` and identifer: ${identifier}` : ''
        }`,
        ThirdPartyErrorCodeEnum.NOT_FOUND_CONNECTION_INFO,
      ),
    );
  }

  invaliedThirdPartyJwt(appId: string, jwtToken: string) {
    return new Error(
      this.returnErrorObject(
        `Invalied JWT token: "${jwtToken}" for ${appId}`,
        ThirdPartyErrorCodeEnum.INVALID_JWT_TOKEN,
      ),
    );
  }

  alreadyConnectedUser(appId: string, thirdParyUserIdentifier: string) {
    return new Error(
      this.returnErrorObject(
        `Already connected to ${appId} by identifier ${thirdParyUserIdentifier}`,
        ThirdPartyErrorCodeEnum.ALREADY_CONNECTED,
      ),
    );
  }

  notFoundCurrency(alias: string) {
    return new Error(
      this.returnErrorObject(
        `Not Found Currency by alias: ${alias}`,
        ThirdPartyErrorCodeEnum.NOT_FOUND_CURRENCY,
      ),
    );
  }

  notMatchThirdPartyIdentifierAndUserId(
    appId: string,
    userId: string,
    thirdPartyUserIdentifier: string,
  ) {
    return new Error(
      this.returnErrorObject(
        `Not Matched UserId: ${userId} and identifier: ${thirdPartyUserIdentifier} In Third Party App: ${appId}`,
        ThirdPartyErrorCodeEnum.NOT_MATCHED_USER,
      ),
    );
  }

  notFoundEarnEventByAppIdAndEarnEventAlias(earnEventAlias: string) {
    return new Error(
      this.returnErrorObject(
        `Not Found Earn Event by earn event alias ${earnEventAlias}`,
        ThirdPartyErrorCodeEnum.NOT_FOUND_EVENT,
      ),
    );
  }

  invaliedKeyOfEarnEvent(earnEventAlias: string, key: string) {
    return new Error(
      this.returnErrorObject(
        `Invalied key ${key} in earn event ${earnEventAlias}`,
        ThirdPartyErrorCodeEnum.INVALID_KEY,
      ),
    );
  }

  notFoundEarnEventParticipationLog(appAlias: string, requestId: string) {
    return new Error(
      this.returnErrorObject(
        `Not Found Earn Event Participation Log by app alias ${appAlias} and request id ${requestId}`,
        ThirdPartyErrorCodeEnum.NOT_FOUND_EVENT_PARTICIPATION_LOG,
      ),
    );
  }

  overFlowedMaximumParticipation(earnEventAlias: string) {
    return new Error(
      this.returnErrorObject(
        `Exceeded the maximum number of Event ${earnEventAlias} participants`,
        ThirdPartyErrorCodeEnum.EXCEEDED_MAXIMUM_PARTICIPATION,
      ),
    );
  }

  overFlowedMaximumParticipationSumPerDay(earnEventAlias: string) {
    return new Error(
      this.returnErrorObject(
        `Exceeded the maximum number of Event ${earnEventAlias} participants per a day`,
        ThirdPartyErrorCodeEnum.EXCEEDED_MAXIMUM_PARTICIPATION_PER_DAY,
      ),
    );
  }

  overFlowedMaximumReward(earnEventAlias: string) {
    return new Error(
      this.returnErrorObject(
        `Exceeded the maximum reward of Event ${earnEventAlias}`,
        ThirdPartyErrorCodeEnum.EXCEEDED_MAXIMUM_REWARD,
      ),
    );
  }

  notEventPeriod(earnEventAlias: string) {
    return new Error(
      this.returnErrorObject(
        `Not Event Period Earn Event: ${earnEventAlias}`,
        ThirdPartyErrorCodeEnum.NOT_EVENT_PERIOD,
      ),
    );
  }
}
