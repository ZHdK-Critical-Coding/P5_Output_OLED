# P5.js: OLED

[Deutsch](README_DE.md)

Streams a tiny p5 canvas as PNG frames over a WebSocket to a Raspberry Pi,
which shows them on a monochrome SSD1306 OLED display. The demo draws a
white circle moving across a black background inside a frame. A starting
point for small status displays or pixel animations driven from a sketch.

## Installation

Requirements: a Raspberry Pi with a 128 × 32 SSD1306 OLED on I2C running
`oled-websockets` from
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi)
(port 8200), and a browser on the same network.

1. Start the server on the Pi. The OLED shows its IP address and port.
2. Enter that address in `connection` at the top of `sketch.js`, e.g.
   `ws://192.168.2.7:8200`.
3. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
4. The frames are sent as soon as the connection is open.

Libraries (in `libraries/`): p5.js 1.11.10, p5.sound 1.0.1 (included, not used).

License: MIT

## Coding Help

- **`sketch.js` → `connection`, `crt`**: server address and canvas size
  (64 × 16). The server does not resize: the PNG must match the OLED
  (128 × 32). The canvas is exported at the screen's pixel density, so on
  a Retina screen 64 × 16 becomes 128 × 32. On other screens, set the size
  to 128 × 32.
- **`setup()`**: creates the canvas, sets 25 fps and opens the WebSocket.
  `onopen` sends the first frame, every `ok` from the server triggers the
  next one.
- **`sendFrame()`**: encodes the canvas as PNG and sends the bytes. The
  server converts them to 1 bit, so only black and white make sense.
- **`draw()`**: black background, a white circle moving left to right and
  a 1 px frame. Replace this with your own drawing.
