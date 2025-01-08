document.getElementById('cipher-select').addEventListener('change', function () {
    const cipherSelect = this.value;

    // Show/Hide elements based on selected cipher
    document.getElementById('shift-label').style.display = (cipherSelect === 'caesar') ? 'block' : 'none';
    document.getElementById('shift').style.display = (cipherSelect === 'caesar') ? 'block' : 'none';
    
    document.getElementById('key-label').style.display = (cipherSelect === 'caesar') ? 'none' : 'block';
    document.getElementById('key').style.display = (cipherSelect === 'caesar') ? 'none' : 'block';
    
    document.getElementById('key2-label').style.display = (cipherSelect === 'doublecolumnar') ? 'block' : 'none';
    document.getElementById('key2').style.display = (cipherSelect === 'doublecolumnar') ? 'block' : 'none';
    
    // Show AES key length options when AES cipher is selected
    document.getElementById('aes-key-length-label').style.display = (cipherSelect === 'aes') ? 'block' : 'none';
    document.getElementById('aes-key-length').style.display = (cipherSelect === 'aes') ? 'block' : 'none';

    // Show/Hide AES related elements based on the selected cipher
    const aesElements = document.getElementsByClassName('aes'); // Get all elements with class 'aes'
    for (let i = 0; i < aesElements.length; i++) {
        aesElements[i].style.display = (cipherSelect === 'aes') ? 'block' : 'none';
    }

    // Show/Hide AES labels based on the selected cipher
    const aesLabels = document.querySelectorAll('label[for^="aes"]'); // Select all labels whose 'for' attribute starts with "aes"
    for (let i = 0; i < aesLabels.length; i++) {
        aesLabels[i].style.display = (cipherSelect === 'aes') ? 'block' : 'none';
    }
});
