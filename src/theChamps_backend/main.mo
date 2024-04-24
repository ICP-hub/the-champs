import NFTActorClass "../DIP721-NFT/Nft";
import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Types "../DIP721-NFT/Types";
import DIP20ActorClass "../DIP-20/token";
import List "mo:base/List";
import TrieMap "mo:base/TrieMap";
// import Helpers "./helper";

actor Champs {
     
        // public stable var nftcollection : ?NFTActorClass.Dip721NFT = null;
        
        var nftcollectionMap = TrieMap.TrieMap<Principal, [Principal]>(Principal.equal,Principal.hash);
        var favourites = TrieMap.TrieMap<Principal, [Types.MetadataDesc] >(Principal.equal,Principal.hash);

        public func idQuick() : async Principal { 
            return Principal.fromActor(Champs);
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
            ) : async Text {
            Debug.print(debug_show(Cycles.balance()));
            Debug.print(debug_show(user));
            let collection_canister_id  = nftcollectionMap.get(user);
            switch (collection_canister_id){
                case (null) {
                    return "NFT collection not found";
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
                    let tokencanister = await fractiontokens.getCanisterId();
                    Debug.print(debug_show(tokencanister));
                    return "NFT fractionalized";
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

    public shared ({caller = admin}) func getallcollections() : async [Types.Dip721NonFungibleToken] {
        var collection = List.nil<Types.Dip721NonFungibleToken>();
        for (collections in nftcollectionMap.vals()){
            for (id in collections.vals()){
                let nftcanisteractor = actor(Principal.toText(id)) : actor {logoDip721 : () -> async Types.LogoResult; nameDip721 : () -> async Text; symbolDip721 : () -> async Text; getMaxLimitDip721 : () -> async Nat16;};
                let logo = await nftcanisteractor.logoDip721();
                let name = await nftcanisteractor.nameDip721();
                let symbol = await nftcanisteractor.symbolDip721();
                let totalSupply = await nftcanisteractor.getMaxLimitDip721();
                let tempcollection : Types.Dip721NonFungibleToken = {
                    logo = logo;
                    name = name;
                    symbol = symbol;
                    maxLimit = totalSupply;
                };
                collection := List.push(tempcollection, collection);
            };
        };
        return List.toArray(collection);
    };

    public shared ({caller = user}) func getcollectionwisenft(collectioncanisterid : Principal) : async [Types.Nft] {
        let nftcanisteractor = actor(Principal.toText(collectioncanisterid)) : actor {getallNFT : () -> async [Types.Nft];};
        let nfts = await nftcanisteractor.getallNFT();
        return nfts;
    };

    public shared ({caller = user}) func addfavourite(collectioncanisterid : Principal, tokenid : Types.TokenId) : async Text {
        let nftcanisteractor = actor(Principal.toText(collectioncanisterid)) : actor {getMetadataDip721 : (token_id: Types.TokenId) -> async Types.MetadataResult;};
        let metadata:Types.MetadataResult = await nftcanisteractor.getMetadataDip721(tokenid);
        switch(metadata){
            case (#Err(index)) {
                throw Error.reject(debug_show(index));
            };
            case (#Ok(data)) {
                let userfavourites = favourites.get(user);
                switch(userfavourites){
                    case null {
                        let temp =  List.push(data, List.nil<Types.MetadataDesc>());
                        favourites.put(user,List.toArray(temp));
                        return "Favourite added";
                    };
                    case (?favourite) {
                        let temp:List.List<Types.MetadataDesc> = List.push(data, List.fromArray(favourite));
                        favourites.put(user, List.toArray(temp));
                        return "Favourite added";
                    };
                };
            };
        };
    };

    public shared ({caller = user}) func getfavourites() : async [Types.MetadataDesc] {
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

    // public shared ({caller = user}) func removefavourite(collectioncanisterid : Principal, tokenid : Types.TokenId) : async Text {
    //     let nftcanisteractor = actor(Principal.toText(collectioncanisterid)) : actor {getMetadataDip721 : (token_id: Types.TokenId) -> async Types.MetadataResult;};
    //     let metadata:Types.MetadataResult = await nftcanisteractor.getMetadataDip721(tokenid);
    //     switch(metadata){
    //         case (#Err(index)) {
    //             throw Error.reject(debug_show(index));
    //         };
    //         case (#Ok(data)) {
    //             let userfavourites = favourites.get(user);
    //             switch(userfavourites){
    //                 case null {
    //                     return "Favourite not found";
    //                 };
    //                 case (?favourite) {
    //                     let temp:List.List<Types.MetadataDesc> = List.remove(data, List.fromArray(favourite));
    //                     favourites.put(user, List.toArray(temp));
    //                     return "Favourite removed";
    //                 };
    //             };
    //         };
    //     };
    // };

}
