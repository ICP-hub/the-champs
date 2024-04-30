import NFTActorClass "../DIP721-NFT/Nft";
import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Types "../DIP721-NFT/Types";
import DIP20ActorClass "../DIP-20/token";
import List "mo:base/List";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
import Time "mo:base/Time";
import Text "mo:base/Text";
// import Helpers "./helper";

actor Champs {
        
        // public stable var nftcollection : ?NFTActorClass.Dip721NFT = null;
        let g = Source.Source();
        private var nftcollectionMap = TrieMap.TrieMap<Principal, [Principal]>(Principal.equal,Principal.hash);
        private var stavlenftcollectionMap : [(Principal, [Principal])] = [];

        private var favourites = TrieMap.TrieMap<Principal, [Types.Nft] >(Principal.equal,Principal.hash);
        private var stablefavourites : [(Principal, [Types.Nft])] = [];
        
        private var contacts = TrieMap.TrieMap<Types.ContactId, Types.Contact>(Text.equal, Text.hash);
        private stable var stablecontacts : [(Types.ContactId, Types.Contact)] = [];

        private var fractionalnftmap = TrieMap.TrieMap<Principal, [(Types.FractionalNFT,Principal)]>(Principal.equal,Principal.hash);

        public func idQuick() : async Principal { 
            return Principal.fromActor(Champs);
        };

        public shared ({caller = user}) func whoami() : async Principal {
            return user;
        };
        
        public shared ({caller = user}) func createcollection (custodian: Principal, metadata : Types.Dip721NonFungibleToken) : async [Principal] {
            Cycles.add(100_500_000_000);
            Debug.print(debug_show(user));
            let nftcollection = await NFTActorClass.Dip721NFT(custodian, metadata);
            let amountAccepted = await nftcollection.wallet_receive();
            let collection_canister_id = await nftcollection.getCanisterId();
            let champscanister = await idQuick();
            // let new_custodian = await nftcollection.addcustodians(champscanister); 
            // Debug.print(debug_show(new_custodian));
            let nftcustodians = await nftcollection.showcustodians();
            Debug.print(debug_show(nftcustodians));
            let usercollections = nftcollectionMap.get(user);
            switch(usercollections){
                case null {
                    let newcolletions = [collection_canister_id];
                    nftcollectionMap.put(user, newcolletions);
                    return newcolletions;
                };
                case (?collections) {
                    Debug.print(debug_show(collections));
                    let temp = List.push(collection_canister_id, List.fromArray(collections));
                    nftcollectionMap.put(user, List.toArray(temp));
                    return List.toArray(temp);
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
            Debug.print(debug_show(user));
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
                         Cycles.add(100_500_000_000);
                        let fractiontokens = await DIP20ActorClass.Token(
                        _logo,
                        _name,
                        _symbol,
                        _decimals,
                        _totalSupply,
                        _owner,
                        _fee
                    );
                    let amountAccepted = await fractiontokens.wallet_receive();
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
                        nft = nftdata;
                        fractional_token = tokenmetadata;
                    };
                    switch(fractionalnftmap.get(user)){
                        case null {
                            let newfractionalnft = [(fractionNftDetails,tokencanister)];
                            fractionalnftmap.put(user, newfractionalnft);
                            return #Ok(fractionNftDetails);
                        };
                        case (?nft){
                            let temp = List.push((fractionNftDetails,tokencanister), List.fromArray(nft));
                            fractionalnftmap.put(user, List.toArray(temp));
                            return #Ok(fractionNftDetails);
                        };
                    };
                    return #Ok(fractionNftDetails);
                    }
                    }
                };
            };
        };

        

        public func getusersnft (user : Principal) : async Types.MetadataResultArray {
            var results = List.nil<Types.MetadataDesc>(); 
            switch (nftcollectionMap.get(user)){
                case null {
                    return #Err(#InvalidTokenId);
                };
                case (?collections) {
                    Debug.print(debug_show(collections));
                    let userscollections : [Principal] = collections;
                    //How to handle this iteration I want to iter to every index of the array and get the principal
                    for (id in userscollections.vals()){
                        let nftcanisteractor = actor(Principal.toText(id)) : actor {getMetadataDip721 : (token_id: Types.TokenId) -> async Types.MetadataResult; getTokenIdsForUserDip721 : (user: Principal) -> async [Types.TokenId];};
                        let usertokenID : [Types.TokenId] = await nftcanisteractor.getTokenIdsForUserDip721(user);
                        for (tokenid in usertokenID.vals()){
                            let metadata = await nftcanisteractor.getMetadataDip721(tokenid);
                            Debug.print(debug_show(metadata));
                            switch(metadata){
                                case (#Err(index)) {
                                    throw Error.reject(debug_show(index));
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

    public shared ({caller = user}) func getsingleCollectiondetail(collection_id : Principal) : async Types.Dip721NonFungibleToken {
        let nftcanisteractor = actor(Principal.toText(collection_id)) : actor {logoDip721 : () -> async Types.LogoResult; nameDip721 : () -> async Text; symbolDip721 : () -> async Text; getMaxLimitDip721 : () -> async Nat16; getCanisterId : () -> async Principal; bannerDip721 : () -> async Types.LogoResult; descriptionDip721 : () -> async Text;createdAtDip721 : () -> async Time.Time; updatedAtDip721 : () -> async Time.Time;};
        let logo = await nftcanisteractor.logoDip721();
        let name = await nftcanisteractor.nameDip721();
        let symbol = await nftcanisteractor.symbolDip721();
        let totalSupply = await nftcanisteractor.getMaxLimitDip721();
        let description = await nftcanisteractor.descriptionDip721();
        let banner = await nftcanisteractor.bannerDip721();
        let createdAt = await nftcanisteractor.createdAtDip721();
        let updatedAt = await nftcanisteractor.updatedAtDip721();
        let collection : Types.Dip721NonFungibleToken = {
            logo = logo;
            bannerImage = banner;
            description = description;
            created_at = createdAt;
            updated_at = updatedAt;    
            name = name;
            symbol = symbol;
            maxLimit = totalSupply;
        };
        return collection;
    };


    public shared ({caller = admin}) func getallcollections() : async [Types.CollectionDetials] {
        var collection = List.nil<Types.CollectionDetials>();
        for (collections in nftcollectionMap.vals()){
            for (id in collections.vals()){
                let nftcanisteractor = actor(Principal.toText(id)) : actor {logoDip721 : () -> async Types.LogoResult; nameDip721 : () -> async Text; symbolDip721 : () -> async Text; getMaxLimitDip721 : () -> async Nat16; getCanisterId : () -> async Principal; bannerDip721 : () -> async Types.LogoResult; descriptionDip721 : () -> async Text;createdAtDip721 : () -> async Time.Time; updatedAtDip721 : () -> async Time.Time;};
                let logo = await nftcanisteractor.logoDip721();
                let name = await nftcanisteractor.nameDip721();
                let symbol = await nftcanisteractor.symbolDip721();
                let totalSupply = await nftcanisteractor.getMaxLimitDip721();
                let description = await nftcanisteractor.descriptionDip721();
                let banner = await nftcanisteractor.bannerDip721();
                let createdAt = await nftcanisteractor.createdAtDip721();
                let updatedAt = await nftcanisteractor.updatedAtDip721();
                let tempcollection : Types.Dip721NonFungibleToken = {
                    logo = logo;
                    bannerImage = banner;
                    description = description;
                    created_at = createdAt;
                    updated_at = updatedAt;    
                    name = name;
                    symbol = symbol;
                    maxLimit = totalSupply;
                };
                let collection_details: Types.CollectionDetials = {
                    canister_id = id;
                    data = tempcollection;
                };
                collection := List.push(collection_details, collection);
            };
        };
        return List.toArray(collection);
    };

    public shared ({caller = user}) func getcollectionwisenft(collectioncanisterid : Principal) : async [Types.Nft] {
        let nftcanisteractor = actor(Principal.toText(collectioncanisterid)) : actor {getallNFT : () -> async [Types.Nft];};
        let nfts = await nftcanisteractor.getallNFT();
        return nfts;
    };

    public shared ({caller = user}) func getcollectiondetails(collectioncanisterid : Principal) : async Types.Dip721NonFungibleToken {
        let nftcanisteractor = actor(Principal.toText(collectioncanisterid)) : actor {logoDip721 : () -> async Types.LogoResult; nameDip721 : () -> async Text; symbolDip721 : () -> async Text; getMaxLimitDip721 : () -> async Nat16; getCanisterId : () -> async Principal; bannerDip721 : () -> async Types.LogoResult; descriptionDip721 : () -> async Text;createdAtDip721 : () -> async Time.Time; updatedAtDip721 : () -> async Time.Time;};
        let logo = await nftcanisteractor.logoDip721();
        let name = await nftcanisteractor.nameDip721();
        let symbol = await nftcanisteractor.symbolDip721();
        let totalSupply = await nftcanisteractor.getMaxLimitDip721();
        let description = await nftcanisteractor.descriptionDip721();
        let banner = await nftcanisteractor.bannerDip721();
        let createdAt = await nftcanisteractor.createdAtDip721();
        let updatedAt = await nftcanisteractor.updatedAtDip721();
        let collection : Types.Dip721NonFungibleToken = {
            logo = logo;
            bannerImage = banner;
            description = description;
            created_at = createdAt;
            updated_at = updatedAt;    
            name = name;
            symbol = symbol;
            maxLimit = totalSupply;
        };
        return collection;
    };

    public shared ({caller = user}) func addfavourite(collectioncanisterid : Principal, tokenid : Types.TokenId) : async Text {
        let nftcanisteractor = actor(Principal.toText(collectioncanisterid)) : actor {getNFT : (token_id: Types.TokenId) -> async Types.NftResult;};
        let metadata:Types.NftResult = await nftcanisteractor.getNFT(tokenid);
        switch(metadata){
            case (#Err(index)) {
                throw Error.reject(debug_show(index));
            };
            case (#Ok(data)) {
                let userfavourites = favourites.get(user);
                switch(userfavourites){
                    case null {
                        favourites.put(user,[data]);
                        return "Favourite added";
                    };
                    case (?favourite) {
                        let temp:List.List<Types.Nft> = List.push(data, List.fromArray(favourite));
                        favourites.put(user, List.toArray(temp));
                        return "Favourite added";
                    };
                };
            };
        };
    };

    public shared ({caller = user}) func getfavourites() : async [Types.Nft] {
        let userfavourites = favourites.get(user);
        switch(userfavourites){
            case null {
                return [];
            };
            case (?favourite) {
                return favourite;
            };
        };
    };

    public shared ({caller = user}) func removefavourite(tokenid : Types.TokenId) : async Text {
        let userfavourites = favourites.get(user);
        switch(userfavourites){
            case null {
                return "Favourite not found";
            };
            case (?favourite) {
                let temp:List.List<Types.Nft> = List.fromArray(favourite);
                let newlist:List.List<Types.Nft> = List.filter<Types.Nft>(temp, func x : Bool {x.id != tokenid});
                favourites.put(user, List.toArray(newlist));
                return "Favourite removed";
            };
        };
    };

    public shared({caller = user}) func getallfavourites () : async [Types.Nft] {
        let userfavourites = favourites.get(user);
        switch(userfavourites){
            case null {
                return [];
            };
            case (?favourite) {
                return favourite;
            };
        };
    };

    public shared ({caller = user}) func getNFTdetails(collectioncanisterid : Principal, tokenid : Types.TokenId) : async Types.Nft {
        let nftcanisteractor = actor(Principal.toText(collectioncanisterid)) : actor {getNFT : (token_id: Types.TokenId) -> async Types.NftResult;};
        let metadata:Types.NftResult = await nftcanisteractor.getNFT(tokenid);
        switch(metadata){
            case (#Err(index)) {
                throw Error.reject(debug_show(index));
            };
            case (#Ok(data)) {
                return data;
            };
        };
    };

    // ******************************************* Contact US CRUD functions *************************************************************

        public func createContact(co : Types.UserContact) : async Result.Result<(Types.Contact), Types.CreateContactError> {

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
    
    system func preupgrade() {
    };

    // Postupgrade function to restore the data from stable variables
    system func postupgrade() {
    };
}
