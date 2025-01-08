function aesEncrypt(str, key, keyLength, mode, padding, iv, outputFormat) {
    const keyUtf8 = CryptoJS.enc.Utf8.parse(adjustKeyToLength(key, keyLength));
    const ivUtf8 = CryptoJS.enc.Utf8.parse(iv || '0000000000000000');  // Default IV if not provided

    // Select the encryption mode
    let selectedMode;
    switch (mode) {
        case 'CBC':
            selectedMode = CryptoJS.mode.CBC;
            break;
        case 'ECB':
            selectedMode = CryptoJS.mode.ECB;
            break;
        case 'CTR':
            selectedMode = CryptoJS.mode.CTR;
            break;
        case 'GCM':
            selectedMode = CryptoJS.mode.GCM;
            break;
        default:
            selectedMode = CryptoJS.mode.CBC;  // Default to CBC if no mode is selected
    }

    // Select the padding
    const selectedPadding = (padding === 'PKCS5Padding') ? CryptoJS.pad.Pkcs7 : CryptoJS.pad.NoPadding;

    // Encrypt the input string using AES with the specified key size, IV, mode, and padding
    const encrypted = CryptoJS.AES.encrypt(str, keyUtf8, {
        iv: ivUtf8,
        keySize: keyLength / 32,  // Adjusting key size based on the selected length
        mode: selectedMode,
        padding: selectedPadding,
    });

    // Debugging: Log the encrypted result
    console.log('Encrypted:', encrypted.toString());

    // Get the encrypted output in the selected format
    if (outputFormat === 'Base64') {
        return encrypted.toString();  // Base64 format (default)
    } else if (outputFormat === 'Hex') {
        return encrypted.ciphertext.toString(CryptoJS.enc.Hex);  // Hex format
    }
}


function adjustKeyToLength(key, keyLength) {
    // Convert key to a WordArray (CryptoJS format)
    const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
    const keyWords = keyUtf8.words;

    // Adjust the key length based on the selected key size
    if (keyLength === 128) {
        // 128 bits = 16 bytes = 4 words (32-bit each)
        return CryptoJS.enc.Utf8.stringify(CryptoJS.lib.WordArray.create(keyWords.slice(0, 4)));  // First 128 bits
    } else if (keyLength === 192) {
        // 192 bits = 24 bytes = 6 words (32-bit each)
        return CryptoJS.enc.Utf8.stringify(CryptoJS.lib.WordArray.create(keyWords.slice(0, 6)));  // First 192 bits
    } else if (keyLength === 256) {
        // 256 bits = 32 bytes = 8 words (32-bit each)
        return CryptoJS.enc.Utf8.stringify(CryptoJS.lib.WordArray.create(keyWords.slice(0, 8)));  // First 256 bits
    }

    // If no valid key length is specified, return the original key
    return key;
}

// AES Decryption
function aesDecrypt(encryptedStr, key, keyLength, mode, padding, iv, outputFormat) {
    const keyUtf8 = CryptoJS.enc.Utf8.parse(adjustKeyToLength(key, keyLength));
    const ivUtf8 = CryptoJS.enc.Utf8.parse(iv || '0000000000000000');  // Default IV if not provided

    // Select the decryption mode
    let selectedMode;
    switch (mode) {
        case 'CBC':
            selectedMode = CryptoJS.mode.CBC;
            break;
        case 'ECB':
            selectedMode = CryptoJS.mode.ECB;
            break;
        case 'CTR':
            selectedMode = CryptoJS.mode.CTR;
            break;
        case 'GCM':
            selectedMode = CryptoJS.mode.GCM;
            break;
        default:
            selectedMode = CryptoJS.mode.CBC;  // Default to CBC if no mode is selected
    }

    // Select the padding
    const selectedPadding = (padding === 'PKCS5Padding') ? CryptoJS.pad.Pkcs7 : CryptoJS.pad.NoPadding;

    // Decrypt the encrypted string using AES with the specified key size, IV, mode, and padding
    const decrypted = CryptoJS.AES.decrypt(encryptedStr, keyUtf8, {
        iv: ivUtf8,
        keySize: keyLength / 32,  // Adjusting key size based on the selected length
        mode: selectedMode,
        padding: selectedPadding,
    });
   
    // Get the decrypted output as a UTF-8 string
    if (outputFormat === 'Base64') {
        return decrypted.toString(CryptoJS.enc.Utf8);  // Convert from Base64 to plain text
    } else if (outputFormat === 'Hex') {
        return decrypted.toString(CryptoJS.enc.Utf8);  // Convert from Hex to plain text
    }
}
