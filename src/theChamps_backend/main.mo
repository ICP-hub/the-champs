import NFTActorClass "../DIP721-NFT/Nft";
import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Types "../DIP721-NFT/Types";
import DIP20ActorClass "../DIP-20/token";

actor Champs {
     
        // public stable var nftcollection : ?NFTActorClass.Dip721NFT = null;
        
        var nftcollectionMap = HashMap.HashMap<Principal, Principal>(0,Principal.equal,Principal.hash);

        public func idQuick() : async Principal { 
            return Principal.fromActor(Champs);
        };
        
        public shared ({caller = user}) func createcollection (custodian: Principal, metadata : Types.Dip721NonFungibleToken) : async Principal {
            Cycles.add(100_500_000_000);
            let nftcollection = await NFTActorClass.Dip721NFT(custodian, metadata);
            let amountAccepted = await nftcollection.wallet_receive();
            let collection_canister_id = await nftcollection.getCanisterId();
            let champscanister = await idQuick();
            let new_custodian = await nftcollection.addcustodians(champscanister);
            nftcollectionMap.put(user,collection_canister_id);
            return collection_canister_id;
        };

        
        public shared ({caller = user}) func FractionalizeNFt( 
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
            Cycles.add(100_500_000_000);
            Debug.print(debug_show(Cycles.balance()));
            let collection_canister_id  = nftcollectionMap.get(user);
            switch (collection_canister_id){
                case (null) {
                    return "NFT collection not found";
                };
                case (?id) { 
                    //TODO: Issue is the creator of the collection is the user but here the canister is calling the mint function 
                    let nftcanisteractor = actor(Principal.toText(id)) : actor {mintDip721 : (to : Principal , metadata : Types.MetadataDesc ) -> async Types.MintReceipt};
                    let mintednft = await nftcanisteractor.mintDip721(to, metadata);
                    switch(mintednft){
                        case (#Err(index)) {
                            throw Error.reject(debug_show(index));
                        };
                        case (#Ok(newnft)){
                        let fractiontokens = await DIP20ActorClass.Token(
                        _logo,
                        _name,
                        _symbol,
                        _decimals,
                        _totalSupply,
                        _owner,
                        _fee
                    );
                    let minttokens = await fractiontokens.mint(tokenowner, _totalSupply);
                    return "NFT fractionalized";
                        }
                    }
                };
            };

            };
}
