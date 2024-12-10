 // Single Columnar Cipher Encryption
 function columnarCipherEncrypt(str, key) {
    // Replace spaces with underscores
    str = str.replace(/ /g, '_');

    const keyLength = key.length;
    const rows = Math.ceil(str.length / keyLength);

    // Create an empty array for each column
    const columns = Array.from({ length: keyLength }, () => []);

    // Fill columns with characters from the plaintext
    for (let i = 0; i < str.length; i++) {
        const columnIndex = i % keyLength;
        columns[columnIndex].push(str[i]);
    }

    // Reorder the columns based on the keyword order
    const sortedKey = Array.from(key)
        .map((char, i) => ({ char, index: i }))
        .sort((a, b) => a.char.localeCompare(b.char));

    // Construct the ciphertext by reading columns in sorted order
    let ciphertext = '';
    for (let { index } of sortedKey) {
        ciphertext += columns[index].join('');
    }

    return ciphertext;
}

        // Single Columnar Cipher Decryption
        function columnarCipherDecrypt(str, key) {
            const keyLength = key.length;
            const rows = Math.ceil(str.length / keyLength);

            // Create an array to store columns
            const columns = Array.from({ length: keyLength }, () => []);

            // Calculate how many characters each column will have
            const columnLengths = Array(keyLength).fill(Math.floor(str.length / keyLength));
            for (let i = 0; i < str.length % keyLength; i++) {
                columnLengths[i]++;
            }

            // Reorder the columns based on the keyword order
            const sortedKey = Array.from(key)
                .map((char, i) => ({ char, index: i }))
                .sort((a, b) => a.char.localeCompare(b.char));

            // Distribute the ciphertext into columns based on the sorted keyword
            let index = 0;
            for (let { index: columnIndex } of sortedKey) {
                const columnLength = columnLengths[columnIndex];
                columns[columnIndex] = str.slice(index, index + columnLength).split('');
                index += columnLength;
            }

            // Read the matrix row by row
            let decryptedText = '';
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < keyLength; j++) {
                    if (columns[j][i]) {
                        decryptedText += columns[j][i];
                    }
                }
            }

            return decryptedText;
        }