import NFTActorClass "../DIP721-NFT/Nft";
import Cycles "mo:base/ExperimentalCycles";
import Types "../DIP721-NFT/Types";
import DIP20ActorClass "../DIP-20/token";
actor {
        public stable let nftcollection : NFTActorClass = null;
        
        public func createcollection (custodian: Principal, metadata : Types.MetadataDesc) : async Text {
            nftcollection := NFTActorClass.Dip721NFT(custodian, metadata);
            return "Collection created";
        };
        
        public func FractionalizeNFt( 
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
            let newmintedNFT = await nftcollection.mintDip721(to, metadata);
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
            };


}
