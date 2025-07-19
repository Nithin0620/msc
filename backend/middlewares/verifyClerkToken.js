const { clerkClient } = require('@clerk/clerk-sdk-node');

const verifyClerkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];

    // Use the modern networkless verification approach
    const verifyResult = await clerkClient.verifyToken(token, {
      // Optional: specify additional verification options
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    if (!verifyResult || !verifyResult.sub) {
      return res.status(401).json({ message: "Invalid token or user" });
    }

    // Get user details if needed
    const user = await clerkClient.users.getUser(verifyResult.sub);

    req.auth = {
      userId: verifyResult.sub,
      sessionId: verifyResult.sid, // session ID from token
      user: user, // full user object if needed
    };

    next();
  } catch (err) {
    console.error("Clerk token verification error:", err);
    return res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

module.exports = verifyClerkToken;