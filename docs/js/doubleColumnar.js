
        // Double Columnar Cipher Decryption
        function doubleColumnarCipherDecrypt(str, key1, key2) {
            const rows = Math.ceil(str.length / key1.length);
            const cols = key1.length;
            let matrix = Array(rows).fill().map(() => Array(cols).fill(''));

            // Sort the second key
            const sortedKey2Indices = Array.from(key2).map((char, i) => ({ char, index: i }))
                .sort((a, b) => a.char.localeCompare(b.char))
                .map(item => item.index);

            let index = 0;
            for (const idx of sortedKey2Indices) {
                for (let i = 0; i < rows; i++) {
                    matrix[i][idx] = str[index++];
                }
            }

            // Read row by row to get the decrypted text
            let decrypted = '';
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    decrypted += matrix[i][j];
                }
            }

            return decrypted;
            
}