import { EIP155_SIGNING_METHODS } from "@real-token/aa-core";

export const acceptedSignMethods = [
  EIP155_SIGNING_METHODS.ETH_SIGN,
  EIP155_SIGNING_METHODS.PERSONAL_SIGN,
  EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA,
  EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3,
  EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4,
];
export const acceptedSendMethods = [
  EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION,
];
export const acceptMethods = [...acceptedSignMethods, ...acceptedSendMethods];
