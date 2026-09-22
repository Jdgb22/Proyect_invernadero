import { Request } from 'node-fetch'; // or global Request
const context = { request: new Request('http://localhost') };
try {
  context.request = new Request('https://localhost');
  console.log("Success:", context.request.url);
} catch (e) {
  console.log("Failed:", e.message);
}
