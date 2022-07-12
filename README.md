# Image Processing API
###### Udacity Software Engineering for Shell Project 1

This project provides an API to get placeholder thumbnail images of various sizes. The Image size is provided by the user via the url parameters.

## Installation
To install the project run the follwoing commands. This will clone the project to local directory and install all the dependencies.
```
git clone https://github.com/anindya2906/udacity_shell_project1.git
cd udacity_shell_project1
npm install
```

## Run Dev Server
This will run the development server.
```
npm run start
```

## Run Linting
This will lint the code with eslint
```
npm run lint
```

## Run Prettier
This will format the code with prettier
```
npm run prettier
```

## Run Tests
This will run all the test scripts.
```
npm run test
```

## Build Project
This will compile the TypeScript code to JavaScript code and put the compiled code in the dist folder.
```
npm run build
```

## Start the App
This will run the compiled JavaScript code.

```
node dist/index
```
## Use Case
Once the application has run go to the following url from your browser to see the end result
```
http://localhost:3000/api/image?filename=fjord.jpg&width=300&height=300
```
This should return the fjord.jpg file resized to 300x300 pixels.

The user can provide different url parameters for different file and image size.
Below are the possible parameters the user can choose from
```
filename
-----------
encenadaport.jpg
fjord.jpg
icelandwaterfall.jpg
palmtunnel.jpg
santamonica.jpg


'width' and 'height' can be any positive integer greater than 0.

```

## Errors
In case of the user provide invalid url parameters the application will return with a message stating the error.

> If filename parameter if absent the api will return an error message stating **_Image filename not specified_**.

> If a filename is specified for which the image file is not present it will return the error messsage **_File [filename] does not exist_**

> If height or width is not provided it will specify with the message **_Image height/width not specified_**

> If any of height or width is not a number or not positive integer it will return **_Height/Width should be a positive integer_**


## Attribution
* (https://blog.logrocket.com/using-prettier-eslint-automate-formatting-fixing-javascript/)
* (https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go)
* (https://github.com/eslint/eslint)
* (https://github.com/prettier/prettier)
* (https://github.com/prettier/eslint-config-prettier)
* (https://www.npmjs.com/package/eslint-plugin-prettier)
* (https://github.com/tlvince/eslint-plugin-jasmine/issues/56)
* (https://www.npmjs.com/package/eslint-plugin-jasmine)