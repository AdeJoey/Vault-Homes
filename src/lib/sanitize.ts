/**
 * Input sanitization utilities.
 * All user-provided strings must be sanitized before use in emails or DB.
 */

/**
 * Strips HTML tags and script content from a string.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

/**
 * Sanitizes a single string field.
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return stripHtml(input).slice(0, 1000); // Hard cap at 1000 chars
}

/**
 * Sanitizes an object of form data.
 * Returns a new object with all string values sanitized.
 */
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized as T;
}

/**
 * Escapes HTML special characters for safe use in HTML email templates.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
