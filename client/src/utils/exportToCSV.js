import Papa from "papaparse";

/**
 * Exports JSON data to CSV and triggers browser download.
 * @param {Array} data - Array of transaction objects.
 * @param {string} filename - Name of the CSV file.
 */
export function exportToCSV(data, filename = "expenses.csv") {
  if (!data || data.length === 0) {
    alert("No data to export!");
    return;
  }

  // Convert to CSV
  const csv = Papa.unparse(data);

  // Create Blob and download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export default exportToCSV;