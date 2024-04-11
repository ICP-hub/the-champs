import NFTActorClass "../DIP721-NFT/Nft";
import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Types "../DIP721-NFT/Types";
import DIP20ActorClass "../DIP-20/token";

actor {
        //! 
        // public stable var nftcollection : ?NFTActorClass.Dip721NFT = null;
        

        var nftcollectionMap = HashMap.HashMap<Principal, NFTActorClass.Dip721NFT>(0,Principal.equal,Principal.hash);
        
        public shared ({caller = user}) func createcollection (custodian: Principal, metadata : Types.Dip721NonFungibleToken) : async Text {
            Cycles.add(100_500_000_000);
            let nftcollection = await NFTActorClass.Dip721NFT(custodian, metadata);
            let amountAccepted = await nftcollection.wallet_receive();

            nftcollectionMap.put(user, nftcollection);
            return "NFT collection created";
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
            let nftcollectionopt = nftcollectionMap.get(user);
            switch (nftcollectionopt){
                case (null) {
                    return "NFT collection not found";
                };
                case (?nftcollection) { 
                    return "NFT collection not found";
                    let mintednft = await nftcollection.mintDip721(to, metadata);
                    switch(mintednft){
                        case (#Err(_)) {
                            return "NFT not minted";
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
