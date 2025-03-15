
# ImagineText

Introducing Imagine Text 💡. Harness TesseractJS to effortlessly convert image text into editable, copyable text. Unleash the power of visualization! 📷🔍

live:https://imaginetext-frontend.onrender.com



## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express, TesseractJS

**Cloud Storage:** Cloudinary


## Run Locally

Go to the project directory

```bash
  cd ImagineText
```

Start Server

```bash
  cd server && npm install
```
```bash
  node index.js
```
Add the following environment variables to your .env file in the server folder

`PORT`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

You can get your cloudinary keys from [here](https://cloudinary.com/)

Create a directory called `uploads` in the server as well.

Start Client

```bash
  cd client && npm install
```
```bash
  npm run dev
```
Add the following environment variables to your .env file in the client folder

`VITE_API_URL=http://localhost:5000`

## Environment Variables

To run this project, you will need to 
## API Reference

#### Get all items

```http
  POST /api/extractTextFromImage
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `file`    | `file`   | **Required**. Image file to process|


## Screenshots

![Image](https://github.com/user-attachments/assets/c43347cd-a266-477d-a6d4-2674c5f94b8e)



