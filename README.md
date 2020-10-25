# shopping-cart
This is a basic shopping cart with nodeJs runtime and vanilla javaScript.

## 👨‍💻 Deploy  💻 Localhost
'views/js/index.js' file comment line one and enable line 2 which is commented.
after that, run command 'npm run dev' or 'npm run start'.

## 👨‍💻 Deploy 🎁 Docker Localhost.
###### DockerFile
Open your terminal and enter the main project folder, follow next steps:
1. docker build --tag `<image name>`:1.0 .
2. docker run --publish 3000:3000 --detach `<image name>`:1.0

After that, if you want remove container, run next command:

· docker rm --force `<container name>`