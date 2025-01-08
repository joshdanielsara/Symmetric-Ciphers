function doubleColumnarCipherEncrypt(text, key1, key2) {
    // Replace spaces with underscores
    text = text.replace(/ /g, '_');
    addVisualizationStep('Input', text, 'Original text (with spaces replaced by underscores)');

    // Create the matrix for the first key (Key1: "love")
    let rows = Math.ceil(text.length / key1.length);
    let cols = key1.length;
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
    addVisualizationStep('Process', matrix.map((row, i) => `Row ${i + 1}: ${row.join(' ')}`), 'Matrix after first filling (Key 1)');

    // Sort the first key and get the sorted indices (for key "love": 2, 3, 4, 1)
    const sortedKey1Indices = Array.from(key1).map((char, i) => ({ char, index: i }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(item => item.index);
    addVisualizationStep('Process', sortedKey1Indices.map((idx, i) => `Column ${i + 1}: Key1 sorted index ${idx + 1}`), 'Sorted key1 indices');

    // Perform the first columnar transposition
    let transposed1 = '';
    for (const idx of sortedKey1Indices) {
        for (let i = 0; i < rows; i++) {
            transposed1 += matrix[i][idx] || '';
        }
    }
    addVisualizationStep('Process', transposed1, 'Result after first columnar transposition');

    // Prepare for the second transposition (using Key2: "hate")
    rows = Math.ceil(transposed1.length / key2.length);
    cols = key2.length;
    matrix = Array(rows).fill().map(() => Array(cols).fill(''));

    // Fill the new matrix row by row
    index = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (index < transposed1.length) {
                matrix[i][j] = transposed1[index++];
            } else {
                matrix[i][j] = '_'; // Fill remaining spaces with underscores
            }
        }
    }
    addVisualizationStep('Process', matrix.map((row, i) => `Row ${i + 1}: ${row.join(' ')}`), 'Matrix after second filling (Key 2)');

    // Sort the second key and get the sorted indices (for key "hate": 3, 1, 4, 2)
    const sortedKey2Indices = Array.from(key2).map((char, i) => ({ char, index: i }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(item => item.index);
    addVisualizationStep('Process', sortedKey2Indices.map((idx, i) => `Column ${i + 1}: Key2 sorted index ${idx + 1}`), 'Sorted key2 indices');

    // Perform the second columnar transposition
    let encrypted = '';
    for (const idx of sortedKey2Indices) {
        for (let i = 0; i < rows; i++) {
            encrypted += matrix[i][idx] || '';
        }
    }

    addVisualizationStep('Output', encrypted, 'Encrypted text (Final result)');

    return encrypted;
}
function doubleColumnarCipherDecrypt(text, key1, key2) {
    // Step 1: Reverse the second transposition
    const rows2 = Math.ceil(text.length / key2.length);
    const cols2 = key2.length;
    let matrix2 = Array(rows2).fill().map(() => Array(cols2).fill(''));

    // Sort the second key and reverse the order for decryption
    const sortedKey2Indices = Array.from(key2).map((char, i) => ({ char, index: i }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(item => item.index);

    //console.log("Sorted key2 indices:", sortedKey2Indices);

    // Fill the matrix column by column according to the sorted second key
    let index = 0;
    for (const idx of sortedKey2Indices) {
        for (let i = 0; i < rows2; i++) {
            if (index < text.length) {
                matrix2[i][idx] = text[index++];
            }
        }
    }

    //console.log("Matrix2 after second transposition:", matrix2);

    // Read the matrix row by row to reconstruct the intermediate text
    let intermediateText = '';
    for (let i = 0; i < rows2; i++) {
        for (let j = 0; j < cols2; j++) {
            intermediateText += matrix2[i][j];
        }
    }

    //console.log("Intermediate text after second transposition:", intermediateText);

    // Step 2: Reverse the first transposition
    const rows1 = Math.ceil(intermediateText.length / key1.length);
    const cols1 = key1.length;
    let matrix1 = Array(rows1).fill().map(() => Array(cols1).fill(''));

    // Sort the first key and reverse the order for decryption
    const sortedKey1Indices = Array.from(key1).map((char, i) => ({ char, index: i }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(item => item.index);

    //console.log("Sorted key1 indices:", sortedKey1Indices);

    // Fill the matrix column by column according to the sorted first key
    index = 0;
    for (const idx of sortedKey1Indices) {
        for (let i = 0; i < rows1; i++) {
            if (index < intermediateText.length) {
                matrix1[i][idx] = intermediateText[index++];
            }
        }
    }

    //console.log("Matrix1 after first transposition:", matrix1);

    // Read the matrix row by row to reconstruct the final decrypted text
    let decryptedText = '';
    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols1; j++) {
            decryptedText += matrix1[i][j];
        }
    }

    // Replace underscores with spaces
    decryptedText = decryptedText.replace(/_/g, ' ');

    //console.log("Decrypted text after replacing underscores with spaces:", decryptedText);

    return decryptedText;
}