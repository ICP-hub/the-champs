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
import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";

import DIP20ActorClass "../DIP-20/token";
import Typestoken "../DIP-20/types";
import NFTActorClass "../DIP721-NFT/Nft";
import Types "../DIP721-NFT/Types";
// import Helpers "./helper";

actor Champs {

        // public stable var nftcollection : ?NFTActorClass.Dip721NFT = null;
        let g = Source.Source();
        // stores collection canister id of the user
        private var nftcollectionMap = TrieMap.TrieMap<Principal, [Principal]>(Principal.equal,Principal.hash);
        private var stablenftcollectionMap : [(Principal, [Principal])] = [];

        private var favourites = TrieMap.TrieMap<Principal, [(Types.Nft,Principal)]>(Principal.equal, Principal.hash);
        private var stablefavourites : [(Principal, [Types.Nft])] = [];

        private var contacts = TrieMap.TrieMap<Types.ContactId, Types.Contact>(Text.equal, Text.hash);
        private stable var stablecontacts : [(Types.ContactId, Types.Contact)] = [];

        private var fractionalnftmap = TrieMap.TrieMap<Principal, [(Principal,Types.FractionalNFT,Principal)]>(Principal.equal,Principal.hash);
        
        public func idQuick() : async Principal { 
            return Principal.fromActor(Champs);
        };

    public shared ({ caller = user }) func whoami() : async Principal {
        return user;
    };

    public shared ({ caller = user }) func createcollection( logo: Types.LogoResult, banner: Types.LogoResult, description: Text, name: Text, symbol: Text, maxLimit : Nat16,featured: Bool)  : async (Principal,[Principal]) {
        Cycles.add<system>(100_500_000_000);
        Debug.print(debug_show (user));
        let metadata : Types.Dip721NonFungibleToken = {
            logo = logo;
            banner = banner;
            description = description;
            created_at  = Time.now();
            name = name;
            symbol = symbol;
            maxLimit = maxLimit;
            featured = featured;
        };
        let nftcollection = await NFTActorClass.Dip721NFT(Principal.fromActor(Champs), metadata);
        ignore await nftcollection.wallet_receive();
        let collection_canister_id = await nftcollection.getCanisterId();
        let new_custodian = await nftcollection.addcustodians(user);
        Debug.print(" New added custodian is : " # debug_show(new_custodian));
        let nftcustodians = await nftcollection.showcustodians();
        Debug.print( "These are the list of current custodians : " #debug_show (nftcustodians));
        let usercollections = nftcollectionMap.get(user);
        switch (usercollections) {
            case null {
                let newcolletions = [collection_canister_id];
                nftcollectionMap.put(user, newcolletions);
                return (user,newcolletions);
            };
            case (?collections) {
                Debug.print( "The current existing Collections are these : " # debug_show (collections));
                let temp = List.push(collection_canister_id, List.fromArray(collections));
                nftcollectionMap.put(user, List.toArray(temp));
                return (user, List.toArray(temp));
            };
        };
    };

    // public shared ({caller = user}) func TransferDIP20tokens (to : Principal, amount : Nat) : async Text {
    //     let fractiontokens = await DIP20ActorClass.Token();
    //     let amountAccepted = await fractiontokens.wallet_receive();
    //     let transfer = await fractiontokens.transfer(to, amount);
    //     return "Tokens transferred";
    // };

        public shared ({caller = user}) func FractionalizeNFt(
            nftcanisterid : Principal,
            to : Principal,
            tokenowner : Principal,
            metadata : Types.MetadataDesc,
            _logo : Text,
            _name: Text,
            _symbol: Text,
            _decimals: Nat8,
            _totalSupply: Nat,
            _owner: Principal,
            _fee : Nat 
            ) : async Types.FractionalNFTResult {
            Debug.print(debug_show(Cycles.balance()));
            let collection_canister_id  = nftcollectionMap.get(user);
            switch (collection_canister_id){
                case (null) {
                    return #Err(#CollectionNotFound);
                };
                case (?id) {  
                    let nftcanisteractor = actor(Principal.toText(nftcanisterid)) : actor {mintDip721 : (to : Principal , metadata : Types.MetadataDesc ) -> async Types.MintReceipt};
                    let mintednft = await nftcanisteractor.mintDip721(to, metadata);
                    switch(mintednft){
                        case (#Err(index)) {
                            throw Error.reject(debug_show(index));
                        };
                        case (#Ok(newnft)){
                        Debug.print(debug_show(newnft));
                        Cycles.add<system>(100_500_000_000);
                        let fractiontokens = await DIP20ActorClass.Token(
                        _logo,
                        _name,
                        _symbol,
                        _decimals,
                        _totalSupply,
                        _owner,
                        _fee
                    );
                    ignore await fractiontokens.wallet_receive();
                    let minttokens = await fractiontokens.mint(tokenowner, _totalSupply);
                    Debug.print(debug_show(minttokens));
                    let tokencanister : Principal = await fractiontokens.getCanisterId();
                    Debug.print(debug_show(tokencanister));
                    let tokenmetadata = {
                        logo = _logo;
                        name = _name;
                        symbol = _symbol;
                        decimals = _decimals;
                        totalSupply = _totalSupply;
                        owner = _owner;
                        fee = _fee;
                    };

                    let nftdata = await getNFTdetails(nftcanisterid, newnft.token_id);
                    
                    let fractionNftDetails : Types.FractionalNFT = {
                        collectionid = nftcanisterid;
                        nft = nftdata;
                        fractional_token = tokenmetadata;
                    };
                    switch(fractionalnftmap.get(to)){
                        case null {
                            let newfractionalnft = [(nftcanisterid,fractionNftDetails,tokencanister)];
                            fractionalnftmap.put(to, newfractionalnft);
                            return #Ok(fractionNftDetails);
                        };
                        case (?nft){
                            let temp = List.push((nftcanisterid,fractionNftDetails,tokencanister), List.fromArray(nft));
                            fractionalnftmap.put(to, List.toArray(temp));
                            return #Ok(fractionNftDetails);
                        };
                    };
                    return #Ok(fractionNftDetails);
                    }
                    }
                };
            };
        };

    public func getusersnft(user : Principal) : async Types.MetadataResultArray {
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

    public func getusersfractionnft(user : Principal) : async [(Principal,Types.FractionalNFT, Principal)] {
        switch (fractionalnftmap.get(user)) {
            case null {
                return [];
            };
            case (?nft) {
                return nft;
            };
        };
    };

    public shared({caller = user}) func getallfractionalnfts () : async [(Principal,Types.FractionalNFT,Principal)] {
        var results = List.nil<(Principal,Types.FractionalNFT,Principal)>(); 
        for (nft in fractionalnftmap.vals()){
            for (fractionalnft in nft.vals()){
                results := List.push(fractionalnft, results);
            };
        };
        return List.toArray(results);
    };


    public shared ({ caller = user }) func getsingleCollectiondetail(collection_id : Principal) : async Types.Dip721NonFungibleToken {
        let nftcanisteractor = actor (Principal.toText(collection_id)) : actor {
            logoDip721 : () -> async Types.LogoResult;
            nameDip721 : () -> async Text;
            symbolDip721 : () -> async Text;
            getMaxLimitDip721 : () -> async Nat16;
            bannerDip721 : () -> async Types.LogoResult;
            descriptionDip721 : () -> async Text;
            createdAtDip721 : () -> async Time.Time;
            featuredDip721 : () -> async Bool;
        };
        let logo = await nftcanisteractor.logoDip721();
        let name = await nftcanisteractor.nameDip721();
        let symbol = await nftcanisteractor.symbolDip721();
        let totalSupply = await nftcanisteractor.getMaxLimitDip721();
        let banner = await nftcanisteractor.bannerDip721();
        let description = await nftcanisteractor.descriptionDip721();
        let createdAt = await nftcanisteractor.createdAtDip721();
        let featured = await nftcanisteractor.featuredDip721();
        let collection : Types.Dip721NonFungibleToken = {
            logo = logo;
            name = name;
            symbol = symbol;
            maxLimit = totalSupply;
            banner = banner;
            description = description;
            created_at = createdAt;
            featured = featured;
        };
        return collection;
    };

    public shared ({ caller = admin }) func getallcollections() : async [Types.CollectionDetials] {
        var collection = List.nil<Types.CollectionDetials>();
        for (collections in nftcollectionMap.vals()) {
            for (id in collections.vals()) {
                let nftcanisteractor = actor (Principal.toText(id)) : actor {
                    logoDip721 : () -> async Types.LogoResult;
                    nameDip721 : () -> async Text;
                    symbolDip721 : () -> async Text;
                    getMaxLimitDip721 : () -> async Nat16;
                    getCanisterId : () -> async Principal;
                    bannerDip721 : () -> async Types.LogoResult;
                    descriptionDip721 : () -> async Text;
                    createdAtDip721 : () -> async Time.Time;
                    featuredDip721 : () -> async Bool;
                };
                let logo = await nftcanisteractor.logoDip721();
                let name = await nftcanisteractor.nameDip721();
                let symbol = await nftcanisteractor.symbolDip721();
                let totalSupply = await nftcanisteractor.getMaxLimitDip721();
                let banner = await nftcanisteractor.bannerDip721();
                let description = await nftcanisteractor.descriptionDip721();
                let createdAt = await nftcanisteractor.createdAtDip721();
                let featured = await nftcanisteractor.featuredDip721();
                let tempcollection : Types.Dip721NonFungibleToken = {
                    logo = logo;
                    name = name;
                    symbol = symbol;
                    maxLimit = totalSupply;
                    banner = banner;
                    description = description;
                    created_at = createdAt;
                    featured = featured;
                };
                let collection_details : Types.CollectionDetials = {
                    canister_id = id;
                    data = tempcollection;
                };
                collection := List.push(collection_details, collection);
            };
        };
        return List.toArray(collection);
    };

    public shared ({ caller = user }) func getcollectionwisefractionalnft(collectioncanisterid : Principal) : async [Types.FractionalNFT] {
        var collectionnft : List.List<(Types.FractionalNFT)> = List.nil<Types.FractionalNFT>();
        for (nft in fractionalnftmap.vals()){
            for (fractionalnft in nft.vals()){
                if (fractionalnft.0 == collectioncanisterid){
                    collectionnft := List.push(fractionalnft.1, collectionnft);
                };
            };
        };
        return List.toArray(collectionnft);
    };

    
    public shared ({ caller = user }) func getcollectiondetails(collectioncanisterid : Principal) : async Types.Dip721NonFungibleToken {
        let nftcanisteractor = actor (Principal.toText(collectioncanisterid)) : actor {
            logoDip721 : () -> async Types.LogoResult;
            nameDip721 : () -> async Text;
            symbolDip721 : () -> async Text;
            getMaxLimitDip721 : () -> async Nat16;
            bannerDip721 : () -> async Types.LogoResult;
            descriptionDip721 : () -> async Text;
            createdAtDip721 : () -> async Time.Time;
            featuredDip721 : () -> async Bool;
        };
        let logo = await nftcanisteractor.logoDip721();
        let name = await nftcanisteractor.nameDip721();
        let symbol = await nftcanisteractor.symbolDip721();
        let totalSupply = await nftcanisteractor.getMaxLimitDip721();
        let banner = await nftcanisteractor.bannerDip721();
        let description = await nftcanisteractor.descriptionDip721();
        let createdAt = await nftcanisteractor.createdAtDip721();
        let featured = await nftcanisteractor.featuredDip721();
        let collection : Types.Dip721NonFungibleToken = {
            logo = logo;
            name = name;
            symbol = symbol;
            maxLimit = totalSupply;
            banner = banner;
            description = description;
            created_at = createdAt;
            featured = featured;
        };
        return collection;
    };

    public shared ({ caller = user }) func addfavourite(collectioncanisterid : Principal, tokenid : Types.TokenId) : async Text {
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
                        favourites.put(user, [(data,collectioncanisterid)]);
                        return "Favourite added";
                    };
                    case (?favourite) {
                        let temp : List.List<(Types.Nft,Principal)> = List.push((data,collectioncanisterid), List.fromArray(favourite));
                        favourites.put(user, List.toArray(temp));
                        return "Favourite added";
                    };
                };
            };
        };
    };

    public shared ({ caller = user }) func getfavourites() : async [(Types.Nft,Principal)] {
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

    public shared ({ caller = user }) func removefavourite(collection_id : Principal, tokenid : Types.TokenId) : async Text {
        let userfavourites = favourites.get(user);
        switch (userfavourites) {
            case null {
                return "There are no favouites added yet !";
            };
            case (?favourite) {
                let temp : List.List<(Types.Nft,Principal)> = List.fromArray(favourite);
                let newlist : List.List<(Types.Nft,Principal)> = List.filter<(Types.Nft,Principal)>(temp, func x : Bool { x.0.id != tokenid and x.1 != collection_id});
                favourites.put(user, List.toArray(newlist));
                return "Favourite removed";
            };
        };
    };

    public shared ({ caller = user }) func getNFTdetails(collectioncanisterid : Principal, tokenid : Types.TokenId ) : async Types.Nft {
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

    public shared ({caller = user}) func getFractionalNftDetails (tokenid : Types.TokenId, tokencanister : Principal, collectioncanisterid : Principal) : async Types.FractionalNFT {
        let nftcanisteractor = actor(Principal.toText(collectioncanisterid)) : actor {getNFT : (token_id: Types.TokenId) -> async Types.NftResult;};
        let fractiontokencanisteractor = actor(Principal.toText(tokencanister)) : actor {getMetadata : () -> async Typestoken.Metadata;};
        let metadata:Types.NftResult = await nftcanisteractor.getNFT(tokenid);
        switch(metadata){
            case (#Err(index)) {
                throw Error.reject(debug_show(index));
            };
            case (#Ok(data)) {
                let tokenmetadata = await fractiontokencanisteractor.getMetadata();
                let fractionalNftDetails : Types.FractionalNFT = {
                    collectionid = collectioncanisterid;
                    nft = data;
                    fractional_token = tokenmetadata;
                };
                return fractionalNftDetails;
            };
        };
    };
        

    // ******************************************* Contact US CRUD functions *************************************************************

    public shared (msg) func createContact(co : Types.UserContact) : async Result.Result<(Types.Contact), Types.CreateContactError> {

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

    public shared (msg) func updateContact(
        id : Types.ContactId,
        read : Bool,
    ) : async Result.Result<(Types.Contact), Types.UpdateContactError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
        // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };

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

    public shared (msg) func deleteContact(id : Types.ContactId) : async Result.Result<(), Types.DeleteContactError> {
        let userPrincipalStr = Principal.toText(msg.caller);

        // Check if the caller is an admin
        // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };
        contacts.delete(id);
        return #ok(());
    };

    public query func listContacts() : async [(Types.ContactId, Types.Contact)] {
        return Iter.toArray(contacts.entries());
    };


    // ********************************************** Buy and Transfer of tokens *************************************************************



    system func preupgrade() {};

    // Postupgrade function to restore the data from stable variables
    system func postupgrade() {
    };
}

