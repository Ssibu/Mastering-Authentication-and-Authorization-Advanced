import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

const clientId =
  process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUrl = process.env.GOOGLE_REDIRECT_URL;

export async function fetchUserFromGoogle(code) {
  console.log("Running fetchIdToken function...");
  const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  const data = await response.json();
  if (data.error) {
    console.log("Error occurred");
    console.log(data);
    return;
  }

  const loginTicket = await client.verifyIdToken({
    idToken: data.id_token,
    audience: clientId,
  });
  
  const userData = loginTicket.getPayload()
  console.log(userData);
  return userData;
}
