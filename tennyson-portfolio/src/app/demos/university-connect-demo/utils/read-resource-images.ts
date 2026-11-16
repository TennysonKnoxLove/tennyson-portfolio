const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp'];

export function isImageFile(file: File): boolean {
  if (file.type.startsWith('image/')) {
    return true;
  }

  const name = file.name.toLowerCase();
  return IMAGE_EXTENSIONS.some(extension => name.endsWith(extension));
}

export function readResourceImages(
  files: FileList | File[],
  onImage: (file: File, previewUrl: string) => void,
  onReject?: (file: File) => void
): void {
  Array.from(files).forEach(file => {
    if (!isImageFile(file)) {
      onReject?.(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const previewUrl = reader.result;
      if (typeof previewUrl === 'string') {
        onImage(file, previewUrl);
      }
    };
    reader.readAsDataURL(file);
  });
}
