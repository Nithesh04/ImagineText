
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

![Image](https://github.com/user-attachments/assets/f1db4ce5-5849-43b7-9c2a-5e3459e86abf)

![Image](https://github.com/user-attachments/assets/8461f3ed-39b2-4ace-bf7b-2ecc04cdf0be)


## License
[MIT](https://choosealicense.com/licenses/mit/#) 


