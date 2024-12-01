export default async function delay(duration: number) {
  return new Promise((resolve, _reject) => setTimeout(() => resolve(null), duration))
}
