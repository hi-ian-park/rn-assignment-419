export namespace Http {
  export enum Status {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServer = 500,
  }
}

export namespace ErrorCode {
  export enum Service {
    NotFound = 'error_000006',
    AlreadyInUseCoupon = 'error_000010',
    InvalidCoupon = 'error_000017',
    ExpiredCoupon = 'error_000019',
    NotAvailableItem = 'error_000027',
    InvalidPhoneNumber = 'error_000032',
    InvalidVerificationCode = 'error_000028',
    InvalidReferralCode = 'error_000029',
    NotExistVerification = 'error_000030',
    VerificationExpired = 'error_000031',
    AlreadyVerifiedReferee = 'error_000033',
    NotPassed2FA = 'error_000034', // https://sodacrew.atlassian.net/browse/MSG-178 에 나와있는 2FA Configuration 중에 pinAttempts만 000035로 구분 (Jade, 220420)
    NoMoreVerificationAttempts = 'error_000035', // 현재 인증코드당 최대 20회 (Jade, 220420)
  }
  export enum Auth {
    AlreadyInUseEmailByOtherProvider = 'error_000001',
    IncorrectCredentials = 'error_000004',
    InvalidPasswordFormat = 'error_000005',
    NotFound = 'error_000006',
    InvalidEmailActivationKey = 'error_000006',
    AlreadyActivatedEmail = 'error_000007',
    ExpiredResetKey = 'error_000008',
    UserNameForSignupNotFound = 'error_000009',
  }
}
