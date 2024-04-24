import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

module {
  public type Dip721NonFungibleToken = {
    logo: LogoResult;
    name: Text;
    symbol: Text;
    maxLimit : Nat16;
  };

  public type TokenDetails = Result<Dip721NonFungibleToken, ApiError>;

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

  public type NftResult = Result<[Nft],GetNftError>;

  public type GetNftError = {
    #NoNftFound;
  };

  public type ExtendedMetadataResult = Result<{
    metadata_desc: MetadataDesc;
    token_id: TokenId;
  }, ApiError>;

  public type MetadataResult = Result<MetadataDesc, ApiError>;
  public type MetadataResultArray = Result<[MetadataDesc], ApiError>;

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

  public type CollectionDetails = {

  }

};
