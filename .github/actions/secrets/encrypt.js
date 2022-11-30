const sodium = require("libsodium-wrappers");
const core = require("@actions/core");

const text = core.getInput("text"); // replace with the secret you want to encrypt
const key = core.getInput("key"); // replace with the Base64 encoded public key

//Check if libsodium is ready and then proceed.
sodium.ready.then(() => {
  // Convert Text & Base64 key to Uint8Array.
  let binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
  let binsec = sodium.from_string(text);

  //Encrypt the text using LibSodium
  let encBytes = sodium.crypto_box_seal(binsec, binkey);

  // Convert encrypted Uint8Array to Base64
  let secret = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);

  core.setOutput("secret", secret);

  console.log(secret);
});
