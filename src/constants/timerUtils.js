export function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Hitung persentase progress
export function getProgress(total, left) {
  return ((total - left) / total) * 100;
}
