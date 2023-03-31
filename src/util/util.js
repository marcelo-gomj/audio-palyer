const { parseNodeStream } = require("music-metadata-browser");
const { createReadStream } = require("fs");

export const imageBuffer = async ( path ) => {
   try{
      const { common } = await parseNodeStream(createReadStream(path));
      const buffer = common?.picture[0]?.data
      const format = common?.picture[0]?.format

      return { buffer, format };
   }catch(err){
      return null
   }
}

// imageBuffer("D:\\Música\\Felipe Araújo - Check\\06 - Felipe Araújo - Curso Online.mp3");
