#!/usr/bin/env bash
dfx stop
set -e  # stop on error

dfx start --background --clean
dfx identity new alice --disable-encryption || true
ALICE=$(dfx --identity alice identity get-principal)
dfx identity new bob --disable-encryption || true
BOB=$(dfx --identity bob identity get-principal)

dfx deploy theChamps_backend

dfx canister call theChamps_backend createcollection \
"(
    principal\"$(dfx identity get-principal)\", 
    record {
        maxLimit = 5000:nat16; 
        logo = record {
            data = \"Your logo text here\"; 
            logo_type = \"Your logo type here\"
        }; 
        name = \"Your collection name here\"; 
        symbol = \"Your collection symbol here\"
    }
)"

dfx canister call theChamps_backend FractionalizeNFt \
"(
    principal\"be2us-64aaa-aaaaa-qaabq-cai\",
    principal\"$(dfx identity get-principal)\", 
    principal\"$(dfx identity get-principal)\", 
    vec { 
        record {
            data = blob\"data_in_bytes_here\"; 
            key_val_data = vec {
                record { key = \"size\"; val = variant{Nat64Content=123456:nat64}; };
                record { key = \"format\"; val = variant{TextContent=\"JPEG\"}; };
                record { key = \"resolution\"; val = variant{Nat32Content=1080:nat32}; };
                record { key = \"quality\"; val = variant{Nat8Content=95:nat8}; };
                record { key = \"fileType\"; val = variant{TextContent=\"image/jpeg\"}; };
                record { key = \"tag\"; val = variant{TextContent=\"landscape\"}; };
                record { key = \"locationType\"; val = variant{Nat8Content=4:nat8}; };
                record { key = \"logo\"; val = variant{BlobContent=blob\"http://logo_url.com\"}; };
                record { key = \"symbol\"; val = variant{TextContent=\"SYMB\"}; };
            };
            purpose = variant{Rendered};
        }
    },
    \"Additional Text 1\", 
    \"Additional Text 2\", 
    \"Additional Text 3\", 
    42:nat8, 
    123456789:nat, 
    principal\"$(dfx identity get-principal)\", 
    99:nat
)"


dfx canister call theChamps_backend getusersnft

echo "Done" 
