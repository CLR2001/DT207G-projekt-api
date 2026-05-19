# ◈ Laboration X API
Detta repository innehåller ett API för laboration X i kursen X.

API:et hanterar olika exempler för att skapa X. CRUD (Create, Read, Update, Delete) funktionalitet är implementerat.

## ⬀ Länk till API
API:et finns tillgängligt på följande URL: [https://api.clr-server.com/example](https://api.clr-server.com/example)

## ✦ Databas och Scheman
Detta API använder NoSQL-databassystemet MongoDB.

### 1. Example:
| Attribut | Data |
| :--- | :--- |


## ⚙ Användning
| Metod | Ändpunkt | Beskrivning |
| :--- | :--- | :--- |
| GET | `/example` | Hämtar alla exempel. |
| GET | `/example/:ID` | Hämtar ett specifikt exempel med angivet ID. |
| POST | `/example` | Lagrar ett nytt exempel i databasen. Ett objekt med exempel-data måste skicaks med i anropet. |
| PUT | `/example/:ID` | Uppdaterar ett existerande exempel i databasen. Ett objekt med exempel-data måste skicaks med i anropet. |
| DELETE | `/example/:ID` | Raderar ett exempel med angivet ID. |

Följande exempel-objekt returneras vid lyckat get-anrop i JSON-format.
```bash
{
    
  }
```


## ⬢ Utvecklare
**Ludvig Rosenqvist** — *Student*
🔗 [GitHub](https://github.com/CLR2001)