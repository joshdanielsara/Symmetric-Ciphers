document.getElementById('cipher-select').addEventListener('change', function () {
    const cipherSelect = this.value;

    document.getElementById('shift-label').style.display = (cipherSelect === 'caesar') ? 'block' : 'none';
    document.getElementById('shift').style.display = (cipherSelect === 'caesar') ? 'block' : 'none';
    document.getElementById('key-label').style.display = (cipherSelect === 'caesar') ? 'none' : 'block';
    document.getElementById('key').style.display = (cipherSelect === 'caesar') ? 'none' : 'block';
    document.getElementById('key2-label').style.display = (cipherSelect === 'doublecolumnar') ? 'block' : 'none';
    document.getElementById('key2').style.display = (cipherSelect === 'doublecolumnar') ? 'block' : 'none';
    document.getElementById('aes-key-length-label').style.display = (cipherSelect === 'aes') ? 'block' : 'none';
    document.getElementById('aes-key-length').style.display = (cipherSelect === 'aes') ? 'block' : 'none';
});
