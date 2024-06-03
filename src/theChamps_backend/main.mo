import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Cycles "mo:base/ExperimentalCycles";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Blob "mo:base/Blob";
import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";
import DIP20ActorClass "../DIP-20/token";
import Typestoken "../DIP-20/types";
import NFTActorClass "../DIP721-NFT/Nft";
import Types "../DIP721-NFT/Types";
import Root "../DIP-20/cap/Root";
import Admin "./Admin/admin";
import UsersTypes "./Users/Types";
import ICRC "./ICRC";
import XRC "./XRC";
import Float "mo:base/Float";
import Nat64 "mo:base/Nat64";
import Int64 "mo:base/Int64";
import Int "mo:base/Int";
actor Champs {

    // public stable var nftcollection : ?NFTActorClass.Dip721NFT = null;
    let g = Source.Source();
    stable let icpLedger = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    stable let ckbtcLedger = "r7inp-6aaaa-aaaaa-aaabq-cai";
    stable let exchange_rate_canister = "uf6dk-hyaaa-aaaaq-qaaaq-cai";
    // stores collection canister id of the user
    private var nftcollectionMap = TrieMap.TrieMap<Principal, [Principal]>(Principal.equal, Principal.hash);
    private var stablenftcollectionMap : [(Principal, [Principal])] = [];

    private var favourites = TrieMap.TrieMap<Principal, [(Types.Nft, Principal)]>(Principal.equal, Principal.hash);
    private var stablefavourites : [(Principal, [(Types.Nft, Principal)])] = [];

    private var contacts = TrieMap.TrieMap<Types.ContactId, Types.Contact>(Text.equal, Text.hash);
    private stable var stablecontacts : [(Types.ContactId, Types.Contact)] = [];

    private var fractionalnftmap = TrieMap.TrieMap<Principal, [(Principal, Types.FractionalNFT, Principal)]>(Principal.equal, Principal.hash);
    private var stablefractionalnftmap : [(Principal, [(Principal, Types.FractionalNFT, Principal)])] = [];

    private var users = TrieMap.TrieMap<Principal, UsersTypes.User>(Principal.equal, Principal.hash);
    private var stableusers : [(Principal, UsersTypes.User)] = [];

    public func idQuick() : async Principal {
        return Principal.fromActor(Champs);
    };

    public func checkisadmin(caller : Principal) : async Bool {
        let adminstatus = await Admin.isAdmin(caller);
        return adminstatus;
    };

    public shared ({caller = user}) func totalfractionalNFTs () : async Nat {
        // let adminstatus = await Admin.isAdmin(user);
        // if (adminstatus == false) {
        //     throw Error.reject("User is not an admin");
        // };
        var count : Nat = 0;
        for ((k,v) in fractionalnftmap.entries()) {
            count := count + v.size();
        };
        return count;
    };

    public shared ({caller = user}) func totalcollections () : async Nat {
        // let adminstatus = await Admin.isAdmin(user);
        // if (adminstatus == false) {
        //     throw Error.reject("User is not an admin");
        // };
        var count : Nat = 0;
        for ((k,v) in nftcollectionMap.entries()) {
            count := count + v.size();
        };
        return count;
    };


    // ******************************************* Collections Realted functions  *************************************************************

    public shared ({caller = user }) func add_collection_to_map (collection_id : Principal) : async Text {
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

    public shared ({caller = user}) func remove_collection_to_map (collection_id : Principal) : async Text {
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
        _logo : Text,
        _name : Text,
        _symbol : Text,
        _decimals : Nat8,
        _totalSupply : Nat,
        _fee : Nat,
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
                    mintDip721 : (to : Principal, metadata : Types.MetadataDesc, priceinusd : Float) -> async Types.MintReceipt;
                };
                let mintednft = await nftcanisteractor.mintDip721(to, metadata, priceinusd);
                let champs = await idQuick();
                switch (mintednft) {
                    case (#Err(index)) {
                        throw Error.reject(debug_show (index));
                    };
                    case (#Ok(newnft)) {
                        Debug.print(debug_show (newnft));
                        Cycles.add<system>(500_000_000_000);
                        let fractiontokens = await DIP20ActorClass.Token(
                            _logo,
                            _name,
                            _symbol,
                            _decimals,
                            _totalSupply,
                            champs,
                            _fee,
                        );
                        ignore await fractiontokens.wallet_receive();
                        let minttokens = await fractiontokens.mint(champs, _totalSupply);
                        Debug.print(debug_show (minttokens));
                        let approve = await fractiontokens.approve(champs, _totalSupply);
                        Debug.print("THe output of the approve function is : " # debug_show (approve));
                        let tokencanister : Principal = await fractiontokens.getCanisterId();
                        Debug.print(debug_show (tokencanister));
                        let tokenmetadata = {
                            logo = _logo;
                            name = _name;
                            symbol = _symbol;
                            decimals = _decimals;
                            totalSupply = _totalSupply;
                            owner = champs;
                            fee = _fee;
                        };

                        let nftdata = await getNFTdetails(nftcanisterid, newnft.token_id);
                        let testSupply = Nat64.fromNat(_totalSupply);
                        let fractionNftDetails : Types.FractionalNFT = {
                            collectionid = nftcanisterid;
                            nft = nftdata;
                            fractional_token = tokenmetadata;
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
                                return (#Ok(fractionNftDetails), tokencanister);
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

    public shared ({ caller = user }) func buytokens(tokencanisterid : Principal, from : Principal, to : Principal, numberoftokens : Nat, paymentOption : { #icp; #ckbtc }, amount : Nat) : async (ICRC.Result) {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        let tokencansiter_actor = actor (Principal.toText(tokencanisterid)) : actor {
            transferFrom : (from : Principal, to : Principal, amount : Nat) -> async Typestoken.TxReceipt;
        };
        switch (paymentOption) {
            case (#icp) {
                let response : ICRC.Result_2 = await icrc2_transferFrom(icpLedger, from, to, amount);
                switch (response) {
                    case (#Err(index)) {
                        throw Error.reject(debug_show (index));
                    };
                    case (#Ok(res)) {
                        let tokens = await tokencansiter_actor.transferFrom(from, to, numberoftokens);
                        switch (tokens) {
                            case (#Err(index)) {
                                throw Error.reject(debug_show (index));
                            };
                            case (#Ok(data)) {
                                return #Ok(data);
                            };
                        };

                        return #Ok(res);
                    };
                };
            };
            case (#ckbtc) {
                let response : ICRC.Result_2 = await icrc2_transferFrom(ckbtcLedger, from, to, amount);
                switch (response) {
                    case (#Err(index)) {
                        throw Error.reject(debug_show (index));
                    };
                    case (#Ok(res)) {
                        let tokens = await tokencansiter_actor.transferFrom(from, to, numberoftokens);
                        switch (tokens) {
                            case (#Err(index)) {
                                throw Error.reject(debug_show (index));
                            };
                            case (#Ok(data)) {
                                return #Ok(data);
                            };
                        };
                        return #Ok(res);
                    };
                };
            };
        };
    };

    public shared ({ caller = user }) func tranfertokens(tokencanisterid : Principal, to : Principal, amount : Nat) : async Typestoken.TxReceipt {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        let tokencansiter_actor = actor (Principal.toText(tokencanisterid)) : actor {
            transfer : (to : Principal, amount : Nat) -> async Typestoken.TxReceipt;
        };
        let tokens = await tokencansiter_actor.transfer(to, amount);
        switch (tokens) {
            case (#Err(index)) {
                throw Error.reject(debug_show (index));
            };
            case (#Ok(data)) {
                return #Ok(data);
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

    public shared ({ caller = user }) func getalltransactions(tokencanisterid : Principal, page : ?Nat32) : async Root.GetTransactionsResponseBorrowed {

        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        let tokencansiter_actor = actor (Principal.toText(tokencanisterid)) : actor {
            getTransactions : (?Nat32) -> async Root.GetTransactionsResponseBorrowed;
        };
        let transactions = await tokencansiter_actor.getTransactions(page);
        return transactions;
    };

    public func getusersfractionnft(user : Principal) : async [(Principal, Types.FractionalNFT, Principal)] {
        // if (Principal.isAnonymous(user)) {
        //     throw Error.reject("User is not authenticated");
        // };
        switch (fractionalnftmap.get(user)) {
            case null {
                return [];
            };
            case (?nft) {
                return nft;
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
            getMetadata : () -> async Typestoken.Metadata;
        };
        let metadata : Types.NftResult = await nftcanisteractor.getNFT(tokenid);
        switch (metadata) {
            case (#Err(index)) {
                throw Error.reject(debug_show (index));
            };
            case (#Ok(data)) {
                let tokenmetadata = await fractiontokencanisteractor.getMetadata();
                let fractionalNftDetails : Types.FractionalNFT = {
                    collectionid = collectioncanisterid;
                    nft = data;
                    fractional_token = tokenmetadata;
                    price_per_share = data.priceinusd / Float.fromInt64(Int64.fromNat64(Nat64.fromNat(tokenmetadata.totalSupply)));
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
        let totalnfts =  await totalfractionalNFTs();
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

    };

    // Postupgrade function to restore the data from stable variables
    system func postupgrade() {

        nftcollectionMap := TrieMap.fromEntries(stablenftcollectionMap.vals(), Principal.equal, Principal.hash);
        favourites := TrieMap.fromEntries(stablefavourites.vals(), Principal.equal, Principal.hash);
        contacts := TrieMap.fromEntries(stablecontacts.vals(), Text.equal, Text.hash);
        fractionalnftmap := TrieMap.fromEntries(stablefractionalnftmap.vals(), Principal.equal, Principal.hash);
    };

    // ******************************************************************************************************************************

    public func get_exchange_rates( x : XRC.Asset , y : XRC.Asset) : async XRC.GetExchangeRateResult {
        let xrc = actor (exchange_rate_canister) : actor {
            get_exchange_rate : ( GetExchangeRateRequest : XRC.GetExchangeRateRequest ) -> async XRC.GetExchangeRateResult;
        };
        let timestamp = Int.div(Time.now(),1_000_000_000) - 120;
        // 2 mintues buffer time to get the exchange rate
        Debug.print(debug_show(timestamp));
        Cycles.add<system>(10_000_000_000);
        let result = await xrc.get_exchange_rate({timestamp : ?Nat64 = ?Nat64.fromIntWrap(timestamp); quote_asset = x; base_asset = y});
        Debug.print(debug_show(Cycles.refunded()));
        Debug.print(debug_show (result));
        return result;
    };
};
