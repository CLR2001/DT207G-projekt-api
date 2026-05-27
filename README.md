# ◈ Projekt API
Detta repository innehåller ett API för projektuppgiften i kursen DT207G.

API:et hanterar olika rätter och användare för att skapa ett admingränssnitt för restaurangen *Skafferiet*. CRUD (Create, Read, Update, Delete) funktionalitet är implementerat.

## ⬀ Länk till API
API:et finns tillgängligt på följande URL: [https://projekt.api.clr-server.com/](https://projekt.api.clr-server.com/)

## ✦ Databas och Scheman
Detta API använder NoSQL-databassystemet MongoDB. Nästan alla rutter i API:t är skyddade och kräver autentisering med hjälp av en JSON Web Token. För att inte lagra känslig data sparas lösenord efter hashing.

### 1. User:
| Attribut | Data |
| :--- | :--- |
| username | { type: String, required: true, unique: true, trim: true } |
| email | { type: String, required: true, unique: true, trim: true } |
| password | { type: String, required: true, select: false } |

### 2. Dish:
| Attribut | Data |
| :--- | :--- |
| name | { type: String, required: true, unique: true, trim: true } |
| description | { type: String, required: true, trim: true } |
| price | { type: Number, required: true } |
| week | { type: [Number], required: true } |
| category | { type: String, required: true, trim: true } |

### 3. Setting:
| Attribut | Data |
| :--- | :--- |
| key | { type: String, required: true, unique: true, default: "current_week" } |
| value | { type: Number, required: true } |

## ⚙ Användning
### 1. Authentication:
| Metod | Ändpunkt | Beskrivning | Data | Autentisering |
| :--- | :--- | :--- | :--- | :---: | 
| POST | `/authentication/login` | Validerar inloggning. Skapar en httpOnly-cookie med en JWT/token giltig i 1 timme. | <details><summary>Request</summary><br>`{ "username": "", "password": "" }`</details> | Nej |
| POST | `/authentication/logout` | Loggar ut användaren genom att radera den medskickade cookien/token. | - | Nej |
| GET | `/authentication/verify` | Verifierar aktiv token. Returnerar status 200 vid giltig och 400 vid ogiltig. | <details><summary>Response</summary><br>`{ "authenticated": true,"user": {"_id": ""} }`</details> | Ja |

### 2. Users:
| Metod | Ändpunkt | Beskrivning | Data | Autentisering |
| :--- | :--- | :--- | :--- | :---: | 
| POST | `/users/register` | Registrerar en ny användare i databasen och hashar lösenordet. | <details><summary>Request</summary><br>`{ "username": "", "email": "", "password": "" }`</details> | Ja |
| GET | `/users` | Hämtar en lista över samtliga registrerade användare (exkluderar lösenord). | <details><summary>Response</summary><br>`[{ "_id": "", "username": "", "email": "" }]`</details> | Ja |
| GET | `/users/:id` | Hämtar data om en specifik användare baserat på ID (exkluderar lösenord). | <details><summary>Response</summary><br>`{ "_id": "", "username": "", "email": "" }`</details> | Ja |
| DELETE | `/users/:id` | Raderar en specifik användare från databasen baserat på ID. | - | Ja |

### 3. Dishes:
| Metod | Ändpunkt | Beskrivning | Data | Autentisering |
| :--- | :--- | :--- | :--- | :---: | 
| POST | `/dishes/save` | Skapar och sparar en ny maträtt i databasen. | <details><summary>Request</summary><br>`{ "name": "", "description": "", "price": 0, "week": [], "category": "" }`</details> | Ja |
| GET | `/dishes/current-week` | Hämtar alla maträtter som är schemalagda för den aktuella veckan. | <details><summary>Response</summary><br>`[{ "_id": "", "name": "", "description": "", "price": 0, "week": [], "category": "" }]`</details> | Nej |
| GET | `/dishes` | Hämtar en lista över samtliga maträtter som finns sparade. | <details><summary>Response</summary><br>`[{ "_id": "", "name": "", "description": "", "price": 0, "week": [], "category": "" }]`</details> | Ja |
| PUT | `/dishes/:id` | Uppdaterar informationen för en befintlig maträtt baserat på ID. | <details><summary>Request</summary><br>`{ "name": "", "description": "", "price": 0, "week": [], "category": "" }`</details> | Ja |
| DELETE | `/dishes/:id` | Raderar en specifik maträtt från systemet baserat på ID. | - | Ja |

### 4. Settings:
| Metod | Ändpunkt | Beskrivning | Data | Autentisering |
| :--- | :--- | :--- | :--- | :---: | 
| GET | `/settings/current-week` | Hämtar värdet på den aktiva veckan | <details><summary>Response</summary><br>`{ "currentWeek": 0 }`</details> | Ja |
| PUT | `/settings/current-week` | Spara nytt värde för den aktiva veckan | <details><summary>Request</summary><br>`{ "currentWeek": 0 }`</details> | Ja |

## ⬢ Utvecklare
**Ludvig Rosenqvist** — *Student*
🔗 [GitHub](https://github.com/CLR2001)