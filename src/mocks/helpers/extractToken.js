/**
 * Extracts the auth token for a mock request.
 */
export function extractToken(req) {
  const token = req.headers.authorization || req.headers.headers.authorization;

  if (token && token.startsWith("Token ")) {
    return token.replace(/^Token\s/, "");
  }

  return null;
}
