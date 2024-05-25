const isbn10Form = document.getElementById('isbn10-form');
const isbn10Input = document.getElementById('isbn10');
const result10 = document.getElementById('result10');
const isbnMessage10 = document.getElementById('isbn-message10');
const recalculateButton10 = document.getElementById('recalculate-button10');

const isbn13Form = document.getElementById('isbn13-form');
const isbn13Input = document.getElementById('isbn13');
const result13 = document.getElementById('result13');
const isbnMessage13 = document.getElementById('isbn-message13');
const recalculateButton13 = document.getElementById('recalculate-button13');

const body = document.querySelector('body');

isbn10Form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isbn = isbn10Input.value;
    const checkDigit = calculateCheckDigit(isbn);
    const isValid = validateISBN(isbn + checkDigit);

    result10.classList.remove('hidden');

    if (isValid) {
        document.getElementById('valid-message10').textContent = 'ISBN ini Valid!';
        isbnMessage10.textContent = `ISBN 10 Digit : ${isbn + checkDigit}`;
    } else {
        document.getElementById('valid-message10').textContent = 'ISBN ini Tidak Valid!';
        isbnMessage10.textContent = `ISBN 10 Digit : ${isbn + checkDigit}`;
    }

    document.getElementById('check-digit-message10').textContent = `Digit Terakhir / Karakter Uji : ${checkDigit}`;

    // Sembunyikan heading dan background image
    body.style.backgroundImage = 'none';

    // Tampilkan tombol kalkulasi ulang
    recalculateButton10.hidden = false;
});

recalculateButton10.addEventListener('click', function () {
    // Hapus hasil kalkulasi sebelumnya
    result10.classList.add('hidden');
    recalculateButton10.hidden = true;

    // Tampilkan input ISBN dan fokus ke input
    isbn10Input.value = '';
    isbn10Input.focus();

    body.style.backgroundImage = 'url("logo/teknik unsur1.png")';
});

isbn13Form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isbn = isbn13Input.value;
    const checkDigit = calculateCheckDigit13(isbn);
    const isValid = validateISBN13(isbn + checkDigit);

    result13.classList.remove('hidden');

    if (isValid) {
        document.getElementById('valid-message13').textContent = 'ISBN ini Valid!';
        isbnMessage13.textContent = `ISBN 13 Digit : ${isbn + checkDigit}`;
    } else {
        document.getElementById('valid-message13').textContent = 'ISBN ini Tidak Valid!';
        isbnMessage13.textContent = `ISBN 13 Digit : ${isbn + checkDigit}`;
    }

    document.getElementById('check-digit-message13').textContent = `Digit Terakhir / Karakter Uji : ${checkDigit}`;

    body.style.backgroundImage = 'none';

    // Tampilkan tombol kalkulasi ulang
    recalculateButton13.hidden = false;
});

recalculateButton13.addEventListener('click', function () {
    // Hapus hasil kalkulasi sebelumnya
    result13.classList.add('hidden');
    recalculateButton13.hidden = true;

    // Tampilkan input ISBN dan fokus ke input
    isbn13Input.value = '';
    isbn13Input.focus();

    body.style.backgroundImage = 'url("logo/teknik unsur1.png")';
});

function calculateCheckDigit13(isbn) {
    let weightedSum = 0;

    for (let i = 0; i < 12; i++) {
        const digit = isbn[i] - '0'; // konversi karakter ke integer

        weightedSum += (i % 2 === 0) ? digit : digit * 3;
    }

    const remainder = weightedSum % 10;
    const checkDigit = (10 - remainder) % 10;

    return checkDigit;
}

function validateISBN13(isbn) {
    const digits = isbn.split('');

    if (digits.length !== 13) {
        return false;
    }

    const weightedSum = digits.reduce((sum, digit, index) => {
        const value = digit - '0';

        return sum + value * (index % 2 === 0 ? 1 : 3);
    }, 0);

    return weightedSum % 10 === 0;
}

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