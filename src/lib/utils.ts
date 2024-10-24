export function constrainDimensions(width: number, height: number) {
  const MAX_DIMENSION = 1536;
  const MIN_DIMENSION = 128;
  
  let newWidth = width;
  let newHeight = height;
  
  // Scale down if too large
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const aspectRatio = width / height;
    if (width > height) {
      newWidth = MAX_DIMENSION;
      newHeight = Math.round(MAX_DIMENSION / aspectRatio);
    } else {
      newHeight = MAX_DIMENSION;
      newWidth = Math.round(MAX_DIMENSION * aspectRatio);
    }
  }
  
  // Scale up if too small
  if (width < MIN_DIMENSION || height < MIN_DIMENSION) {
    const aspectRatio = width / height;
    if (width < height) {
      newWidth = MIN_DIMENSION;
      newHeight = Math.round(MIN_DIMENSION / aspectRatio);
    } else {
      newHeight = MIN_DIMENSION;
      newWidth = Math.round(MIN_DIMENSION * aspectRatio);
    }
  }
  
  return { width: newWidth, height: newHeight };
}
