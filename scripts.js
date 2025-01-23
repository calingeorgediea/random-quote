let cachedQuotes = [];
let currentQuoteIndex = -1;

// Extract the API key from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const apiKey = urlParams.get('key');

if (!apiKey) {
  document.getElementById('quote').innerText = 'API key is missing in the URL.';
  document.getElementById('author').innerText = '';
  console.error('API key is required in the query string as ?key=YOUR_API_KEY');
} else {
  // Show the next cached quote when the user presses "Next Quote"
  document.getElementById('nextQuoteButton').addEventListener('click', () => {
    showNextQuote();
  });

  // Open config modal on button click
  document.getElementById('toggleConfigButton').addEventListener('click', () => {
    openConfigModal();
  });

  // Close the config modal
  document.getElementById('closeConfigButton').addEventListener('click', () => {
    closeConfigModal();
  });
  
  // Confirm and fetch new data from JSONBin when the user selects it in settings
  document.getElementById('fetchNewDataButton').addEventListener('click', () => {
    showFetchConfirmation();
  });
}

// Fetch quotes from JSONBin
function fetchQuotes(apiKey) {
  fetch(`https://api.jsonbin.io/v3/b/67928d62ad19ca34f8f3558c?meta=false`, {
    headers: {
      'X-Master-Key': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const encryptedData = encryptData(JSON.stringify(data)); // Encrypt the quotes
      localStorage.setItem('quotes', encryptedData); // Save encrypted quotes in localStorage
      cachedQuotes = data; // Cache the decrypted quotes in memory
      currentQuoteIndex = -1; // Reset index to show new random quote next time
      document.getElementById('nextQuoteButton').style.display = 'inline-block';
      showNextQuote(); // Show the first random quote immediately
    })
    .catch(error => {
      console.error('Error fetching quotes:', error);
      document.getElementById('quote').innerText = 'Error loading quote.';
      document.getElementById('author').innerText = '';
    });
}

// Show the next cached quote
function showNextQuote() {
  if (cachedQuotes.length > 0) {
    // Generate the next index in the cached quotes list
    currentQuoteIndex = (currentQuoteIndex + 1) % cachedQuotes.length;
    const nextQuote = cachedQuotes[currentQuoteIndex];

    document.getElementById('quote').innerText = nextQuote.quote;
    document.getElementById('author').innerText = `- ${nextQuote.author}`;
  }
}

// Encrypt data
function encryptData(data) {
  const encryptedData = CryptoJS.AES.encrypt(data, apiKey).toString(); // Encrypt the data
  return encryptedData;
}

// Decrypt data
function decryptData(encryptedData) {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, apiKey); // Decrypt the data
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8); // Convert bytes to string
  return JSON.parse(decryptedData);
}

// On page load, try to retrieve and decrypt the quotes from localStorage
window.onload = function() {
  const encryptedQuotes = localStorage.getItem('quotes');
  const fetchOnRefresh = JSON.parse(localStorage.getItem('fetchOnRefresh')) ?? true;
  
  if (encryptedQuotes) {
    cachedQuotes = decryptData(encryptedQuotes); // Decrypt and load quotes
    
    if (fetchOnRefresh) {
      // If fetchOnRefresh is enabled, pick a random quote from the cache
      showRandomQuoteFromCache();
    } else {
      // If fetchOnRefresh is disabled, show the last cached quote
      showLastCachedQuote();
    }
  } else {
    // No quotes in localStorage; fetch new quotes
    fetchQuotes(apiKey);
  }
};

// Show a random quote from the cache
function showRandomQuoteFromCache() {
  const randomIndex = Math.floor(Math.random() * cachedQuotes.length);
  const randomQuote = cachedQuotes[randomIndex];

  document.getElementById('quote').innerText = randomQuote.quote;
  document.getElementById('author').innerText = `- ${randomQuote.author}`;
}

// Show the last cached quote
function showLastCachedQuote() {
  if (cachedQuotes.length > 0) {
    const lastQuote = cachedQuotes[currentQuoteIndex] || cachedQuotes[0];

    document.getElementById('quote').innerText = lastQuote.quote;
    document.getElementById('author').innerText = `- ${lastQuote.author}`;
  }
}

// Open configuration modal
function openConfigModal() {
  document.getElementById('configModal').style.display = 'flex';
  const fetchOnRefresh = JSON.parse(localStorage.getItem('fetchOnRefresh')) ?? true;
  document.getElementById('fetchOnRefresh').checked = fetchOnRefresh;
}

// Close configuration modal
function closeConfigModal() {
  document.getElementById('configModal').style.display = 'none';

  // Save configuration to localStorage
  const fetchOnRefresh = document.getElementById('fetchOnRefresh').checked;
  localStorage.setItem('fetchOnRefresh', JSON.stringify(fetchOnRefresh));
}

// Show confirmation before fetching new quotes
function showFetchConfirmation() {
  const confirmFetch = window.confirm("Are you sure you want to fetch new quotes? This will overwrite the current quotes.");
  
  if (confirmFetch) {
    fetchQuotes(apiKey); // Proceed with fetching new quotes
  }
}
