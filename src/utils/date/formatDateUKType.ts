/**
 * Format date string to dd/mm/yyyy
 * Input: string date  "2026-03-11T07:00:00+07:00"
 * Output: Formatted date string: "11/03/2026"
 * formatDate("2026-03-11T07:00:00+07:00") => "11/03/2026"
 */
export function formatDateUKType(date: string) {
  const parsedDate = new Date(date);
  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = parsedDate.getFullYear();
  return `${day}/${month}/${year}`;
}
