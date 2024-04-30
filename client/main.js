// Import the Discord Embedded App SDK module
import { DiscordSDK } from "@discord/embedded-app-sdk";

// Import images and styles
import rocketLogo from '/rocket.png';
import "./style.css";

// Declare a variable to store authentication status
let auth;

// Create a new instance of DiscordSDK with the provided client ID
const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

// Call setupDiscordSdk function and log a message once it's resolved
setupDiscordSdk().then(() => {
  console.log("Discord SDK is authenticated");
});

// Function to set up the Discord SDK
async function setupDiscordSdk() {
  // Wait for the Discord SDK to be ready
  await discordSdk.ready();
  console.log("Discord SDK is ready");

  // Authorize the Discord SDK with necessary permissions
  const { code } = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: [
      "identify",
      "guilds",
    ],
  });
  
  // Send a POST request to retrieve the access token from the server. In this case it's our Flask Python code.
  const response = await fetch("/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });

  // Extract the access token from the response
  const access_token = await response.text();

  // Authenticate the Discord SDK with the obtained access token
  auth = await discordSdk.commands.authenticate({
    access_token: access_token,
  });

  // Throw an error if authentication fails
  if (auth == null) {
    throw new Error("Authenticate command failed");
  }
}

// Update the content of an HTML element with id 'app'
document.querySelector('#app').innerHTML = `
  <div>
    <img src="${rocketLogo}" class="logo" alt="Discord" />
    <h1>Hello, World!</h1>
  </div>
`;
