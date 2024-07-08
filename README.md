# Moment 5, _PROJEKT_
Den här README-filen har skapats för att förklara projektets syfte, redogöra för arbetsprocessen i olika steg samt beskriva installationen och användningen av webbtjänsten.

## Projektets syfte

- Kunna skapa dynamiska webbplatser uppdelade i olika delar för publik webbplats och webbtjänst.
- Kunna använda tidigare moment i kursen i en större sammanhängande webbplats.

    ### Webbplatsen ska utarbetas med inriktning mot en:

    - Vald målgrupp.
    - Vald grafisk profil.
    - En webbtjänst skapad med registrering och inloggning samt en frontend-applikation som använder denna webbtjänst för sitt data.
    - Vald funktionalitet innehållande interaktivitet/dynamik skapad med kunskap från kursens olika moment.

## Arbetsprocess

1. Utvecklingsmiljön förbereds med NPM och Nodemon som dependencie för en live-reload-server.
2. Nödvändiga dependencies för uppgiften installeras: Express, Cors, Router, Mongoose, Jsonwebtoken och Dotenv. 
3. I server.js-filen görs en centraliserad anslutning till min MongoDB-databas skapad via Atlas.
4. En katalog för routes skapas och häri läggs en adminRoutes.js-fil i vilken routes skapas för att registrera samt logga in en admin-personal, båda med metoden POST. 
5. Routes för registrering och inloggning testas i ThunderClient för att säkerställa att dessa fungerar.
6. En katalog för models skapas och häri läggs en admin.js-fil i vilken det skapas struktur för adminuppgifter med ett schema.
7. En import av adminmodellen görs till adminRoutes.js-filen och i sektionen som avser registering läggs denna till med _new Admin_.
8. En funktion som hashar lösenordet för samtliga registrerade användare läggs till i adminRoutes.js-filen. En JWT-token läggs också till som skapas vid lyckad inloggning.
9. I admin.js-filen skapas funktioner för inloggning, kontroll/jämförelse av hashade lösenord samt kontroll av registrerat användarnamn.  Adminroute importeras sen till server.js-filen.
10. Funktionalitet för registrering och inloggning testas i ThunderClient och funktionalitet kan ses i adminverktyget MongoDB Compass.
11. I katalogen för models läggs en icecream.js-fil till i vilken det skapas struktur för glass-sorter i menyn med ett schema.
12. I katalogen för routes läggs en icecreamRoutes.js-fil till i vilken glassmodellen importeras och routes för att skapa och lagra en ny glass görs med metoden POST. En route för att radera glassen från databasen/menyn görs också med metoden DELETE. Route för glassmenyn importeras sen till server.js-filen.
13. Funktionalitet för att skapa och radera glass testas i ThunderClient och funktionalitet kan ses här samt i adminverktyget MongoDB Compass.
14. Routes för att hämta hela glassmenyn och uppdatera enskilda glass-objekt läggs till och testas i ThunderClient varpå funktionaliteten bekräftas här och i MongoDb Compass.
15. I katalogen för models läggs en score.js-fil till i vilken det skapas struktur för besöksbetyg med ett schema.
16. I katalogen för routes läggs en scoreRoutes.js-fil till i vilken betygsmodellen importeras och routes för att hämta, skapa och radera enskilda betyg görs med metoderna GET, POST och DELETE. Route för besöksbetyg importeras sen till server.js-filen.
17. Funktionalitet för att hämta, skapa och radera besöksbetyg testas i ThunderClient och funktionalitet kan ses här samt i adminverktyget MongoDB Compass.

I koden implementeras **CRUD**; create (POST), read (GET), update (PUT) och delete (DELETE).

## Installation och anslutning till databas

Webbtjänsten använder en MongoDB-databas skapad via Atlas. Den kan enkelt hanteras med MongoDB Compass. För att installera projektet, klona ner källkodsfilerna från detta repo och kör kommandot _npm install_ för att installera nödvändiga npm-paket beskrivna som dependencies och devDependencies i package.json-filen.

## Användning: admin
Personal kan registrera ett konto där lösenordet krypteras/hashas med hjälp av Bcrypt innan lagring i databasen. Vid inloggning kommer
admin åt det skyddade admin-gränssnittet.

| **Metod** | **Endpoint**      | **Beskrivning**                                                                                                                      |
|-------|---------------|----------------------------------------------------------------------------------------------------------------------------------|
| POST  | /admin/register | Lägger till ett nytt admin-konto. Kräver att ett objekt med användarnamn och lösenord skickas med.                               |
| POST  | /admin/login    | Loggar in admin och returnerar en JWT-token som är giltig i 1h. Kräver att ett objekt med användarnamn och lösenord skickas med. |

### Output
Ett admin-objekt returneras/skickas som JSON med följande struktur:

```
{
   "username": "admin",
   "password": "password"
}
```

## Användning: meny
Menyn kan hanteras av inloggad admin-personal via det skyddade admin-gränssnittet. 

| **Metod** | **Endpoint**   | **Beskrivning**                                                                                                                           |
|-----------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| GET       | /icecreams     | Hämtar glassmenyn.                                                                                                                        |
| POST      | /icecreams     | Lägger till en ny glass i menyn. Kräver att ett objekt med namn, kategori, beskrivning och pris skickas med.                              |
| PUT       | /icecreams/:id | Uppdaterar en glass i menyn. Kräver att glassens unika ID anges samt att ett objekt med namn, kategori, beskrivning och pris skickas med. |
| DELETE    | /icecreams/:id | Raderar en glass från menyn. Kräver att glassens unika ID skickas med.    

### Output
Ett meny-objekt returneras/skickas som JSON med följande struktur:

```
{
   "name": "Chocolate Chock",
   "category": "Kaffe och choklad",
   "description": "Chokladgräddglass med bitar av mörk choklad och chokladsås.",
   "price": "29KR"
}
```

## Användning: besöksbetyg
Besöksbetygen kan hanteras av inloggad admin-personal via det skyddade admin-gränssnittet. 

| **Metod** | **Endpoint** | **Beskrivning**                                                                               |
|-----------|--------------|-----------------------------------------------------------------------------------------------|
| GET       | /scores      | Hämtar alla besöksbetyg.                                                                      |
| POST      | /scores      | Lägger till ett nytt besöksbetyg. Kräver att ett objekt med betyg (1-5) och namn skickas med. |
| DELETE    | /scores/:id  | Raderar ett besöksbetyg. Kräver att betygets unika ID skickas med.                            |                          |                                                                         |

### Output
Ett betyg-objekt returneras/skickas som JSON med följande struktur:

```
{
   "score": 5,
   "name": "Jenny Lind"
}
```

#### _Skapad av Jenny Lind, jeli2308_.