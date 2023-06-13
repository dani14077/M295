# LB2 Prüfung

## Installation

Um die App nutzen zu können, müssen Sie zunächst die folgenden Pakete herunterladen.

`Express, Express-Session und Body-Parser`.

Um sie zu installieren, führen Sie im Terminal den Befehl `npm install --save express express-session body-parser` aus.

## Alle Endpunkte

1. GET `'/tasks'` = hollte alle Tasks
2. GET `'/tasks/:id'` = Hollt Task bei id
3. POST `'/tasks'` = erstellt ein neuen Task
4. PUT `'/tasks/:id'` = Eine Task aktualisieren
5. DELETE `'/tasks/:id'` = Einen Task löschen

## Endpunkte mit Authentifizierung

1. POST  `'/login'` = sich einloggen
2. GET `'/verify'` = zu verifizieren
3. DELETE `'/logout'` = sich ausloggen

**Auf keinen der oben genannten Endpunkte kann ohne Anmeldung zugegriffen werden**

**Author:** *Daniel Boulter*