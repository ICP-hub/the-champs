// import { Principal } from "@dfinity/principal";
// import { ENV } from "../config/env";
// import crc32 from "buffer-crc32";
// import { Buffer } from "buffer";
// import crypto from "crypto-js";
// import { newArtemis } from "../useWalletInit";

// var supportedTokenList = [];
// var tokenListObj = {};
// var natLabsToken = [];

// export const getNatLabsToken = () => {
//   return natLabsToken;
// };

// function waitWithTimeout(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => reject(new Error("Timeout")), ms);
//   });
// }

// export const fetchNatLabsToken = async () => {
//   var actor = await getswapActor(true);
//   if (actor?.getNatLabsToken) {
//     var data = await actor?.getNatLabsToken();
//     if (data.length > 0) {
//       data.forEach((el) => {
//         if (el[0] && el[1]) natLabsToken.push(el[0]);
//       });
//     }
//   }
// };

// export const loadsupportedTokenList = async () => {
//   supportedTokenList = useSwapCanisterStore()?.supportedTokenList;
//   if (!supportedTokenList || Object.keys(tokenListObj).length > 0) return false;
//   supportedTokenList.forEach((el) => {
//     tokenListObj[el.id] = el;
//   });
//   fetchNatLabsToken();
// };

// export const tokenList = (returnType, tokenId) => {
//   return returnType == "array" && !tokenId
//     ? supportedTokenList
//     : !tokenId
//     ? tokenListObj
//     : tokenListObj[tokenId];
// };

// export const getTokenActor = async (canisterId, isAnnon) => {
//   var token = tokenListObj?.[canisterId];
//   if (!token) return false;
//   var actor = false;
//   var idl =
//     token.tokenType == "DIP20"
//       ? TokenIDL.DIP20.factory
//       : token.tokenType == "YC"
//       ? TokenIDL.DIP20.YCfactory
//       : token.tokenType.toLowerCase() == "icrc1"
//       ? TokenIDL.ICRC1.factory
//       : token.tokenType.toLowerCase() == "icrc2"
//       ? TokenIDL.ICRC2.factory
//       : TokenIDL.DIP20.factory;

//   if (token?.symbol == "SNEED") {
//     idl = TokenIDL.SNEED;
//   }
//   if (isAnnon == false && !newArtemis.provider) {
//     await newArtemis.autoConnect();
//   }
//   actor = await newArtemis.getCanisterActor(token.id, idl, isAnnon);
//   return actor;
// };

// export const getswapActor = async (isAnnon) => {
//   if (!isAnnon && !newArtemis.provider) {
//     await newArtemis.autoConnect();
//   }
//   var actor = await newArtemis.getCanisterActor(
//     ENV.canistersPrincipalIDs.swap,
//     SwapIDL.factory,
//     isAnnon
//   );
//   return actor;
// };

// export const getSwapCapActor = async (isAnnon) => {
//   if (!isAnnon && !newArtemis.provider) {
//     await newArtemis.autoConnect();
//   }
//   var actor = await newArtemis.getCanisterActor(
//     ENV.canistersPrincipalIDs.swapCapRoot,
//     capCanIDL.factory,
//     isAnnon
//   );
//   return actor;
// };

// //not using

// export const getTokenLogo = async (canisterId) => {
//   var token = tokenListObj?.[canisterId];
//   if (!token) return "";
//   var tokenLogo = "";
//   var tokenActor = await getTokenActor(token.id, true);
//   var tokenType = token?.tokenType.toLowerCase();

//   try {
//     if (tokenType == "dip20" || tokenType == "yc") {
//       tokenLogo = await tokenActor.logo();
//     } else if (tokenType == "icrc1" || tokenType == "icrc2") {
//       tokenLogo = "https://d15bmhsw4m27if.cloudfront.net/sonic/" + token.id;
//     }
//   } catch (error) {
//     tokenLogo = "";
//   }
//   return tokenLogo;
// };

// export const getTokenBalance = async (canisterId, principalId) => {
//   var tokenInfo = tokenListObj?.[canisterId];
//   var tokenBalance = BigInt(0);
//   if (!tokenInfo) {
//     return tokenBalance;
//   }
//   var prin = newArtemis.principalId ? newArtemis.principalId : principalId;
//   if (!prin) return tokenBalance;
//   try {
//     var tokenActor = await getTokenActor(tokenInfo.id, true);
//     var tokenType = tokenInfo?.tokenType.toLowerCase();
//     if (tokenType == "dip20" || tokenType == "yc") {
//       tokenBalance = await Promise.race([
//         tokenActor.balanceOf(Principal.fromText(prin)),
//         waitWithTimeout(10000),
//       ]);
//     } else if (tokenType == "icrc1" || tokenType == "icrc2") {
//       tokenBalance = await Promise.race([
//         tokenActor.icrc1_balance_of({
//           owner: Principal.fromText(prin),
//           subaccount: [],
//         }),
//         waitWithTimeout(10000),
//       ]);
//     }
//   } catch (error) {
//     tokenBalance = BigInt(0);
//   }
//   return tokenBalance;
// };

