import type HiddenString from '../../util/hidden-string'
import type * as StellarRPCTypes from './rpc-stellar-gen'
import type * as TeamBuildingTypes from './team-building'

// When accepting the Stellar disclaimer, next path after acceptance
export type NextScreenAfterAcceptance = 'airdrop' | 'openWallet'

// Possible roles given an account and a
// transaction. senderAndReceiver means a transaction sending money
// from an account to itself.
export type Role = 'airdrop' | 'senderOnly' | 'receiverOnly' | 'senderAndReceiver' | 'none'

// Possible 'types' of things you can send or receive transactions with
export type CounterpartyType = 'airdrop' | 'keybaseUser' | 'stellarPublicKey' | 'otherAccount'

// Reserves held against an account's XLM balance
export type Reserve = {
  amount: string
  description: string // e.g. 'account' or 'KEYZ/keybase.io trust line'
}
export type SEP7Summary = StellarRPCTypes.TxDisplaySummary
export type SEP7ConfirmInfo = StellarRPCTypes.ValidateStellarURIResultLocal

export type AccountID = string
export const stringToAccountID = __DEV__
  ? (s: string): AccountID => {
      if (!s) {
        throw new Error('Invalid empty AccountID. Did you mean Types.noAccountID?')
      }
      return s
    }
  : (s: string): AccountID => s

export const accountIDToString = (accountID: AccountID): string => accountID

// No account
export const noAccountID = stringToAccountID('NOACCOUNTID')

export const isValidAccountID = (accountID: AccountID) => !!accountID && accountID !== noAccountID

export type PartnerUrl = StellarRPCTypes.PartnerUrl

// We treat PaymentIDs from the service as opaque
export type PaymentID = StellarRPCTypes.PaymentID
export const noPaymentID: PaymentID = 'NOPAYMENTID'
export const rpcPaymentIDToPaymentID = (id: StellarRPCTypes.PaymentID): PaymentID => id
export const paymentIDToRPCPaymentID = (id: PaymentID): StellarRPCTypes.PaymentID => id
export const paymentIDToString = (id: PaymentID): string => id
export const paymentIDIsEqual = (p1: PaymentID, p2: PaymentID) => p1 === p2

export type Assets = {
  assetCode: string
  availableToSendWorth: string
  balanceAvailableToSend: string
  balanceTotal: string
  canAddTrustline: boolean
  depositButtonText: string
  infoUrl: string
  infoUrlText: string
  issuerAccountID: string
  issuerName: string
  issuerVerifiedDomain: string
  name: string
  reserves: Array<Reserve>
  showDepositButton: boolean
  showWithdrawButton: boolean
  useSep24: boolean
  withdrawButtonText: string
  worth: string
  worthCurrency: string
}

export type CurrencyCode = StellarRPCTypes.OutsideCurrencyCode

export type Currency = {
  description: string
  code: CurrencyCode
  symbol: string
  name: string
}

export type Building = {
  amount: string
  bid: string
  currency: string
  from: AccountID
  isRequest: boolean
  publicMemo: HiddenString
  recipientType: CounterpartyType
  secretNote: HiddenString
  sendAssetChoices: Array<StellarRPCTypes.SendAssetChoiceLocal> | null
  to: string
}

export type BuildingAdvanced = {
  recipient: string
  recipientAmount: string
  recipientAsset: AssetDescriptionOrNative
  recipientType: CounterpartyType
  publicMemo: HiddenString
  senderAccountID: AccountID
  senderAsset: AssetDescriptionOrNative
  secretNote: HiddenString
}

export type PaymentPath = {
  sourceAmount: string
  sourceAmountMax: string
  sourceAsset: AssetDescriptionOrNative
  sourceInsufficientBalance: string // empty if sufficient
  path: Array<AssetDescriptionOrNative>
  destinationAmount: string
  destinationAsset: AssetDescriptionOrNative
}

