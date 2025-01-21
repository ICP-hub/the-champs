import Nat64 "mo:base/Nat64";
module {
    public type User = {
        profileimage : Text;
        firstName : Text;
        lastName : Text;
        email : Text;
        twitter : Text;
        discord : Text;
        telegram : Text;
    };

    public type UpdateUserError = {
        #UserNotAuthenticated;
        #UserNotFound;
        #EmptyEmail;
        #EmptyFirstName;
        #EmptyLastName;
    };

    public type GetUserError = {
        #UserNotFound;
    };

    public type CreateUserError = {
        #UserAlreadyExists;
        #EmptyEmail;
        #EmptyFirstName;
        #EmptyLastName;
    };

    public type Statsdata = {
        totalusers : Int;
        totalCollections : Int;
        totalnfts : Int;
    };

    public type TransactionsDtetails = {
        
    };

    public type Args = {
        nftCanister : Principal;
        tokenid : Nat64;
        tokencanisterid : Principal;
        to : Principal;
        numberoftokens : Nat
    };

    public type Invoice = {
        success : Bool;
        invoice_url : Text;
        invoice_id : Text
    };
    public type TxStatus = {
        transactionStatus : Text
    }

}


