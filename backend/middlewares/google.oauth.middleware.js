import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleOAuthMiddleware(req, res, next) {
  const token = req.body.idToken;
  if (!token) {
    return res.status(400).json({ message: "ID Token is required" });
  }
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    req.user = {
      email: payload.email,
      picture: payload.picture,
    };
    next();
  } catch (error) {
    console.log("Error verifying ID Token: ", error);
    return res.status(401).json({ message: "Invalid ID Token" });
  }
}
