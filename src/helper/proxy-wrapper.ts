export default function wrapProxy(url: string) {
  return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
}