// export const getTokenAllowance = async (canisterId) => {
//   var allowance = BigInt(0);
//   var tokenInfo = tokenListObj?.[canisterId];
//   if (!tokenInfo || !newArtemis.principalId) return allowance;
//   try {
//     var tokenActor = await getTokenActor(canisterId, true);
//     var tokenType = tokenInfo?.tokenType.toLowerCase();

//     if (tokenType == "dip20" || tokenType == "yc") {
//       allowance = await tokenActor.allowance(
//         Principal.fromText(newArtemis.principalId),
//         Principal.fromText(ENV.canistersPrincipalIDs.swap)
//       );
//     } else if (tokenType == "icrc2") {
//       var allowanceData = await tokenActor.icrc2_allowance({
//         account: {
//           owner: Principal.fromText(newArtemis.principalId),
//           subaccount: [],
//         },
//         spender: {
//           owner: Principal.fromText(ENV.canistersPrincipalIDs.swap),
//           subaccount: [],
//         },
//       });
//       allowance = allowanceData?.allowance
//         ? allowanceData.allowance
//         : BigInt(0);
//     } else allowance = BigInt(0);
//   } catch (error) {
//     allowance = BigInt(0);
//   }
//   return allowance;
// };

// export const toHexString = (byteArray) => {
//   return Array.from(byteArray, function (byte) {
//     return ("0" + (byte & 0xff).toString(16)).slice(-2);
//   }).join("");
// };

// export const fromHexString = (hex) => {
//   if (!hex) return [];
//   if (hex.substr(0, 2) === "0x") hex = hex.substr(2);
//   for (var bytes = [], c = 0; c < hex.length; c += 2)
//     bytes.push(parseInt(hex.substr(c, 2), 16));
//   return bytes;
// };

// export const checkAddressType = (address) => {
//   if (address.length < 23) return "invalid";
//   if (isValidAccountId(address)) return "accountId";
//   else if (isPrincipalId(address)) return "principalId";
//   else return "invalid";

//   function isPrincipalId(id) {
//     try {
//       Principal.fromText(id);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }
//   function isValidAccountId(accountId) {
//     const accountIdRegex = /^[A-Fa-f0-9]{64}$/;
//     return accountIdRegex.test(accountId);
//   }
// };

// const ACCOUNT_DOMAIN_SEPERATOR = "\x0Aaccount-id";
// const SUB_ACCOUNT_ZERO = Buffer.alloc(32);

// const byteArrayToWordArray = (byteArray) => {
//   const wordArray = [];
//   let i;
//   for (i = 0; i < byteArray.length; i += 1) {
//     wordArray[(i / 4) | 0] |= byteArray[i] << (24 - 8 * i);
//   }
//   const result = crypto.lib.WordArray.create(wordArray, byteArray.length);
//   return result;
// };

// const wordToByteArray = (word, length) => {
//   const byteArray = [];
//   const xFF = 0xff;
//   if (length > 0) byteArray.push(word >>> 24);
//   if (length > 1) byteArray.push((word >>> 16) & xFF);
//   if (length > 2) byteArray.push((word >>> 8) & xFF);
//   if (length > 3) byteArray.push(word & xFF);

//   return byteArray;
// };

// const wordArrayToByteArray = (wordArray, length) => {
//   if (
//     wordArray.hasOwnProperty("sigBytes") &&
//     wordArray.hasOwnProperty("words")
//   ) {
//     length = wordArray.sigBytes;
//     wordArray = wordArray.words;
//   }

//   let result = [];
//   let bytes;
//   let i = 0;
//   while (length > 0) {
//     bytes = wordToByteArray(wordArray[i], Math.min(4, length));
//     length -= bytes.length;
//     result = [...result, bytes];
//     i++;
//   }
//   return [].concat.apply([], result);
// };

// const generateChecksum = (hash) => {
//   const crc = crc32.unsigned(Buffer.from(hash));
//   const hex = intToHex(crc);
//   return hex.padStart(8, "0");
// };

// const intToHex = (val) =>
//   val < 0 ? (Number(val) >>> 0).toString(16) : Number(val).toString(16);

// export const getAccountIdFromPrincipalId = (principalId) => {
//   try {
//     var principal = Principal.from(principalId);
//     const sha = crypto.algo.SHA224.create();
//     sha.update(ACCOUNT_DOMAIN_SEPERATOR);
//     sha.update(byteArrayToWordArray(principal.toUint8Array()));
//     const subBuffer = Buffer.from(SUB_ACCOUNT_ZERO);

//     sha.update(byteArrayToWordArray(subBuffer));
//     const hash = sha.finalize();
//     const byteArray = wordArrayToByteArray(hash, 28);
//     const checksum = generateChecksum(byteArray);
//     const val = checksum + hash.toString();
//     return val;
//   } catch (error) {
//     return "";
//   }
// };

// export const getPrincipalFromText = (prin) => {
//   try {
//     return Principal.fromText(prin);
//   } catch (error) {
//     return false;
//   }
// };
