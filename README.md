#### Welcome!

This is my URL Shortner API project.

**Dependencies:**
---

**Main**
* Node.js (Express for server)
* MongoDB (Using mongodb package to communicate)

**Other Dependencies:**

*Security:*
* Morgan
* Helmet 
* Cors 
* Express-rate-limit 

*Content*
* Crypto (A default node package, used to create offsets *random bytes*)
* is-url (To Check the validity of URLs passed)

**Usage**
---

Once you cloned the project or dowloaded you will need to dowload 
the dependencies and then run the server using the following commands:

```sh 
cd PROJECT_PATH
npm install
npm run start or npm run dev ( for development ) 
```

You will need also to update the `config.json` file with a valid mongodb cluster url.
*Used DB Name is "URLs" and Collection name is "Data"*
```json 
{
    "MONGO_DB_URL": "URL"
}
```

The server has 3 routes handled 

* `/*` for getting urls based on offsets, it redirects if offset is true otherwise returns the following message:
```json
{
	"error": "No URL Found"
}
```

* `/url/create` to do post requests to create shortned urls. *(we use json)*
```json
// Request Body
{
	"url": "VALID-URL"
}

// Response

// If valid 
{
	"message": "URL created successfully, keep the secret to delete in the future.",
	"URL": "http://SERVER_URL:1000/5f8e69d4",
	"secret": "9e8385610be8ad90"
}
// If Invalid
{
  "error": "Please provide a valid URL."
}
```

* `/url/delete` to do post requests to delete shortned urls already made. *(we use json)*
```json
// Request Body
{
	"secret": "SECRET_FROM_CREATE_REQUEST"
}

// Response

// If valid 
{
	"message": "URL deleted successfully."
}
// If Invalid
{
	"error": "No URL connected to that secret."
}
```

