function extractFirstImage(content: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const img = doc.querySelector("img");

  if (img) {
    return img.src;
  }

  return undefined;
}

export default extractFirstImage;
