// Vigenère Cipher Encryption and Decryption
function vigenereCipher(str, key, decrypt = false) {
    let result = '';
    let keyIndex = 0;
    const shiftDirection = decrypt ? -1 : 1;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (/[a-zA-Z]/.test(char)) {
            const shift = key[keyIndex % key.length].toUpperCase().charCodeAt(0) - 65;
            const base = (char >= 'a' && char <= 'z') ? 97 : 65;
            result += String.fromCharCode(((char.charCodeAt(0) - base + shiftDirection * shift) % 26 + 26) % 26 + base);
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}