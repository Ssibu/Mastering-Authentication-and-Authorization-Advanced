const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;

export async function fetchUserFromGoogle(code) {
  console.log("Running fetchIdToken function...");
  const payload = `code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URL}&grant_type=authorization_code`;

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

  const userToken = data.id_token.split(".")[1];
  const userData = JSON.parse(atob(userToken));
  return userData;
}
