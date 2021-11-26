const nodeHtmlToImage = require('node-html-to-image')
const title = "titre"
const text = "text"
const _htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <style>
      body {
        font-family: "Poppins", Arial, Helvetica, sans-serif;
        background: #161616;
        color: #fff;
        max-width: 1200px;
        display: flex;
        flex-direction: column;
        }
      .title {
        padding: 15px;
        padding-top: 0px;
        padding-bottom: 0px;
        background: #232323;
        background-color: #151515;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .line {
        background:#444CF7;
        min-height: 5px;
      }
      .title h2 {
        margin-top: 15px;
        margin-bottom: 10px;
      }
      .title h1 {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: auto;
      }
      .app {
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        flex-direction: row;
        /**border-top: 3px solid rgb(16, 180, 209); **/
        background-color: #232323;
opacity: 0.8;
background-image: radial-gradient(circle at center center, #565aa8, #232323), repeating-radial-gradient(circle at center center, #565aa8, #565aa8, 9px, transparent 18px, transparent 9px);
background-blend-mode: multiply;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <div class="title"> 
      <h2>${title}</h2>
      <h3>By Sharcay</h3>
    </div>
    <div class="line"></div>
    <div class="app">
      
      <h4>${text}</div>
  </body>
</html>`

nodeHtmlToImage({
    html: _htmlTemplate,
    quality: 100,
    type: 'jpeg',
    puppeteerArgs: {
      args: ['--no-sandbox'],
    },
    
    output: './image.png'
  }).then(() => console.log('The image was created successfully!'))