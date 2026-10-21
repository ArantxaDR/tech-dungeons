/** Turns a character name into a safe file name: "Aria la Querida" -> "aria-la-querida". */
export const toFileName = (name: string): string => {
  const slug = name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'personaje';
};

/** Saves a blob to the user's device. */
export const downloadBlob = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();

  // The browser needs the URL alive a moment longer to start the download.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};
