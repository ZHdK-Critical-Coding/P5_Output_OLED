
let socket;  
//const connection = "ws://192.168.138.80:8200";  // Adresse des WebSocket-Servers
const connection = "ws://192.168.2.7:8200";  // Adresse des WebSocket-Servers
const crt = {
  width: 128,  // Breite der Zeichenfläche = Breite des OLED in Pixeln
  height: 32   // Höhe der Zeichenfläche = Höhe des OLED in Pixeln
}

// Funktion zum Versenden eines einzelnen Frames
function sendFrame() {
  // Canvas als PNG-Bild kodieren
  canvas.toBlob(
    (blob) => {
      blob.arrayBuffer().then((buffer) => {
        socket.send(buffer); // Rohdaten (Bytes) über den WebSocket senden
      });
    },
    "image/png"  // Dateiformat (verlustfrei, ideal für scharfe Pixel)
  );
}

// Setup-Funktion: wird einmal zu Beginn aufgerufen
function setup() {
  pixelDensity(1);                      // 1 Canvas-Pixel = 1 OLED-Pixel, auch auf Retina-Bildschirmen
  createCanvas(crt.width, crt.height);  // Canvas mit den angegebenen Massen erstellen
  frameRate(25);                        // Bildrate auf 25 FPS setzen
  noSmooth();                           // Keine Kantenglättung (klare Pixel)
  
  socket = new WebSocket(connection);   // Verbindung zum WebSocket-Server aufbauen
  socket.binaryType = "arraybuffer";    // Binärdatenformat festlegen
  
  // Event: Verbindung wurde erfolgreich hergestellt
  socket.onopen = () => {
    console.log("Mit WebSocket-Server verbunden");
    requestAnimationFrame(sendFrame); // Ersten Frame senden
  };
  
  // Event: Nachricht vom Server empfangen
  socket.onmessage = (event) => {
    if (event.data === "ok") {          // Server bestätigt Empfang
      requestAnimationFrame(sendFrame); // Nächsten Frame senden
    }
  };
}

// Draw-Funktion: wird bei jedem Frame aufgerufen
function draw() {
  background(0);                      // Hintergrund schwarz füllen
  noStroke()
  fill(255, 255, 255);                // Weisse Füllfarbe
  ellipse(frameCount % width, height / 2, height, height);  // bewegt sich
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(2,2,width - 4, height - 4) // Box
}