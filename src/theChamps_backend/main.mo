import NFTActorClass "../DIP721-NFT/Nft";
import Iter "mo:base/Iter";
import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Types "../DIP721-NFT/Types";
import DIP20ActorClass "../DIP-20/token";
import List "mo:base/List";

actor Champs {
     
        // public stable var nftcollection : ?NFTActorClass.Dip721NFT = null;
        
        var nftcollectionMap = HashMap.HashMap<Principal, [Principal]>(0,Principal.equal,Principal.hash);

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
            let new_custodian = await nftcollection.addcustodians(champscanister);
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
                    let tokencanister = await fractiontokens.getCanisterId();
                    Debug.print(debug_show(tokencanister));
                    return "NFT fractionalized";
                    }
                    }
                };
            };

            };

        public shared ({caller = user}) func getusersnft () : async [Types.MetadataResult] {
            var results = List.nil<[Types.MetadataResult]>(); 
            switch (nftcollectionMap.get(user)){
                case null {
                    return [#Err(#InvalidTokenId)];
                };
                case (?collections) {
                    let userscollections : [Principal] = collections;
                    //How to handle this iteration I want to iter to every index of the array and get the principal
                    for (id in userscollections.vals()){
                        let nftcanisteractor = actor(Principal.toText(id)) : actor {getMetadataDip721 : (token_id: Types.TokenId) -> async Types.MetadataResult; getTokenIdsForUserDip721 : (user: Principal) -> async [Types.TokenId];};
                        let usertokenID : [Types.TokenId] = await nftcanisteractor.getTokenIdsForUserDip721(user);
                        for (tokenid in usertokenID.vals()){
                            let metadata = await nftcanisteractor.getMetadataDip721(tokenid);                          
                    };
                };
                return results;
            };
        };
    };
};