export type BuiltPaymentAdvanced = {
  amountError: string
  destinationAccount: AccountID
  destinationDisplay: string
  exchangeRate: string
  findPathError: string
  fullPath: PaymentPath
  readyToSend: boolean
  sourceDisplay: string
  sourceMaxDisplay: string
}

export type BuiltPayment = {
  amountAvailable: string
  amountErrMsg: string
  builtBanners: Array<StellarRPCTypes.SendBannerLocal> | null
  from: AccountID
  publicMemoErrMsg: HiddenString
  publicMemoOverride: HiddenString
  readyToReview: boolean
  readyToSend: string
  secretNoteErrMsg: HiddenString
  toErrMsg: string
  worthAmount: string
  worthCurrency: string
  worthDescription: string
  worthInfo: string
  displayAmountXLM: string
  displayAmountFiat: string
  reviewBanners: Array<StellarRPCTypes.SendBannerLocal> | null
  sendingIntentionXLM: boolean
}

export type BuiltRequest = {
  amountErrMsg: string
  builtBanners?: Array<StellarRPCTypes.SendBannerLocal> | null
  readyToRequest: boolean
  secretNoteErrMsg: HiddenString
  toErrMsg: string
  worthDescription: string
  worthInfo: string
  displayAmountXLM: string
  displayAmountFiat: string
  sendingIntentionXLM: boolean
}

export type StatusSimplified =
  | 'none'
  | 'pending'
  | 'claimable'
  | 'canceled'
  | 'completed'
  | 'error'
  | 'unknown'

export type PaymentDelta = 'none' | 'increase' | 'decrease'
export type PaymentSection = 'pending' | 'history' | 'none' // where does the payment go on the wallet screen

// The various payment types below are awkward, but they reflect the
// protocol. We can clean this up once
// https://keybase.atlassian.net/browse/CORE-9234 is fixed.

export type _PaymentCommon = {
  amountDescription: string
  assetCode: string
  delta: PaymentDelta
  fromAirdrop: boolean
  error: string | null
  id: PaymentID
  note: HiddenString
  noteErr: HiddenString
  source: string
  sourceAccountID: string
  sourceAmount: string // this and sourceAsset are set if this was a path payment,
  sourceAsset: string // just code for now,
  sourceConvRate: string
  sourceIssuer: string
  sourceIssuerAccountID: AccountID
  sourceType: string
  statusSimplified: StatusSimplified
  statusDescription: string
  statusDetail: string
  showCancel: boolean
  target: string
  targetAccountID: string | null
  targetType: string
  time: number | null
  worth: string
  worthAtSendTime: string // for "(APPROXIMATELY $X.XX)" strings,
  // issuer, for non-xlm assets
  isAdvanced: boolean
  operations: Array<string> | null
  summaryAdvanced: string
  issuerDescription: string
  issuerAccountID: AccountID | null
  unread: boolean
  trustline: StellarRPCTypes.PaymentTrustlineLocal | null
}

export type PaymentResult = {
  // Ideally the section field would be in _PaymentCommon. We can
  // derive it from statusDescription, which is either "pending",
  // "completed", or "error", or once
  // https://keybase.atlassian.net/browse/CORE-9234 is fixed there
  // might be a better way.
  section: PaymentSection
} & _PaymentCommon

export type PaymentDetail = {
  externalTxURL: string
  pathIntermediate: Array<AssetDescription>
  publicMemo: HiddenString
  publicMemoType: string
  txID: string
  feeChargedDescription: string
} & _PaymentCommon

export type Payment = {} & PaymentResult & PaymentDetail

export type AssetDescription = {
  code: string
  depositButtonText: string
  infoUrl: string
  infoUrlText: string
  issuerAccountID: AccountID
  issuerName: string
  issuerVerifiedDomain: string
  showDepositButton: boolean
  showWithdrawButton: boolean
  withdrawButtonText: string
}

export type AssetDescriptionOrNative = AssetDescription | 'native'

export type Asset = 'native' | 'currency' | AssetDescription

export type BannerBackground = 'Announcements' | 'HighRisk' | 'Information'

