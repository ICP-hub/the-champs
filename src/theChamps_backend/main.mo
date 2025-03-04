import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Cycles "mo:base/ExperimentalCycles";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Http "http";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import ICRCActorClass "../ICRC-1/ICRC-1";
import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";
import Typestoken "../ICRC-1/Types";
import NFTActorClass "../DIP721-NFT/Nft";
import Types "../DIP721-NFT/Types";
import Admin "./Admin/admin";
import UsersTypes "./Users/Types";
import ICRC "./ICRC";
import XRC "./XRC";
import Float "mo:base/Float";
import Nat64 "mo:base/Nat64";
import Int64 "mo:base/Int64";
import Int "mo:base/Int";
import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import serdeJson "mo:serde/JSON";


actor Champs {
    // public stable var nftcollection : ?NFTActorClass.Dip721NFT = null;
    public type IC = actor {
        http_request : Http.IcHttp.HttpRequest -> async Http.IcHttp.HttpResponse;
    };
    let ic : IC = actor ("aaaaa-aa");

    let g = Source.Source();
    stable let icpLedger = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    stable let ckbtcLedger = "r7inp-6aaaa-aaaaa-aaabq-cai";
    stable let exchange_rate_canister = "uf6dk-hyaaa-aaaaq-qaaaq-cai";
    // stores collection canister id of the user
    private var nftcollectionMap = TrieMap.TrieMap<Principal, [Principal]>(Principal.equal, Principal.hash);
    private stable var stablenftcollectionMap : [(Principal, [Principal])] = [];

    private var favourites = TrieMap.TrieMap<Principal, [(Types.Nft, Principal)]>(Principal.equal, Principal.hash);
    private stable var stablefavourites : [(Principal, [(Types.Nft, Principal)])] = [];

    private var contacts = TrieMap.TrieMap<Types.ContactId, Types.Contact>(Text.equal, Text.hash);
    private stable var stablecontacts : [(Types.ContactId, Types.Contact)] = [];

    private var fractionalnftmap = TrieMap.TrieMap<Principal, [(Principal, Types.FractionalNFT, Principal)]>(Principal.equal, Principal.hash);
    private stable var stablefractionalnftmap : [(Principal, [(Principal, Types.FractionalNFT, Principal)])] = [];

    private var userownershipmap = TrieMap.TrieMap<Principal, [(Principal, Types.TokenId, Principal)]>(Principal.equal, Principal.hash);
    private stable var stableuserownershipmap : [(Principal, [(Principal, Types.TokenId, Principal)])] = [];

    private var users = TrieMap.TrieMap<Principal, UsersTypes.User>(Principal.equal, Principal.hash);
    private stable var stableusers : [(Principal, UsersTypes.User)] = [];

    private var argMap = TrieMap.TrieMap<Text, UsersTypes.Args>(Text.equal, Text.hash);
    private stable var stableArgMap : [(Text, UsersTypes.Args)] = [];

    public func idQuick() : async Principal {
        return Principal.fromActor(Champs);
    };

    public func checkisadmin(caller : Principal) : async Bool {
        let adminstatus = await Admin.isAdmin(caller);
        return adminstatus;
    };

    public shared ({ caller = user }) func totalfractionalNFTs() : async Nat {
        // let adminstatus = await Admin.isAdmin(user);
        // if (adminstatus == false) {
        //     throw Error.reject("User is not an admin");
        // };
        var count : Nat = 0;
        for ((k, v) in fractionalnftmap.entries()) {
            count := count + v.size();
        };
        return count;
    };

    public shared ({ caller = user }) func totalcollections() : async Nat {
        // let adminstatus = await Admin.isAdmin(user);
        // if (adminstatus == false) {
        //     throw Error.reject("User is not an admin");
        // };
        var count : Nat = 0;
        for ((k, v) in nftcollectionMap.entries()) {
            count := count + v.size();
        };
        return count;
    };

    // ******************************************* Collections Realted functions  *************************************************************

    public shared ({ caller = user }) func add_collection_to_map(collection_id : Principal) : async Text {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        // let adminstatus = await Admin.isAdmin(user);
        // if (adminstatus == false) {
        //     throw Error.reject("User is not an admin");
        // };
        let usercollections = nftcollectionMap.get(user);
        switch (usercollections) {
            case null {
                let newcolletions = [collection_id];
                nftcollectionMap.put(user, newcolletions);
                return "Collection added";
            };
            case (?collections) {
                let coll = List.some<Principal>(List.fromArray(collections), func x { x == collection_id });
                if (coll) {
                    return "Collection already added";
                } else {
                    let temp = List.push(collection_id, List.fromArray(collections));
                    nftcollectionMap.put(user, List.toArray(temp));
                    return "Collection added";
                };
            };
        };
    };

    public shared ({ caller = user }) func remove_collection_to_map(collection_id : Principal) : async Text {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        // let adminstatus = await Admin.isAdmin(user);
        // if (adminstatus == false) {
        //     throw Error.reject("User is not an admin");
        // };
        let usercollections = nftcollectionMap.get(user);
        switch (usercollections) {
            case null {
                return "There are no collections added yet !";
            };
            case (?collections) {
                let temp : List.List<Principal> = List.fromArray(collections);
                let newlist : List.List<Principal> = List.filter<Principal>(temp, func x { x != collection_id });
                nftcollectionMap.put(user, List.toArray(newlist));
                return "Collection removed";
            };
        };
    };

    public shared ({ caller = user }) func createcollection(logo : Types.LogoResult, banner : Types.LogoResult, description : Text, name : Text, symbol : Text, maxLimit : Nat16, featured : Bool) : async (Principal, Principal) {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        // let adminstatus = await Admin.isAdmin(user);
        // if (adminstatus == false) {
        //     throw Error.reject("User is not an admin");
        // };
        Cycles.add<system>(500_500_000_000);
        Debug.print(debug_show (user));
        let metadata : Types.Dip721NonFungibleToken = {
            logo = logo;
            banner = banner;
            description = description;
            created_at = Time.now();
            name = name;
            symbol = symbol;
            maxLimit = maxLimit;
            featured = featured;
        };
        let nftcollection = await NFTActorClass.Dip721NFT(Principal.fromActor(Champs), metadata);
        Debug.print("the principal who is calling this" # debug_show (Principal.fromActor(Champs)));
        ignore await nftcollection.wallet_receive();
        let collection_canister_id = await nftcollection.getCanisterId();
        let new_custodian = await nftcollection.addcustodians(user);
        Debug.print(" New added custodian is : " # debug_show (new_custodian));
        let nftcustodians = await nftcollection.showcustodians();
        Debug.print("These are the list of current custodians : " #debug_show (nftcustodians));
        let usercollections = nftcollectionMap.get(user);
        switch (usercollections) {
            case null {
                let newcolletions = [collection_canister_id];
                nftcollectionMap.put(user, newcolletions);
                return (user, collection_canister_id);
            };
            case (?collections) {
                Debug.print("The current existing Collections are these : " # debug_show (collections));
                let temp = List.push(collection_canister_id, List.fromArray(collections));
                nftcollectionMap.put(user, List.toArray(temp));
                return (user, collection_canister_id);
            };
        };
    };

    public shared ({ caller = user }) func FractionalizeNFt(
        nftcanisterid : Principal,
        to : Principal,
        metadata : Types.MetadataDesc,
        priceinusd : Float,
        _logo : Types.LogoResult,
        _name : Text,
        _symbol : Text,
        _decimals : Nat8,
        _totalSupply : Nat,
    ) : async (Types.FractionalNFTResult, Principal) {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        // let adminstatus = await Admin.isAdmin(user);
        // if (adminstatus == false) {
        //     throw Error.reject("User is not an admin");
        // };

        Debug.print(debug_show (Cycles.balance()));
        let collection_canister_id = nftcollectionMap.get(user);
        switch (collection_canister_id) {
            case (null) {
                return (#Err(#CollectionNotFound), Principal.fromActor(Champs));
            };
            case (?id) {
                let nftcanisteractor = actor (Principal.toText(nftcanisterid)) : actor {
                    mintDip721 : (to : Principal, metadata : Types.MetadataDesc, priceinusd : Float, logo : Types.LogoResult) -> async Types.MintReceipt;
                    getallNFT : () -> async [Types.Nft];
                };
                let mintednft = await nftcanisteractor.mintDip721(to, metadata, priceinusd, _logo);
                let champs = await idQuick();
                switch (mintednft) {
                    case (#Err(index)) {
                        throw Error.reject("minting DIP721 failedand threw this error " # debug_show (index));
                    };
                    case (#Ok(newnft)) {
                        Debug.print(debug_show (newnft));
                        Cycles.add<system>(500_000_000_000);
                        let initial_mints = [{
                            account = { owner = champs; subaccount = null };
                            amount = _totalSupply;
                        }];
                        let init = {
                            decimals : Nat8 = _decimals;
                            initial_mints : [{
                                account : {
                                    owner : Principal;
                                    subaccount : ?Blob;
                                };
                                amount : Nat;
                            }] = initial_mints;
                            minting_account : {
                                owner : Principal;
                                subaccount : ?Blob;
                            } = { owner = user; subaccount = null };
                            token_name : Text = _name;
                            token_symbol : Text = _symbol;
                            transfer_fee : Nat = 0;
                        };

                        let fractiontokens = await ICRCActorClass.Ledger(init);

                        ignore await fractiontokens.wallet_receive();

                        let approve = await fractiontokens.icrc2_approve({
                            from_subaccount = null;
                            spender = { owner = champs; subaccount = null };
                            amount = _totalSupply;
                            expires_at = null;
                            expected_allowance = null;
                            memo = null;
                            fee = null;
                            created_at_time = null;
                        });

                        Debug.print("THe output of the approve function is : " # debug_show (approve));

                        let tokencanister : Principal = await fractiontokens.getCanisterId();
                        var name : Typestoken.Value = #Text(_name);
                        var symbol : Typestoken.Value = #Text(_symbol);
                        var decimals : Typestoken.Value = #Nat(Nat8.toNat(_decimals));
                        var fee : Typestoken.Value = #Nat(0);

                        let tokenmetadata = [
                            ("icrc1:name", name),
                            ("icrc1:symbol", symbol),
                            ("icrc1:decimals", decimals),
                            ("icrc1:fee", fee),
                        ];
                        let nftdata = await getNFTdetails(nftcanisterid, newnft.token_id);

                        let fractionNftDetails : Types.FractionalNFT = {
                            collectionid = nftcanisterid;
                            nft = nftdata;
                            fractional_token = tokenmetadata;
                            totalSupply = _totalSupply;
                            price_per_share = priceinusd / Float.fromInt64(Int64.fromNat64(Nat64.fromNat(_totalSupply)));
                        };
                        switch (fractionalnftmap.get(to)) {
                            case null {
                                let newfractionalnft = [(nftcanisterid, fractionNftDetails, tokencanister)];
                                fractionalnftmap.put(to, newfractionalnft);
                                return (#Ok(fractionNftDetails), tokencanister);
                            };
                            case (?nft) {
                                let temp = List.push((nftcanisterid, fractionNftDetails, tokencanister), List.fromArray(nft));
                                fractionalnftmap.put(to, List.toArray(temp));
                                switch (userownershipmap.get(to)) {
                                    case null {
                                        userownershipmap.put(to, [(nftcanisterid, newnft.token_id, tokencanister)]);
                                    };
                                    case (?v) {
                                        let newlist = List.push((nftcanisterid, newnft.token_id, tokencanister), List.fromArray(v));
                                        userownershipmap.put(to, List.toArray(newlist));
                                        return (#Ok(fractionNftDetails), tokencanister);
                                    };
                                };
                            };
                        };
                        return (#Ok(fractionNftDetails), tokencanister);
                    };
                };
            };
        };
    };
    public query func getfracntionalnftprice(tokencanisterid : Principal) : async Float {
        for (fractionalnft in fractionalnftmap.vals()) {
            for (nft in fractionalnft.vals()) {
                if (nft.2 == tokencanisterid) {
                    return nft.1.price_per_share;
                };
            };
        };
        return 0.0;
    };

    public shared ({ caller = _user }) func processPendingTransfer(invoiceId : Text) : async Result.Result<ICRC.Result,Text>{
        let args : UsersTypes.Args = switch(argMap.get(invoiceId)){
            case null return #err("No args found for Invoice");
            case(?_args) _args;
        };
        Debug.print("Args that are stored while invoice creation");
        Debug.print(debug_show(args));
        let statusCheck = await getStatus(invoiceId);
        switch(statusCheck){
            case(#err(e)){
                return #err(e);
            };
            case(#ok(entry)){
                if(entry.transactionStatus == "completed"){
                    let result = await buytokens(
                        _user,
                        args.nftCanister,
                        args.tokenid,
                        args.tokencanisterid,
                        args.to,
                        args.numberoftokens
                    );
                    return #ok(result);
                }
                else{
                    return #err("You must Complete Transaction")
                }
            }
        }
        
    };

    func buytokens(_user : Principal, nftCanister : Principal, tokenid : Types.TokenId, tokencanisterid : Principal, to : Principal, numberoftokens : Nat) : async ICRC.Result {
        // if (Principal.isAnonymous(_user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        Debug.print("Num of Tokens in buyTokens function " # Nat.toText(numberoftokens));
        let tokencansiter_actor = actor (Principal.toText(tokencanisterid)) : actor {
            icrc1_transfer : (ICRC.TransferArg) -> async ICRC.Result;
            getTotalSupply : () -> async Nat;
            icrc1_metadata : () -> async [(Text, Types.Value)];
        };
        // switch (paymentOption) {
        //     case (#icp) {
        //         let response : ICRC.Result_2 = await icrc2_transferFrom(icpLedger, from, to, amount);
        //         switch (response) {
        //             case (#Err(index)) {
        //                 throw Error.reject(debug_show (index));
        //             };
        //             case (#Ok(res)) {
        let transferparams : ICRC.TransferArg = {
            to = { owner = to; subaccount = null };
            amount = numberoftokens;
            fee = null;
            from_subaccount = null;
            memo = null;
            created_at_time = null;
        };
        Debug.print("transfer params");
        Debug.print(debug_show(transferparams));
        let tokens = await tokencansiter_actor.icrc1_transfer(transferparams);
        Debug.print("transfer result");
        Debug.print(debug_show(tokens));
        Debug.print("This here is the check that whtere the code is being executed till this line  and its a Yes");
        switch (tokens) {
            case (#Err(index)) {
                throw Error.reject(debug_show (index));
            };
            case (#Ok(data)) {
                switch (userownershipmap.get(to)) {
                    case null {
                        userownershipmap.put(to, [(nftCanister, tokenid, tokencanisterid)]);
                        return #Ok(data);
                    };
                    case (?v) {
                        switch (List.find(List.fromArray(v), func(x : (Principal, Types.TokenId, Principal)) : Bool { x.2 == tokencanisterid })) {
                            case null {
                                let newlist = List.push((nftCanister, tokenid, tokencanisterid), List.fromArray(v));
                                userownershipmap.put(to, List.toArray(newlist));
                                return #Ok(data);
                            };
                            case (?x) {
                                return #Ok(data);
                            };
                        };
                    };
                };
            };
        };
    };
    //         return #Ok(res);
    //     };
    // // };
    // };
    // case (#ckbtc) {
    //     let response : ICRC.Result_2 = await icrc2_transferFrom(ckbtcLedger, from, to, amount);
    //     switch (response) {
    //         case (#Err(index)) {
    //             throw Error.reject(debug_show (index));
    //         };
    //         case (#Ok(res)) {
    //             let transferparamsckbtc = {
    //                 spender_subaccount = null;
    //                 from = { owner = from; subaccount = null };
    //                 to = { owner = to; subaccount = null };
    //                 amount = numberoftokens;
    //                 fee = null;
    //                 memo = null;
    //                 created_at_time = null;
    //             };
    //             let tokens = await tokencansiter_actor.icrc2_transfer_from(transferparamsckbtc);
    //             switch (tokens) {
    //                 case (#err(index)) {
    //                     throw Error.reject(debug_show (index));
    //                 };
    //                 case (#ok(data)) {
    //                     return #Ok(data);
    //                 };
    //             };
    //             return #Ok(res);
    //         };
    //             };
    //         };
    //     };
    // };

 
    public query func transform({
        context : Blob;
        response : Http.IcHttp.HttpResponsePayload;
    }) : async Http.IcHttp.HttpResponsePayload {
        {
        response with headers = []; // not intersted in the headers
        };
    };

    public func createInvoice(endUrl: Text, quantity: Nat,nftCanister : Principal, tokenid : Types.TokenId, tokencanisterid : Principal, to : Principal) : async Result.Result<UsersTypes.Invoice,Text> {
            let successUrl = endUrl #"/success";
            let cancelUrl =  endUrl #"/failure";

            let idempotency_key : Text = generateIdempotencyKey();
            let request_headers = [
                { name = "Content-Type"; value = "application/json" },
                { name = "IdempotencyKey"; value = idempotency_key },
            ];
            
            let body = {
                qty = quantity;
                successUrl = successUrl;
                cancelUrl = cancelUrl;
            };
            Debug.print("Body");
            Debug.print(debug_show(body));
            Debug.print("Quantity in create Invoice " # Nat.toText(quantity));
            let request_body_json : Text = "{ " # "\"qty\" : " # Nat.toText(body.qty) # ","  # " \"success_url\" : \" " # body.successUrl # "\"," # " \"failed_url\" : \"" # body.cancelUrl # "\"" # "  }";
            let request_body = Text.encodeUtf8(request_body_json);

            let http_request : Http.IcHttp.HttpRequest = {
                url = "https://champproxyserv.netlify.app/.netlify/functions/api" # "/invoice/checkout";
                headers = request_headers;
                body = ?request_body;
                method = #post;
                transform = ?{
                    function = transform;
                    context = Blob.fromArray([]);
                };
                max_response_bytes= null;
            };
            Cycles.add(21_800_000_000);
            let http_response : Http.IcHttp.HttpResponse = await ic.http_request(http_request);

            let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
                case (null) { "No value returned" };
                case (?y) { y };
            };
            let blob = serdeJson.fromText(decoded_text);
            let data : ?UsersTypes.Invoice = from_candid(blob);
            let invoice : UsersTypes.Invoice = switch(data) {
                case(null) { return #err("Error creating Invoice"); };
                case(?_session) { 
                    switch(_session.success){
                        case true _session;
                        case false return #err("Error creating Invoice");
                    };
                 };
            };
            let args : UsersTypes.Args ={
                nftCanister = nftCanister;
                tokenid = tokenid;
                tokencanisterid = tokencanisterid;
                to = to;
                numberoftokens = quantity
            };
            if(invoice.success == true){
                argMap.put(invoice.invoice_id,args);
            };
            return #ok(invoice);

    };
    public func getStatus(invoiceId: Text) : async Result.Result<UsersTypes.TxStatus,Text> {
        
            let idempotency_key : Text = generateIdempotencyKey();
            let request_headers = [
                { name = "Content-Type"; value = "application/json" },
                { name = "IdempotencyKey"; value = idempotency_key }
            ];
            
            let body = {
                invoiceId  = invoiceId;     
            };

            let request_body_json : Text = "{ " # "\"invoiceId\" : \"" # body.invoiceId # "\"" # " }";
            let request_body = Text.encodeUtf8(request_body_json);

            let http_request : Http.IcHttp.HttpRequest = {
                url = "https://champproxyserv.netlify.app/.netlify/functions/api" # "/payment/status";
                headers = request_headers;
                body = ?request_body;
                method = #post;
                transform = ?{
                    function = transform;
                    context = Blob.fromArray([]);
                };
                max_response_bytes= null;
            };
            Cycles.add(21_800_000_000);
            let http_response : Http.IcHttp.HttpResponse = await ic.http_request(http_request);

            let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
                case (null) { "No value returned" };
                case (?y) { y };
            };
            let blob = serdeJson.fromText(decoded_text);
            let data : ?UsersTypes.TxStatus = from_candid(blob);
            return switch(data) {
                case(null) { return #err("Error Fetching Status"); };
                case(?data) { 
                    return #ok(data);
                 };
            };

    };

    func generateIdempotencyKey() : Text {
        let timestamp = Time.now(); 
        return "idempotency-" # Int.toText(timestamp);
    };


    public shared ({ caller = user }) func transfertokens(tokencanisterid : Principal, to : Principal, amount : Nat) : async Result.Result<Typestoken.TxIndex, Typestoken.TransferError> {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        let icrc1_transfer_paramas = {
            from_subaccount = null;
            to = { owner = to; subaccount = null };
            amount = amount;
            fee = null;
            memo = null;
            created_at_time = null;
        };
        let tokencansiter_actor = actor (Principal.toText(tokencanisterid)) : actor {
            icrc1_transfer : ({
                from_subaccount : ?Typestoken.Subaccount;
                to : Typestoken.Account;
                amount : Typestoken.Tokens;
                fee : ?Typestoken.Tokens;
                memo : ?Typestoken.Memo;
                created_at_time : ?Typestoken.Timestamp;
            }) -> async Typestoken.Result<Typestoken.TxIndex, Typestoken.TransferError>;
        };
        let tokens = await tokencansiter_actor.icrc1_transfer(icrc1_transfer_paramas);
        switch (tokens) {
            case (#Err(index)) {
                throw (Error.reject(debug_show (index)));
            };
            case (#Ok(data)) {
                return #ok(data);
            };
        };
    };

    public func getusersnft(user : Principal) : async Types.MetadataResultArray {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };

        var results = List.nil<Types.MetadataDesc>();
        switch (nftcollectionMap.get(user)) {
            case null {
                return #Err(#InvalidTokenId);
            };
            case (?collections) {
                Debug.print(debug_show (collections));
                let userscollections : [Principal] = collections;
                //How to handle this iteration I want to iter to every index of the array and get the principal
                for (id in userscollections.vals()) {
                    let nftcanisteractor = actor (Principal.toText(id)) : actor {
                        getMetadataDip721 : (token_id : Types.TokenId) -> async Types.MetadataResult;
                        getTokenIdsForUserDip721 : (user : Principal) -> async [Types.TokenId];
                    };
                    let usertokenID : [Types.TokenId] = await nftcanisteractor.getTokenIdsForUserDip721(user);
                    for (tokenid in usertokenID.vals()) {
                        let metadata = await nftcanisteractor.getMetadataDip721(tokenid);
                        Debug.print(debug_show (metadata));
                        switch (metadata) {
                            case (#Err(index)) {
                                throw Error.reject(debug_show (index));
                            };
                            case (#Ok(data)) {
                                results := List.push(data, results);
                            };
                        };
                    };
                };
                return #Ok(List.toArray(results));
            };
        };
    };

    public shared ({ caller = user }) func gettokenmetadata(tokencanisterid : Principal) : async [(Text, Typestoken.Value)] {
        let tokencansiter_actor = actor (Principal.toText(tokencanisterid)) : actor {
            icrc1_metadata : () -> async [(Text, Typestoken.Value)];
        };
        let metadata = await tokencansiter_actor.icrc1_metadata();
        return metadata;
    };

    // public shared ({ caller = user }) func getalltransactions(tokencanisterid : Principal, page : ?Nat32) : async Root.GetTransactionsResponseBorrowed {

    //     // if (Principal.isAnonymous(user)) {
    //     //     throw Error.reject("User is not authenticated");
    //     // };
    //     let tokencansiter_actor = actor (Principal.toText(tokencanisterid)) : actor {
    //         getTransactions : (?Nat32) -> async Root.GetTransactionsResponseBorrowed;
    //     };
    //     let transactions = await tokencansiter_actor.getTransactions(page);
    //     return transactions;
    // };

    public func getusersfractionnft(user : Principal) : async [(Types.Nft, [(Text, Typestoken.Value)], Nat, Typestoken.Tokens)] {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        switch (userownershipmap.get(user)) {
            case null {
                return [];
            };
            case (?nft) {
                var datalist = List.nil<(Types.Nft, [(Text, Typestoken.Value)], Nat, Typestoken.Tokens)>();
                for (v in nft.vals()) {
                    let tokencansiter_actor = actor (Principal.toText(v.2)) : actor {
                        icrc1_balance_of : (account : Typestoken.Account) -> async Typestoken.Tokens;
                        getTotalSupply : () -> async Nat;
                        icrc1_metadata : () -> async [(Text, Types.Value)];
                    };

                    let token_metadata = await tokencansiter_actor.icrc1_metadata();

                    let total_suppply = await tokencansiter_actor.getTotalSupply();

                    let balance = await tokencansiter_actor.icrc1_balance_of({
                        owner : Principal = user;
                        subaccount : ?Typestoken.Subaccount = null;
                    });

                    let nftcanisteractor = actor (Principal.toText(v.0)) : actor {
                        getNFT(token_id : Types.TokenId) : async Types.NftResult;
                    };

                    let callersnft = await nftcanisteractor.getNFT(v.1);
                    switch (callersnft) {
                        case (#Err(Index)) {
                            throw Error.reject("Nft doesn't exist");
                        };
                        case (#Ok(data)) {
                            datalist := List.push((data, token_metadata, total_suppply, balance), datalist);
                        };
                    };
                    // let fractionNFT_Detail : {}
                };
                return List.toArray(datalist);
            };
        };
    };

    public shared ({ caller = user }) func getallfractionalnfts() : async [(Principal, Types.FractionalNFT, Principal)] {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };

        // let adminstatus = await Admin.isAdmin(user);
        // if (adminstatus == false) {
        //     throw Error.reject("User is not an admin");
        // };
        var results = List.nil<(Principal, Types.FractionalNFT, Principal)>();
        for (nft in fractionalnftmap.vals()) {
            for (fractionalnft in nft.vals()) {
                results := List.push(fractionalnft, results);
            };
        };
        return List.toArray(results);
    };

    public shared ({ caller = user }) func getsingleCollectiondetail(collection_id : Principal) : async Types.Dip721NonFungibleToken {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };

        let nftcanisteractor = actor (Principal.toText(collection_id)) : actor {
            getDIP721details : () -> async Types.Dip721NonFungibleToken;
        };
        let collectiondetails = await nftcanisteractor.getDIP721details();
        let collection : Types.Dip721NonFungibleToken = {
            logo = collectiondetails.logo;
            name = collectiondetails.name;
            symbol = collectiondetails.symbol;
            maxLimit = collectiondetails.maxLimit;
            banner = collectiondetails.banner;
            description = collectiondetails.description;
            created_at = collectiondetails.created_at;
            featured = collectiondetails.featured;
        };
        return collection;
    };

    public query func getallCollectionids() : async [(Principal, [Principal])] {
        return Iter.toArray(nftcollectionMap.entries());
    };

    public shared ({ caller = user }) func getcollectionwisefractionalnft(collectioncanisterid : Principal) : async [(Types.FractionalNFT, Principal)] {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };

        var collectionnft : List.List<(Types.FractionalNFT, Principal)> = List.nil<(Types.FractionalNFT, Principal)>();
        for (nft in fractionalnftmap.vals()) {
            for (fractionalnft in nft.vals()) {
                if (fractionalnft.0 == collectioncanisterid) {
                    collectionnft := List.push((fractionalnft.1, fractionalnft.2), collectionnft);
                };
            };
        };
        return List.toArray(collectionnft);
    };

    public shared func getAvailableshares(tokenCanister : Principal) : async Typestoken.Tokens {
        let token = actor (Principal.toText(tokenCanister)) : actor {
            icrc1_balance_of : (account : Typestoken.Account) -> async Typestoken.Tokens;
        };
        let balance = await token.icrc1_balance_of({
            owner : Principal = Principal.fromActor(Champs);
            subaccount : ?Typestoken.Subaccount = null;
        });
        return balance;
    };

    public shared ({ caller = user }) func getcollectiondetails(collectioncanisterid : Principal) : async Types.Dip721NonFungibleToken {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };

        let nftcanisteractor = actor (Principal.toText(collectioncanisterid)) : actor {
            getDIP721details : () -> async Types.Dip721NonFungibleToken;
        };
        let collectiondetails = await nftcanisteractor.getDIP721details();
        let collection : Types.Dip721NonFungibleToken = {
            logo = collectiondetails.logo;
            name = collectiondetails.name;
            symbol = collectiondetails.symbol;
            maxLimit = collectiondetails.maxLimit;
            banner = collectiondetails.banner;
            description = collectiondetails.description;
            created_at = collectiondetails.created_at;
            featured = collectiondetails.featured;
        };
        return collection;
    };

    public shared ({ caller = user }) func addfavourite(collectioncanisterid : Principal, tokenid : Types.TokenId) : async Text {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };

        let nftcanisteractor = actor (Principal.toText(collectioncanisterid)) : actor {
            getNFT : (token_id : Types.TokenId) -> async Types.NftResult;
        };
        let metadata : Types.NftResult = await nftcanisteractor.getNFT(tokenid);
        switch (metadata) {
            case (#Err(index)) {
                throw Error.reject(debug_show (index));
            };
            case (#Ok(data)) {
                let userfavourites = favourites.get(user);
                switch (userfavourites) {
                    case null {
                        favourites.put(user, [(data, collectioncanisterid)]);
                        return "Favourite added";
                    };
                    case (?favourite) {
                        let temp : List.List<(Types.Nft, Principal)> = List.push((data, collectioncanisterid), List.fromArray(favourite));
                        favourites.put(user, List.toArray(temp));
                        return "Favourite added";
                    };
                };
            };
        };
    };

    public shared ({ caller = user }) func getfavourites() : async [(Types.Nft, Principal)] {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };

        let userfavourites = favourites.get(user);
        switch (userfavourites) {
            case null {
                return [];
            };
            case (?favourite) {
                return favourite;
            };
        };
    };

    public shared ({ caller = user }) func removefavourite(item : (Types.Nft, Principal)) : async Text {
        // if (Principal.isAnonymous(user)) {
        // throw Error.reject("User is not authenticated");
        // };

        let userfavourites = favourites.get(user);
        switch (userfavourites) {
            case null {
                return "There are no favouites added yet !";
            };
            case (?favourite) {
                let temp : List.List<(Types.Nft, Principal)> = List.fromArray(favourite);
                Debug.print(debug_show (temp));
                let newlist : (List.List<(Types.Nft, Principal)>, List.List<(Types.Nft, Principal)>) = List.partition<(Types.Nft, Principal)>(temp, func x { x != item });
                Debug.print("The newlist which is a tuple type is like this" #debug_show (newlist));
                favourites.put(user, List.toArray(newlist.0));
                return "Favourite removed";
            };
        };
    };

    public shared ({ caller = user }) func getNFTdetails(collectioncanisterid : Principal, tokenid : Types.TokenId) : async Types.Nft {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        let nftcanisteractor = actor (Principal.toText(collectioncanisterid)) : actor {
            getNFT : (token_id : Types.TokenId) -> async Types.NftResult;
        };
        let metadata : Types.NftResult = await nftcanisteractor.getNFT(tokenid);
        switch (metadata) {
            case (#Err(index)) {
                throw Error.reject(debug_show (index));
            };
            case (#Ok(data)) {
                return data;
            };
        };
    };

    public shared ({ caller = user }) func getFractionalNftDetails(tokenid : Types.TokenId, tokencanister : Principal, collectioncanisterid : Principal) : async Types.FractionalNFT {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        let nftcanisteractor = actor (Principal.toText(collectioncanisterid)) : actor {
            getNFT : (token_id : Types.TokenId) -> async Types.NftResult;
        };
        let fractiontokencanisteractor = actor (Principal.toText(tokencanister)) : actor {
            icrc1_total_supply : () -> async Typestoken.Tokens;
            icrc1_metadata : () -> async [(Text, Typestoken.Value)];
        };
        let metadata : Types.NftResult = await nftcanisteractor.getNFT(tokenid);
        switch (metadata) {
            case (#Err(index)) {
                throw Error.reject(debug_show (index));
            };
            case (#Ok(data)) {
                let totalsupply = await fractiontokencanisteractor.icrc1_total_supply();
                let tokenmetadata = await fractiontokencanisteractor.icrc1_metadata();
                let fractionalNftDetails : Types.FractionalNFT = {
                    collectionid = collectioncanisterid;
                    nft = data;
                    fractional_token = tokenmetadata;
                    totalSupply = totalsupply;
                    price_per_share = data.priceinusd / Float.fromInt64(Int64.fromNat64(Nat64.fromNat(totalsupply)));

                };
                return fractionalNftDetails;
            };
        };
    };

    // ******************************************* Contact US CRUD functions *************************************************************

    public shared ({ caller = user }) func createContact(co : Types.UserContact) : async Result.Result<(Types.Contact), Types.CreateContactError> {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };

        if (co.name == "") { return #err(#EmptyName) };
        if (co.email == "") { return #err(#EmptyEmail) };
        if (co.message == "") { return #err(#EmptyMessage) };

        let contactId : Types.ContactId = UUID.toText(await g.new());

        let contact : Types.Contact = {
            id = contactId;
            name = co.name;
            email = co.email;
            contact_number = co.contact_number;
            message = co.message;
            country = co.country;
            time_created = Time.now();
            time_updated = Time.now();
        };
        contacts.put(contactId, contact);
        return #ok(contact);
    };

    public shared ({ caller = user }) func updateContact(
        id : Types.ContactId,
        read : Bool,
    ) : async Result.Result<(Types.Contact), Types.UpdateContactError> {
        if (Principal.isAnonymous(user)) {
            throw Error.reject("User is not authenticated");
        };

        let result = contacts.get(id);
        switch (result) {
            case null {
                return #err(#ContactNotFound);
            };
            case (?v) {
                let contact : Types.Contact = {
                    id = id;
                    email = v.email;
                    name = v.name;
                    contact_number = v.contact_number;
                    message = v.message;
                    read = read;
                    country = v.country;
                    time_created = v.time_created;
                    // only update time_updated
                    time_updated = Time.now();
                };
                contacts.put(id, contact);
                return #ok(contact);
            };
        };
    };

    public query func getContact(id : Types.ContactId) : async Result.Result<Types.Contact, Types.GetContactError> {
        let contact = contacts.get(id);
        return Result.fromOption(contact, #ContactNotFound);
        // If the post is not found, this will return an error as result.
    };

    public shared ({ caller = user }) func deleteContact(id : Types.ContactId) : async Result.Result<(), Types.DeleteContactError> {
        if (Principal.isAnonymous(user)) {
            throw Error.reject("User is not authenticated");
        };
        // Check if the caller is an admin
        // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };
        contacts.delete(id);
        return #ok(());
    };

    public shared ({ caller = user }) func listContacts() : async [(Types.ContactId, Types.Contact)] {
        // let adminstatus = await Admin.isAdmin(user);
        // if (adminstatus == false) {
        //     throw Error.reject("User is not an admin");
        // };
        return Iter.toArray(contacts.entries());
    };

    // *********************************************** users functions *************************************************************

    public shared ({ caller }) func updateUser(u : UsersTypes.User) : async Result.Result<(UsersTypes.User), UsersTypes.UpdateUserError> {
        /*  if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    }; */

        if (u.email == "") { return #err(#EmptyEmail) };
        if (u.firstName == "") { return #err(#EmptyFirstName) };
        if (u.lastName == "") { return #err(#EmptyLastName) };

        let user = {
            id = caller;
            profileimage = u.profileimage;
            firstName = u.firstName;
            lastName = u.lastName;
            email = u.email;
            discord = u.discord;
            twitter = u.twitter;
            telegram = u.telegram;
        };
        users.put(caller, user);
        return #ok(user);
    };

    public shared query ({ caller }) func getUserdetailsbycaller() : async Result.Result<UsersTypes.User, UsersTypes.GetUserError> {
        let user = users.get(caller);
        return Result.fromOption(user, #UserNotFound);
    };

    public shared query func getUserdetailsbyid(id : Principal) : async Result.Result<UsersTypes.User, UsersTypes.GetUserError> {
        let user = users.get(id);
        return Result.fromOption(user, #UserNotFound);
    };

    public query func listUsers() : async [(Principal, UsersTypes.User)] {
        return Iter.toArray(users.entries());
    };

    func icrc2_transferFrom(ledgerId : Text, transferfrom : Principal, transferto : Principal, amount : Nat) : async (ICRC.Result_2) {

        let ledger = actor (ledgerId) : ICRC.Token;
        await ledger.icrc2_transfer_from({
            spender_subaccount = null;
            from = { owner = transferfrom; subaccount = null };
            to = { owner = transferto; subaccount = null };
            amount;
            fee = null;
            memo = null;
            created_at_time = null;
        });

    };

    // ********************************************** Buy and Transfer of tokens *************************************************************

    public func getallstats() : async UsersTypes.Statsdata {
        let totalusers = users.size();
        let totalnfts = await totalfractionalNFTs();
        let stats : UsersTypes.Statsdata = {
            totalusers = totalusers;
            totalCollections = await totalcollections();
            totalnfts = totalnfts;
        };
        return stats;
    };

    system func preupgrade() {
        stablenftcollectionMap := Iter.toArray(nftcollectionMap.entries());
        stablefavourites := Iter.toArray(favourites.entries());
        stablecontacts := Iter.toArray(contacts.entries());
        stablefractionalnftmap := Iter.toArray(fractionalnftmap.entries());
        stableusers := Iter.toArray(users.entries());
        stableuserownershipmap := Iter.toArray(userownershipmap.entries());
    };

    // Postupgrade function to restore the data from stable variables
    system func postupgrade() {

        nftcollectionMap := TrieMap.fromEntries(stablenftcollectionMap.vals(), Principal.equal, Principal.hash);
        favourites := TrieMap.fromEntries(stablefavourites.vals(), Principal.equal, Principal.hash);
        contacts := TrieMap.fromEntries(stablecontacts.vals(), Text.equal, Text.hash);
        fractionalnftmap := TrieMap.fromEntries(stablefractionalnftmap.vals(), Principal.equal, Principal.hash);
        users := TrieMap.fromEntries(stableusers.vals(), Principal.equal, Principal.hash);
        userownershipmap := TrieMap.fromEntries(stableuserownershipmap.vals(),Principal.equal,Principal.hash);
    };

    // ******************************************************************************************************************************

    public func get_exchange_rates(x : XRC.Asset, y : XRC.Asset) : async XRC.GetExchangeRateResult {
        let xrc = actor (exchange_rate_canister) : actor {
            get_exchange_rate : (GetExchangeRateRequest : XRC.GetExchangeRateRequest) -> async XRC.GetExchangeRateResult;
        };
        let timestamp = Int.div(Time.now(), 1_000_000_000) - 120;
        // 2 mintues buffer time to get the exchange rate
        Debug.print(debug_show (timestamp));
        Cycles.add<system>(10_000_000_000);
        let result = await xrc.get_exchange_rate({
            timestamp : ?Nat64 = ?Nat64.fromIntWrap(timestamp);
            quote_asset = x;
            base_asset = y;
        });
        Debug.print(debug_show (Cycles.refunded()));
        Debug.print(debug_show (result));
        return result;
    };

    public type Icrc28TrustedOriginsResponse = {
        trusted_origins : [Text];
    };

    // Equivalent to the Rust function that returns the record type
    public func icrc28_trusted_origins() : async Icrc28TrustedOriginsResponse {
        let trusted_origins = ["https://krcsw-aaaaa-aaaak-akqea-cai.icp0.io", "http://localhost:3000", "http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943", "http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai", "http://127.0.0.1:4943", "http://localhost:4200", "https://thechampsdigital.com","https://www.thechampsdigital.com"];

        return {
            trusted_origins = trusted_origins;
        };
    };
};