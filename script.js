const isbnForm = document.getElementById('isbn-form');
const isbnInput = document.getElementById('isbn');
const recalculateButton = document.getElementById('recalculate-button');
const result = document.getElementById('result');
const isbnMessage = document.getElementById('isbn-message');

isbnForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const isbn = isbnInput.value;
    const checkDigit = calculateCheckDigit(isbn);
    const isValid = validateISBN(isbn + checkDigit);

    result.classList.remove('hidden');

    if (isValid) {
        document.getElementById('valid-message').textContent = 'ISBN ini Valid!';
        isbnMessage.textContent = `ISBN 10 Digit : ${isbn + checkDigit}`;
    } else {
        document.getElementById('valid-message').textContent = 'ISBN ini Tidak Valid!';
        isbnMessage.textContent = `ISBN 10 Digit : ${isbn + checkDigit}`;
    }

    document.getElementById('check-digit-message').textContent = `Digit Terakhir / Karakter Uji : ${checkDigit}`;

    // Tampilkan tombol kalkulasi ulang
    recalculateButton.hidden = false;
});

recalculateButton.addEventListener('click', function () {
    // Hapus hasil kalkulasi sebelumnya
    result.classList.add('hidden');
    recalculateButton.hidden = true;

    // Tampilkan input ISBN dan fokus ke input
    isbnInput.value = '';
    isbnInput.focus();
});

function calculateCheckDigit(isbn) {
    let weightedSum = 0;

    for (let i = 0; i < 9; i++) {
        const digit = isbn[i] - '0'; // konversi karakter ke integer

        weightedSum += digit * (i + 1);
    }

    const remainder = weightedSum % 11;

    // Jika sisa pembagian adalah 10, gunakan 'X' sebagai check digit
    if (remainder === 10) {
        return 'X';
    } else {
        return remainder;
    }
}

function validateISBN(isbn) {
    const digits = isbn.split('');

    if (digits.length !== 10) {
        return false;
    }

    const weightedSum = digits.reduce((sum, digit, index) => {
        const value = digit === 'X' ? 10 : digit - '0';

        return sum + value * (10 - index);
    }, 0);

    return weightedSum % 11 === 0;
}