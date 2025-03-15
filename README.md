
# ImagineText

Introducing Imagine Text 💡. Harness TesseractJS to effortlessly convert image text into editable, copyable text. Unleash the power of visualization! 📷🔍

Live:https://imaginetext-frontend.onrender.com



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




## Screenshots

![Image](https://github.com/user-attachments/assets/1c1cc0df-d86c-48bd-85ca-ee045cefdbe0)

![Image](https://github.com/user-attachments/assets/22430e7e-2a25-4625-beb0-8779415ea76a)



