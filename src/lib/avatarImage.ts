/** Every avatar is stored as a square JPEG of this size. */
export const AVATAR_SIZE = 256;

/** Files bigger than this are rejected before they are read into memory. */
export const MAX_AVATAR_FILE_BYTES = 10 * 1024 * 1024;

/** Raster formats only: an SVG taints the canvas and breaks the encoding. */
export const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const AVATAR_JPEG_QUALITY = 0.82;

/** Safety net for the encoding: the data URL has to stay small for the storage. */
export const MAX_AVATAR_DATA_URL_LENGTH = 120_000;

export const AVATAR_ACCEPT_ATTRIBUTE = ACCEPTED_AVATAR_TYPES.join(',');

const toMegabytes = (bytes: number): string =>
  `${(bytes / 1024 / 1024).toFixed(1).replace('.0', '')} MB`;

/**
 * Checks the file before anything is read: a wrong type would fail later in a
 * confusing way, and a huge file would be loaded whole into memory.
 */
export const getAvatarFileError = (file: File): string | undefined => {
  if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
    return 'Ese archivo no es una imagen válida. Usa un JPG, PNG, WEBP o GIF.';
  }

  if (file.size > MAX_AVATAR_FILE_BYTES) {
    return `La imagen pesa ${toMegabytes(file.size)} y el máximo es ${toMegabytes(
      MAX_AVATAR_FILE_BYTES,
    )}. Elige una más pequeña.`;
  }

  return undefined;
};

/** The centred square of an image, as the crop rectangle to read from. */
export const getSquareCrop = (
  width: number,
  height: number,
): { sx: number; sy: number; size: number } => {
  const size = Math.min(width, height);
  return { sx: (width - size) / 2, sy: (height - size) / 2, size };
};

/** Draws the centred square of an image into a canvas of the given size. */
export const cropToSquare = (
  image: HTMLImageElement,
  size: number = AVATAR_SIZE,
): HTMLCanvasElement => {
  const { sx, sy, size: side } = getSquareCrop(image.width, image.height);
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  if (!context) throw new Error('No se pudo crear el lienzo de la imagen.');

  context.drawImage(image, sx, sy, side, side, 0, 0, size, size);
  return canvas;
};

/**
 * Encodes the avatar as a square JPEG. If the result is still too big for the
 * storage, it is encoded again, smaller, until it fits.
 */
export const encodeAvatar = (image: HTMLImageElement): string => {
  let size = AVATAR_SIZE;
  let dataUrl = cropToSquare(image, size).toDataURL('image/jpeg', AVATAR_JPEG_QUALITY);

  while (dataUrl.length > MAX_AVATAR_DATA_URL_LENGTH && size > 64) {
    size = Math.floor(size / 2);
    dataUrl = cropToSquare(image, size).toDataURL('image/jpeg', AVATAR_JPEG_QUALITY);
  }

  return dataUrl;
};
