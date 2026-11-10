export function readResourceImages(
  files: FileList,
  onImage: (file: File, previewUrl: string) => void
): void {
  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) {
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
