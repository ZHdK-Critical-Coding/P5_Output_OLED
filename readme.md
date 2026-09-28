# P5.js: OLED

[Deutsch](README_DE.md)

Streams a tiny p5 canvas as PNG frames over a WebSocket to a Raspberry Pi,
which shows them on a monochrome SSD1306 OLED display. The demo draws a
white circle moving across a black background inside a frame. A starting
point for small status displays or pixel animations driven from a sketch.

## Installation

Requirements: a browser on the same network as the Pi (see Server).

Libraries (in `libraries/`): p5.js 1.11.10, p5.sound 1.0.1 (included, not used).

License: MIT

## Server

Needs `oled-websockets` from
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi),
running on a Raspberry Pi with a 128 × 32 SSD1306 OLED on I2C (enable I2C
in `sudo raspi-config`), port 8200. Start it first with `bash run.sh` in
the folder on the Pi; the OLED shows IP and port. It takes PNG frames of
exactly 128 × 32 and answers `ok` after each one. Put its address in
`connection` at the top of `sketch.js`.

## How to Run

1. Start the server on the Pi (see Server). The OLED shows its IP address and port.
2. Enter that address in `connection` at the top of `sketch.js`, e.g.
   `ws://192.168.2.7:8200`.
3. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
4. The frames are sent as soon as the connection is open.

## Coding Help

- **`sketch.js` → `connection`, `crt`**: server address and canvas size
  (128 × 32). The server does not resize: the PNG must match the OLED
  (128 × 32) exactly.
- **`setup()`**: sets `pixelDensity(1)` so the canvas has exactly 128 × 32
  pixels on every screen (also Retina), creates the canvas, turns off
  smoothing with `noSmooth()`, sets 25 fps and opens the WebSocket.
  `onopen` sends the first frame, every `ok` from the server triggers the
  next one.
- **`sendFrame()`**: encodes the canvas as PNG and sends the bytes. The
  server converts them to 1 bit, so only black and white make sense.
- **`draw()`**: black background, a white circle moving left to right and
  a 1 px frame. Replace this with your own drawing.
