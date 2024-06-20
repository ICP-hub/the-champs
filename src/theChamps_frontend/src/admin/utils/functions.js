export const transformTokenData = (tokenData) => {
  const keyMap = {
    "icrc1:name": "name",
    "icrc1:symbol": "symbol",
    "icrc1:decimals": "decimals",
    "icrc1:fee": "fee",
  };

  return tokenData.reduce((acc, [key, value]) => {
    const readableKey = keyMap[key] || key;
    const readableValue =
      value.Text || value.Nat?.toString() || JSON.stringify(value);
    acc[readableKey] = readableValue;
    return acc;
  }, {});
};