export type Banner = {
  action?: () => void
  actionText?: string
  bannerBackground: BannerBackground
  bannerText: string
  reviewProofs?: boolean
  sendFailed?: boolean
  offerAdvancedSendForm?: StellarRPCTypes.AdvancedBanner
}

export type Account = {
  accountID: AccountID
  balanceDescription: string
  canAddTrustline: boolean
  canSubmitTx: boolean
  deviceReadOnly: boolean
  displayCurrency: Currency
  isDefault: boolean
  mobileOnlyEditable: boolean
  name: string
}

export type ValidationState = 'none' | 'waiting' | 'error' | 'valid'

export type AssetID = string
export const makeAssetID = (issuerAccountID: string, assetCode: string): AssetID =>
  `${issuerAccountID}-${assetCode}`
export const assetDescriptionToAssetID = (assetDescription: AssetDescriptionOrNative): AssetID =>
  assetDescription === 'native' ? 'XLM' : makeAssetID(assetDescription.issuerAccountID, assetDescription.code)

export type Trustline = {
  readonly acceptedAssets: Map<AccountID, Map<AssetID, number>>
  readonly acceptedAssetsByUsername: Map<string, Map<AssetID, number>>
  readonly assetMap: Map<AssetID, AssetDescription>
  readonly expandedAssets: Set<AssetID>
  readonly loaded: boolean
  readonly popularAssets: Array<AssetID>
  readonly searchingAssets?: Array<AssetID>
  readonly totalAssetsCount: number
}

export type StaticConfig = StellarRPCTypes.StaticConfig

export type State = {
  readonly acceptedDisclaimer: boolean
  readonly acceptingDisclaimerDelay: boolean
  readonly accountMap: Map<AccountID, Account>
  readonly accountName: string
  readonly accountNameError: string
  readonly accountNameValidationState: ValidationState
  readonly assetsMap: Map<AccountID, Array<Assets>>
  readonly buildCounter: number // increments when we call buildPayment / buildRequest,
  readonly building: Building
  readonly buildingAdvanced: BuildingAdvanced
  readonly builtPayment: BuiltPayment
  readonly builtPaymentAdvanced: BuiltPaymentAdvanced
  readonly builtRequest: BuiltRequest
  readonly changeTrustlineError: string
  readonly createNewAccountError: string
  readonly currencies: Array<Currency>
  readonly exportedSecretKey: HiddenString
  readonly exportedSecretKeyAccountID: AccountID
  readonly externalPartners: Array<PartnerUrl>
  readonly lastSentXLM: boolean
  readonly linkExistingAccountError: string
  readonly loadPaymentsError: string
  readonly mobileOnlyMap: Map<AccountID, boolean>
  readonly paymentCursorMap: Map<AccountID, StellarRPCTypes.PageCursor | null>
  readonly paymentLoadingMoreMap: Map<AccountID, boolean>
  readonly paymentOldestUnreadMap: Map<AccountID, PaymentID>
  readonly paymentsMap: Map<AccountID, Map<PaymentID, Payment>>
  readonly reviewCounter: number // increments when we call reviewPayment,
  readonly reviewLastSeqno?: number // last UIPaymentReviewed.seqno received from the active review,
  readonly secretKey: HiddenString
  readonly secretKeyError: string
  readonly secretKeyValidationState: ValidationState
  readonly selectedAccount: AccountID
  readonly sentPaymentError: string
  readonly sep6Error: boolean
  readonly sep6Message: string
  readonly sep7ConfirmError: string
  readonly sep7ConfirmFromQR: boolean
  readonly sep7ConfirmInfo?: SEP7ConfirmInfo
  readonly sep7ConfirmPath: BuiltPaymentAdvanced
  readonly sep7ConfirmURI: string
  readonly sep7SendError: string
  readonly staticConfig?: StaticConfig
  readonly teamBuilding: TeamBuildingTypes.TeamBuildingSubState
  readonly trustline: Trustline
  readonly unreadPaymentsMap: Map<string, number>
}
