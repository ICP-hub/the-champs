import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";

module {
  public type Dip721NonFungibleToken = {
    logo: LogoResult;
    name: Text;
    symbol: Text;
    maxLimit : Nat16;
  };

  public type Dip721Transfererror = {
    #ZeroAddress;
    #Unauthorized;
    #InvalidTokenId;
    #Other;
  };

  public type ApiError = {
    #Unauthorized;
    #InvalidTokenId;
    #ZeroAddress;
    #Other;
  };

  public type Result<S, E> = {
    #Ok : S;
    #Err : E;
  };

  public type OwnerResult = Result<Principal, ApiError>;
  public type TxReceipt = Result<Nat, ApiError>;
  public type TransactionId = Nat;
  public type TokenId = Nat64;
  public type Locktoken = {
    #LockedSuccessfully;
  };

  public type LockTokenError = {
    #ZeroAddress;
    #Unauthorized;
    #InvalidTokenId;
    #AlreadyLocked;
  };

  public type Unlocktoken = {
    #UnlockedSuccessfully;
  };

  public type UnlockTokenError = {
    #ZeroAddress;
    #Unauthorized;
    #InvalidTokenId;
    #AlreadyUnlocked;
  };
  
  
  public type InterfaceId = {
    #Approval;
    #TransactionHistory;
    #Mint;
    #Burn;
    #TransferNotification;
  };

  public type LogoResult = {
    logo_type: Text;
    data: Text;
  };

  public type Nft = {
    owner: Principal;
    id: TokenId;
    metadata: MetadataDesc;
    locked: Bool;
    forsale: Bool;
  };

  public type ExtendedMetadataResult = Result<{
    metadata_desc: MetadataDesc;
    token_id: TokenId;
  }, ApiError>;

  public type MetadataResult = Result<MetadataDesc, ApiError>;

  public type MetadataDesc = [MetadataPart];

  public type MetadataPart = {
    purpose: MetadataPurpose;
    key_val_data: [MetadataKeyVal];
    data: Blob;
  };

  public type MetadataPurpose = {
    #Preview;
    #Rendered;
  };
  
  public type MetadataKeyVal = {
    key: Text;
    val: MetadataVal;
  };

  public type MetadataVal = {
    #TextContent : Text;
    #BlobContent : Blob;
    #NatContent : Nat;
    #Nat8Content: Nat8;
    #Nat16Content: Nat16;
    #Nat32Content: Nat32;
    #Nat64Content: Nat64;
  };

  public type MintReceipt = Result<MintReceiptPart, ApiError>;

  public type AddCustodianError = {
    #Unauthorized;
    #ZeroAddress;
    #AlreadyCustodian;
  };

  public type AddCustodian = {
    #CustodianAdded;
  };

  public type MintReceiptPart = {
    token_id: TokenId;
    id: Nat;
  };

   public type dip721class = actor {
    balanceOfDip721 : shared query Principal -> async Nat64;
    getMaxLimitDip721 : shared query () -> async Nat16;
    getMetadataDip721 : shared query TokenId -> async MetadataResult;
    getMetadataForUserDip721 :
      shared Principal -> async ExtendedMetadataResult;
    getTokenIdsForUserDip721 : shared query Principal -> async [TokenId];
    lockDip721 : shared TokenId -> async Result<Locktoken, LockTokenError>;
    logoDip721 : shared query () -> async LogoResult;
    mintDip721 : shared (Principal, MetadataDesc) -> async MintReceipt;
    nameDip721 : shared query () -> async Text;
    ownerOfDip721 : shared query TokenId -> async OwnerResult;
    safeTransferFromDip721 :
      shared (Principal, Principal, TokenId) -> async TxReceipt;
    supportedInterfacesDip721 : shared query () -> async [InterfaceId];
    symbolDip721 : shared query () -> async Text;
    totalSupplyDip721 : shared query () -> async Nat64;
    transferFromDip721 :
      shared (Principal, Principal, TokenId) -> async TxReceipt;
    unlockDip721 :
      shared TokenId -> async Result<Unlocktoken, UnlockTokenError>
  };
};
