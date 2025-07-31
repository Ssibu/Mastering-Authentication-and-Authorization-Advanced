import { OAuth2Client } from "google-auth-library";

const clientId =
  process.env.GOOGLE_CLIENT_ID || "1048706262052-0q1f3g4j8k5h6j7k8l9m0n1o2p3q4r5s.apps.googleusercontent.com";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "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";
const redirectUrl = process.env.GOOGLE_REDIRECT_URL || "http://localhost:4000/auth/google/callback";

const client = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: redirectUrl,
});

export function generateGoogleAuthUrl() {
  return client.generateAuthUrl({
    scope: ["email", "profile", "openid",],
    // prompt: "consent",
    // access_type: "offline",
    
  });
}

export async function fetchUserFromGoogle(code) {
  console.log("Running fetchIdToken function...");

  const { tokens } = await client.getToken(code);
  console.log(tokens);

  const loginTicket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientId,
  });

  const userData = loginTicket.getPayload();
  return userData;
}
