simple implementation of OTP (one time password). In this project, I use redis as a cache to store otp and outlook as email server. Here is the flow of this project :

- user register using email and password (../register). This data is saved in redis with expiry time
- email and password save to db with is_active = false
- generate otp and save to redis with expiry time
- send otp to user email
- user enter otp to activate account (../verify)
- user can regenerate new otp and resend otp to user email (../resend)

### Request Body

- ../register

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

- ../verify

```json
{
  "email": "test@gmail.com",
  "otp": "123456"
}
```

- ../resend

```json
{
  "email": "test@gmail.com"
}
```

### dependencies
```json
"dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.18.1",
    "nodejs-nodemailer-outlook": "^1.2.4",
    "redis": "^4.6.13",
    "shortid": "^2.2.16",
    "sqlite3": "^5.1.7"
  }
```