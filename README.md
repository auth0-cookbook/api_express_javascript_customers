# Auth0 Eats Customers API: Express Sample

## Quick Setup

### 1. Configure Auth0

You need an Auth0 account. If you don't have one yet, <a href="https://auth0.com/signup">sign up for a free Auth0 account</a>.

Open the [APIs section of the Auth0 Dashboard](https://manage.auth0.com/#/apis), click the "Create API" button.

Fill out the form that comes up:

- **Name:**

```
Auth0 Eats Customers API Sample
```

- **Identifier:**

```
https://customers.example.com
```

Leave the signing algorithm as `RS256`. It's the best option from a security standpoint.

Once you've added those values, click the "Create" button.

Once you create an Auth0 API, a new page loads up, presenting you with your Auth0 API information.

Keep page open to complete the next step.

### 2. Create a Quick Live Server

Open this Glitch project:

[https://glitch.com/edit/#!/auth0-cookbook-api_express_javascript_customers]()

Click on the "Remix to Edit" button in the top-right corner.

### 3. Connect the Server with Auth0

Click on the `.env` file from your Glitch project. You'll need to add the values for `AUTH0_AUDIENCE` and `AUTH0_DOMAIN` from your Auth0 API configuration.

Head back to your Auth0 API page, and **follow these steps to get the Auth0 Audience**:

![Get the Auth0 Audience to configure an API](https://cdn.auth0.com/blog/complete-guide-to-user-authentication/get-the-auth0-audience.png)

1. Click on the **"Settings"** tab.

2. Locate the **"Identifier"** field and copy its value.

3. Paste the "Identifier" value as the value of `AUTH0_AUDIENCE` in `.env`.

Now, **follow these steps to get the Auth0 Domain value**:

![Get the Auth0 Domain to configure an API](https://cdn.auth0.com/blog/complete-guide-to-user-authentication/get-the-auth0-domain.png)

1. Click on the **"Test"** tab.
2. Locate the section called **"Asking Auth0 for tokens from my application"**.
3. Click on the **cURL** tab to show a mock `POST` request.
4. Copy your Auth0 domain, which is _part_ of the `--url` parameter value: `tenant-name.region.auth0.com`.
5. Paste the Auth0 domain value as the value of `AUTH0_DOMAIN` in `.env`.

**Tips to get the Auth0 Domain**

- The Auth0 Domain is the substring between the protocol, `https://` and the path `/oauth/token`.

- The Auth0 Domain follows this pattern: `tenant-name.region.auth0.com`.
 
- The `region` subdomain (`au`, `us`, or `eu`) is optional. Some Auth0 Domains don't have it.

- **Click on the image above, please, if you have any doubt on how to get the Auth0 Domain value**.

With the `.env` configuration values set, you need to reload the project so that Express can see these new environment variables.

**To reload the project, refresh the Glitch project page.**

### 4. Test the Live Server

In your Glitch project, click on the "Share" button, which you can find under the project name in the top-left corner.

Click on the "Live App" tab and copy the first URL right under the buttons. This is the root URL of your live server that you can use to make requests:

```bash
https://<random-long-string>.glitch.me
```

Open the terminal and test if the server is working by making the following request to get all the wishlist items:

```bash
curl https://<random-long-string>.glitch.me/api/wishlist/items
```

You should the following response from the server (the `id`'s will vary):

```json
[
    {
        "id": "K@MyH58Ej",
        "name": "Apple iPhone 12",
        "description": "128GB, White",
        "url": "https://www.amazon.com/dp/B08L5Q1L2Q/"
    },
    {
        "id": "oss94d7YUZ",
        "name": "PlayStation 5 Console",
        "description": "Ultra-high speed SSD and 3D Audio",
        "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
    },
    {
        "id": "7ovKgpue7a",
        "name": "Xbox Series S Console",
        "description": "Smallest, sleekest Xbox console ever",
        "url": "https://www.amazon.com/Xbox-S/dp/B08G9J44ZN"
    }
]
```

### Test a protected endpoint

You need an access token to call any of the protected API endpoints.

Try to make the following request:

```bash
curl https://<random-long-string>.glitch.me/api/wishlist/reset
```

You'll get the following response error:

```bash
No authorization token was found
```

To get an access token, head back to your API configuration page in the Auth0 Dashboard.

Click on the "Test" tab and locate the "Sending the token to the API".

Click on the "cURL" tab.

You should see something like this:

```bash
curl --request GET \
  --url http://path_to_your_api/ \
  --header 'authorization: Bearer really-long-string'
```

Copy and paste that value in a text editor.

In the value of the `--header` parameter, the value of `authorization` is your access token.

Replace the value of the `--url` parameter with your `GET api/wishlist/reset` endpoint URL:

```bash
curl --request GET \
  --url https://<random-long-string>.glitch.me/api/wishlist/reset \
  --header 'authorization: Bearer really-long-string'
```

Copy and paste the updated cURL command into a terminal window and execute it. You should now get a valid response.

Try calling any of the API endpoints outlined in the next section.


## API Endpoints

### 🔓 List Items

Lists all items from the wishlist.

```bash
GET /api/wishlist/items
```

#### Response

```bash
Status: 200 OK
```

```json
[
    {
        "id": "ep9EVXNoCz",
        "name": "PlayStation 5 Console",
        "description": "Ultra-high speed SSD and 3D Audio",
        "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
    }
]
```

### 🔓 Get an item

Provides information an item from the wishlist.

```bash
GET /api/wishlist/items/:id
```

#### Response

##### If item is not found

```bash
Status: 404 Not Found
```

##### If item is found

```bash
Status: 200 OK
```

```json
{
    "id": "oss94d7YUZ",
    "name": "PlayStation 5 Console",
    "description": "Ultra-high speed SSD and 3D Audio",
    "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
}
```

> 🔐 Protected Endpoints: These endpoints require the request to include an access token issued by Auth0 in the authorization header.

### 🔐 Create an item for the authenticated user

Creates an item in the wishlist for the authenticated user.

```bash
POST /api/wishlist/items
```

#### Input

| Name          | Type       | Description                                       |
|---------------|:-----------|:--------------------------------------------------|
| `name`        | `string`   | **Required**. The name of the item.               |
| `description` | `string`   | **Required**. The description of the item.        |
| `url`         | `string`   | **Required**. The URL where you can buy the item. |

##### Example

```json
{
    "name": "Apple iPhone 12",
    "description": "128GB, White",
    "url": "https://www.amazon.com/dp/B08L5Q1L2Q/"
}
```

#### Response

```bash
Status: 201 Created
```

```json
{
    "id": "QvcDfWMwg",
    "name": "Apple iPhone 12",
    "description": "128GB, White",
    "url": "https://www.amazon.com/dp/B08L5Q1L2Q/"
}
```

### 🔐 Update an item

Update an item from the wishlist.

```bash
PUT /api/wishlist/items/:id
```

#### Input

| Name          | Type       | Description                                       |
|---------------|:-----------|:--------------------------------------------------|
| `name`        | `string`   | **Required**. The name of the item.               |
| `description` | `string`   | **Required**. The description of the item.        |
| `url`         | `string`   | **Required**. The URL where you can buy the item. |

If you only need to update some of the item properties, leave the other values as they are.
                             
##### Example

Take the following item as an example: 

```json
{
    "name": "PlayStation 5 Console",
    "description": "Ultra-high speed SSD and 3D Audio",
    "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
}
```

If you want to update the description only, you'll send a request body like the following:

```json
{
    "name": "PlayStation 5",
    "description": "Ultra-high speed SSD and 3D Audio",
    "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
}
```

#### Response

##### If item is not found

```bash
Status: 404 Not Found
```

##### If item is found

```bash
Status: 200 OK
```

```bash
{
    "id": "zAvIQGhn$b",
    "name": "PlayStation 5",
    "description": "Ultra-high speed SSD and 3D Audio",
    "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
}
```

### 🔐 Remove all items

Remove all items from the wishlist.

```bash
DELETE /api/wishlist/items
```

#### Response

```bash
Status: 204 No Content
```

### 🔐 Remove an item

Remove an item from the wishlist.

```
DELETE /api/wishlist/items/:id
```

#### Response

##### If item is not found

```bash
Status: 404 Not Found
```

##### If item is found

```bash
Status: 204 No Content
```

### 🔐 Reset the list

Reset the wishlist database to its default values.

```bash
GET /api/wishlist/reset
```

#### Response

```bash
Status: 200 OK
```

```json
[
    {
        "id": "K@MyH58Ej",
        "name": "Apple iPhone 12",
        "description": "128GB, White",
        "url": "https://www.amazon.com/dp/B08L5Q1L2Q/"
    },
    {
        "id": "oss94d7YUZ",
        "name": "PlayStation 5 Console",
        "description": "Ultra-high speed SSD and 3D Audio",
        "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
    },
    {
        "id": "7ovKgpue7a",
        "name": "Xbox Series S Console",
        "description": "Smallest, sleekest Xbox console ever",
        "url": "https://www.amazon.com/Xbox-S/dp/B08G9J44ZN"
    }
]
```
