export const validateForm = (formData, selectedImage) => {
  const errors = {};

  if (!formData.name) {
    errors.name = "NFT Name is required";
  }
  if (!formData.priceInUsd) {
    errors.priceInUsd = "NFT Price is required";
  }
  if (!formData.fee) {
    errors.fee = "Processing Fee is required";
  }
  if (!formData.metaData[0].description) {
    errors.description = "Description is required";
  }
  if (!formData.metaData[0].key_val_data.length) {
    errors.key_val_data = "At least one key-value pair is required";
  }
  formData.metaData[0].key_val_data.forEach((kv, index) => {
    if (!kv.key || !kv.val.TextContent) {
      errors[`key_val_data`] = "Both key and value are required";
    }
  });
  if (!selectedImage) {
    errors.selectedImage = "NFT Image is required";
  }

  return errors;
};
