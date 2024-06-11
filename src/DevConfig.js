//Decides if canister ids used are of production or development
const production = false;

export const host = production ? "https://icp-api.io" : "http://127.0.0.1:4943";

export const ids = {
  userCan: production
    ? // "tassb-3qaaa-aaaan-qloxq-cai":
      "xlygc-qqaaa-aaaao-a3odq-cai"
    : "be2us-64aaa-aaaaa-qaabq-cai",

  hotelCan: production
    ? "wbxey-saaaa-aaaao-a3oeq-cai"
    : // "5mldq-waaaa-aaaan-qlqta-cai":
      "b77ix-eeaaa-aaaaa-qaada-cai",
  backendCan: production
    ? // "thtuv-wiaaa-aaaan-qloxa-cai":
      "5cjoy-nqaaa-aaaan-qlqsa-cai"
    : "be2us-64aaa-aaaaa-qaabq-cai",
  reviewCan: production
    ? "w2sy5-iyaaa-aaaao-a3oga-cai"
    : "bd3sg-teaaa-aaaaa-qaaba-cai",
  bookingCan: production
    ? "krcsw-aaaaa-aaaak-akqea-cai"
    : "br5f7-7uaaa-aaaaa-qaaca-cai",
  ICPtokenCan: production
    ? "ryjl3-tyaaa-aaaaa-aaaba-cai"
    : "ryjl3-tyaaa-aaaaa-aaaba-cai", //bw4dl-smaaa-aaaaa-qaacq-cai
  ckBTCtokenCan: production
    ? "mxzaz-hqaaa-aaaar-qaada-cai"
    : "mxzaz-hqaaa-aaaar-qaada-cai",
  ckETHtokenCan: production
    ? "ss2fx-dyaaa-aaaar-qacoq-cai"
    : "ss2fx-dyaaa-aaaar-qacoq-cai",
  commentCan: production
    ? "wpvjq-jqaaa-aaaao-a3ofq-cai"
    : "bw4dl-smaaa-aaaaa-qaacq-cai",
  supportCan: production
    ? "wgwcm-7yaaa-aaaao-a3oea-cai"
    : "by6od-j4aaa-aaaaa-qaadq-cai",
};
