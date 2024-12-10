// Caesar Cipher Encryption
function caesarCipher(str, shift) {
    return str.split('').map(char => {
        if (/[a-zA-Z]/.test(char)) {
            const code = char.charCodeAt(0);
            const base = (char >= 'a' && char <= 'z') ? 97 : 65;
            return String.fromCharCode(((code - base + shift + 26) % 26) + base);
        }
        return char;
    }).join('');
}