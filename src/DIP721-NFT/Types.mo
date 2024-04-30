import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Types "../DIP-20/types";

module {
  public type Dip721NonFungibleToken = {
    logo: LogoResult;
    bannerImage : LogoResult;
    name: Text;
    symbol: Text;
    description: Text;
    created_at: Time.Time;
    updated_at: Time.Time;
    maxLimit : Nat16;
  };

  public type TokenDetails = Result<Dip721NonFungibleToken, ApiError>;

  public type Dip721Transfererror = {
    #ZeroAddress;
    #Unauthorized;
    #InvalidTokenId;
    #Other;
  };

  public type FractionalNFT = {
    nft: Nft;
    fractional_token : Types.Metadata;
  };



  public type FractionalNFTError = {
    #CollectionNotFound;
  };

  public type FractionalNFTResult = Result<FractionalNFT, FractionalNFTError>; 

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

  public type CollectionDetials = {
    canister_id : Principal;
    data : Dip721NonFungibleToken;
  };

  public type NftResult = Result<Nft,GetNftError>;

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

  };

    public type ContactId = Text;

    public type UserContact = {
        name : Text;
        email : Text;
        message : Text;
        contact_number : Text;
    };

    public type Contact = UserContact and {
        id : ContactId;
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    public type CreateContactError = {
        #EmptyName;
        #EmptyEmail;
        #EmptyMessage;
    };

    public type GetContactError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #ContactNotFound;
    };

    public type DeleteContactError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
    };

    public type UpdateContactError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyName;
        #EmptyEmail;
        #EmptyMessage;
        #ContactNotFound;
    };
};
