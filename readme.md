# WebSocket Canvas Streaming

Dieses Projekt zeigt, wie man mit **p5.js** Frames von einem Canvas über einen **WebSocket** an einen Server streamt.  
Dabei werden die Frames als JPEG komprimiert und als Binärdaten verschickt.  

## Features

- Verbindung zu einem WebSocket-Server herstellen
- Canvas mit p5.js rendern (64 × 16 Pixel, OLED Auflösung)
- Echtzeit-Streaming der Frames (25 FPS)
- Empfangsbestätigung `"ok"` vom Server löst den Versand des nächsten Frames aus

## Voraussetzungen

- Browser mit WebSocket-Unterstützung
- Ein laufender WebSocket-Server unter `ws://192.168.138.96:8100`

## Verwendung

- Starte den WebSocket-Server.
- Öffne die HTML-Seite (index.html) mit dem eingebundenen Skript.
- Das Canvas wird automatisch erstellt, und die Frames werden zum Server gesendet.

## Beispiel-Animation

Die Demo zeigt einen farbigen Kreis, der sich horizontal bewegt

## Lizenz

MIT License