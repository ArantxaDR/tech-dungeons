import { describe, expect, it } from 'vitest';

import {
  ACCEPTED_AVATAR_TYPES,
  AVATAR_ACCEPT_ATTRIBUTE,
  AVATAR_SIZE,
  MAX_AVATAR_FILE_BYTES,
  getAvatarFileError,
  getSquareCrop,
} from '@/lib/avatarImage';

const makeFile = (type: string, size = 1024): File => {
  const file = new File(['x'], 'avatar', { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('avatar file validation', () => {
  it('accepts the raster formats', () => {
    ACCEPTED_AVATAR_TYPES.forEach((type) => {
      expect(getAvatarFileError(makeFile(type))).toBeUndefined();
    });
  });

  it('rejects a file that is not an image', () => {
    expect(getAvatarFileError(makeFile('application/pdf'))).toBe(
      'Ese archivo no es una imagen válida. Usa un JPG, PNG, WEBP o GIF.',
    );
  });

  it('rejects an SVG, which would taint the canvas', () => {
    expect(getAvatarFileError(makeFile('image/svg+xml'))).toBeDefined();
  });

  it('rejects a file over the size limit', () => {
    const error = getAvatarFileError(makeFile('image/jpeg', MAX_AVATAR_FILE_BYTES + 1));

    expect(error).toContain('10 MB');
    expect(error).toContain('Elige una más pequeña');
  });

  it('accepts a file exactly at the size limit', () => {
    expect(getAvatarFileError(makeFile('image/jpeg', MAX_AVATAR_FILE_BYTES))).toBeUndefined();
  });

  it('offers the accepted formats in the file picker', () => {
    expect(AVATAR_ACCEPT_ATTRIBUTE).toBe(ACCEPTED_AVATAR_TYPES.join(','));
    expect(AVATAR_ACCEPT_ATTRIBUTE).not.toContain('svg');
  });
});

describe('square crop', () => {
  it('keeps the whole image when it is already square', () => {
    expect(getSquareCrop(300, 300)).toEqual({ sx: 0, sy: 0, size: 300 });
  });

  it('crops a landscape image from the centre', () => {
    expect(getSquareCrop(800, 400)).toEqual({ sx: 200, sy: 0, size: 400 });
  });

  it('crops a portrait image from the centre', () => {
    expect(getSquareCrop(400, 800)).toEqual({ sx: 0, sy: 200, size: 400 });
  });

  it('always produces a square of the avatar size', () => {
    expect(AVATAR_SIZE).toBe(256);
  });
});
