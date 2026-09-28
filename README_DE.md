# P5.js: OLED

[English](readme.md)

Streamt eine winzige p5-Zeichenfläche als PNG-Frames über einen WebSocket
an einen Raspberry Pi, der sie auf einem einfarbigen SSD1306-OLED-Display
zeigt. Die Demo zeichnet einen weissen Kreis, der sich in einem Rahmen über
den schwarzen Hintergrund bewegt. Ein Ausgangspunkt für kleine
Statusanzeigen oder Pixel-Animationen aus einem Sketch.

## Installation

Voraussetzungen: ein Raspberry Pi mit einem 128 × 32 SSD1306-OLED an I2C,
auf dem `oled-websockets` aus
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi)
läuft (Port 8200), und ein Browser im selben Netzwerk.

1. Den Server auf dem Pi starten. Das OLED zeigt IP-Adresse und Port.
2. Diese Adresse oben in `sketch.js` bei `connection` eintragen, z. B.
   `ws://192.168.2.7:8200`.
3. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
4. Die Frames werden gesendet, sobald die Verbindung steht.

Bibliotheken (in `libraries/`): p5.js 1.11.10, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

Lizenz: MIT

## Coding-Hilfe

- **`sketch.js` → `connection`, `crt`**: Server-Adresse und Grösse der
  Zeichenfläche (64 × 16). Der Server skaliert nicht: Das PNG muss so gross
  wie das OLED sein (128 × 32). Die Zeichenfläche wird in der Pixeldichte
  des Bildschirms exportiert, auf einem Retina-Bildschirm wird 64 × 16 also
  zu 128 × 32. Auf anderen Bildschirmen die Grösse auf 128 × 32 setzen.
- **`setup()`**: erstellt die Zeichenfläche, setzt 25 fps und öffnet den
  WebSocket. `onopen` schickt den ersten Frame, jedes `ok` vom Server löst
  den nächsten aus.
- **`sendFrame()`**: kodiert die Zeichenfläche als PNG und schickt die
  Bytes. Der Server wandelt sie in 1 Bit um, sinnvoll sind also nur
  Schwarz und Weiss.
- **`draw()`**: schwarzer Hintergrund, ein weisser Kreis, der von links
  nach rechts wandert, und ein 1-px-Rahmen. Hier die eigene Zeichnung
  einsetzen.
