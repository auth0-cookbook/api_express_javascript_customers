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

[https://glitch.com/edit/#!/api--express--javascript--customers](https://glitch.com/edit/#!/api--express--javascript--customers?path=README.md%3A1%3A0)

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

Look for the **Project links** section and copy the "Live Site" link:

```bash
https://<random-long-string>.glitch.me
```

This is the root URL of your live server that you can use to make requests.

### Test a protected endpoint

You need an access token to call any of the protected API endpoints.

Try to make the following request:

```bash
curl https://<random-long-string>.glitch.me/api/customers/rewards/9087654321
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

In the value of the `--header` parameter, the value of `really-long-string` is your access token.

Replace the value of the `--url` parameter with your `GET api/customers/rewards/:id` endpoint URL:

```bash
curl --request GET \
  --url https://<random-long-string>.glitch.me/api/customers/rewards/9087654321 \
  --header 'authorization: Bearer really-long-string'
```

Copy and paste the updated cURL command into a terminal window and execute it. You should now get a valid response.

Try calling any of the API endpoints outlined in the next section.

## API Endpoints

These endpoints require the request to include an access token issued by Auth0 in the authorization header.

### 🔐 Get customer rewards

Provides customer rewards data using a customer ID.

```bash
GET /api/customers/rewards/:id
```

#### Response

##### If customer is not found

```bash
Status: 404 Not Found
```

##### If item is found

```bash
Status: 200 OK
```

```json
{
  "id":"9087654321",
  "balance":830
}
```

### 🔐 Get customer alert settings

Provides customer alert settings data using a customer ID.

```bash
GET /api/customers/alerts/:id
```

#### Response

##### If customer is not found

```bash
Status: 404 Not Found
```

##### If item is found

```bash
Status: 200 OK
```

```json
{
  "id":"9087654321",
  "text":false,
  "email":true
} 
```
