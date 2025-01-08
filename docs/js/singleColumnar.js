function singleColumnarCipherEncrypt(text, key) {
    // Replace spaces with underscores
    text = text.replace(/ /g, '_');
    addVisualizationStep('Input', text, 'Original text (with spaces replaced by underscores)');

    // Create the matrix based on the key length
    let rows = Math.ceil(text.length / key.length);
    let cols = key.length;
    let matrix = Array(rows).fill().map(() => Array(cols).fill(''));

    // Fill the matrix row by row, adding underscores where necessary
    let index = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (index < text.length) {
                matrix[i][j] = text[index++];
            } else {
                matrix[i][j] = '_'; // Fill remaining spaces with underscores
            }
        }
    }
    addVisualizationStep('Process', matrix.map((row, i) => `Row ${i + 1}: ${row.join(' ')}`), 'Matrix after filling');

    // Sort the key and get the sorted indices
    const sortedKeyIndices = Array.from(key).map((char, i) => ({ char, index: i }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(item => item.index);
    addVisualizationStep('Process', sortedKeyIndices.map((idx, i) => `Column ${i + 1}: Key sorted index ${idx + 1}`), 'Sorted key indices');

    // Perform the columnar transposition
    let encrypted = '';
    for (const idx of sortedKeyIndices) {
        for (let i = 0; i < rows; i++) {
            encrypted += matrix[i][idx] || '';
        }
    }

    addVisualizationStep('Output', encrypted, 'Encrypted text (Final result)');

    return encrypted;
}


function singleColumnarCipherDecrypt(text, key) {
    // Step 1: Determine the number of rows and columns
    const cols = key.length;
    const rows = Math.ceil(text.length / cols);
    let matrix = Array(rows).fill().map(() => Array(cols).fill(''));

    // Step 2: Sort the key and reverse the order for decryption
    const sortedKeyIndices = Array.from(key).map((char, i) => ({ char, index: i }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(item => item.index);

    // Step 3: Fill the matrix column by column according to the sorted key
    let index = 0;
    for (const idx of sortedKeyIndices) {
        for (let i = 0; i < rows; i++) {
            if (index < text.length) {
                matrix[i][idx] = text[index++];
            }
        }
    }

    // Step 4: Read the matrix row by row to reconstruct the decrypted text
    let decryptedText = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            decryptedText += matrix[i][j];
        }
    }

    // Replace underscores with spaces
    decryptedText = decryptedText.replace(/_/g, ' ');

    return decryptedText;
}



