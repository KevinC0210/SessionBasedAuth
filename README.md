# SessionBasedAuth

Prototyp zur sessionbasierten Authentifizierung für das Streuobstwiesen-Portal mit Express-Session.

## Vorbereitungen

Um die Anwendung zu starten müssen zunächst alle Dependencies installiert werden. Führe hierfür den Befehl `npm install` sowohl im Ordner _backend_ als auch im Ordner _frontend_ aus.

Beachte außerdem, dass du die Angular CLI installiert hast. Sollte dies nicht der Fall sein, installiere sie mit folgendem Befehl: <br />
`npm install -g @angular/cli`

## Anwendung starten

Um die Anwendung zu starten, öffne zwei Terminals. Zum Starten des Backends führe in einem Terminal folgende Befehle aus: <br />
`cd backend` <br />
`node app.js`

Anschließend führe in dem anderen Terminal folgende Befehle zum Start des Frontends an: <br />
`cd frontend` <br />
`ng serve`

Das Backend läuft nun unter [localhost:3030/api](http://localhost:3030/api). Das Frontend läuft unter [localhost:4200](http://localhost:4200).

## Testen des Backends

Um die Funktionen des Backends zu testen, öffne ein neues Terminal und führe folgende Befehle aus: <br />
`cd backend` <br />
`npm test`
