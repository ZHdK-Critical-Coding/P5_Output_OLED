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

Bibliotheken (in `libraries/`): p5.js 1.11.10, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

Lizenz: MIT

## Ausführen

1. Den Server auf dem Pi starten. Das OLED zeigt IP-Adresse und Port.
2. Diese Adresse oben in `sketch.js` bei `connection` eintragen, z. B.
   `ws://192.168.2.7:8200`.
3. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
4. Die Frames werden gesendet, sobald die Verbindung steht.

## Coding-Hilfe

- **`sketch.js` → `connection`, `crt`**: Server-Adresse und Grösse der
  Zeichenfläche (128 × 32). Der Server skaliert nicht: Das PNG muss genau
  so gross wie das OLED sein (128 × 32).
- **`setup()`**: setzt `pixelDensity(1)`, damit die Zeichenfläche auf jedem
  Bildschirm (auch Retina) genau 128 × 32 Pixel hat, erstellt die
  Zeichenfläche, schaltet mit `noSmooth()` die Kantenglättung aus, setzt
  25 fps und öffnet den WebSocket. `onopen` schickt den ersten Frame, jedes `ok` vom Server löst
  den nächsten aus.
- **`sendFrame()`**: kodiert die Zeichenfläche als PNG und schickt die
  Bytes. Der Server wandelt sie in 1 Bit um, sinnvoll sind also nur
  Schwarz und Weiss.
- **`draw()`**: schwarzer Hintergrund, ein weisser Kreis, der von links
  nach rechts wandert, und ein 1-px-Rahmen. Hier die eigene Zeichnung
  einsetzen.
