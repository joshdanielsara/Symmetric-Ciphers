

// AES Cipher Encryption using CryptoJS
function aesEncrypt(str, key) {
    // Generate the AES key by padding it to match the correct length (128, 192, 256 bits)
    const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.AES.encrypt(str, keyUtf8, { keySize: 128 / 32, iv: CryptoJS.enc.Utf8.parse('0000000000000000') });
    return encrypted.toString();  // Return the encrypted text as Base64 string
}

// AES Cipher Decryption using CryptoJS
function aesDecrypt(str, key) {
    // Generate the AES key by padding it to match the correct length (128, 192, 256 bits)
    const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
    const decrypted = CryptoJS.AES.decrypt(str, keyUtf8, { keySize: 128 / 32, iv: CryptoJS.enc.Utf8.parse('0000000000000000') });
    return decrypted.toString(CryptoJS.enc.Utf8);  // Convert decrypted bytes back to UTF-8 string
}
