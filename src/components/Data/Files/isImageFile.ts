export const isImageFile = (file: {
  file_mime_type?: string | null
}) =>
  file.file_mime_type &&
  (file.file_mime_type.toLowerCase().includes('jpeg') ||
    file.file_mime_type.toLowerCase().includes('png'))
