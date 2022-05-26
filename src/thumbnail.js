const fs = require('fs');
const resizeImg = require('resize-img');
const dir = "../thumbnail";
const outputDir = "../build/images";
const requiredHeight = 128;
const requiredWidth = 128;

//function to start the thumbnail generation
async function startThumbnailGeneration(){
   if(!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
   }
   if(!fs.existsSync(outputDir)){
      console.log( "Error getting output" );
   }
   let files = fs.readdirSync(outputDir);
   if(!files.length){
      console.log("Error no files found");
   }
   for(file of files){
      console.log(`converting for image file: ${file}`)
      const image = await resizeImg(fs.readFileSync(`${outputDir}/${file}`), {
         width: requiredWidth,
         height: requiredHeight
      });
      fs.writeFileSync(`${dir}/${file}`, image);
   }
}

( () => {
    startThumbnailGeneration() 
      .then( response => {
         console.log( response );
      })
      .catch( error => {
         console.log( error );
      })
})()
