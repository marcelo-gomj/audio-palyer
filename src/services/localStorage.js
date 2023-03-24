const config = (key, value) => {
   if(value){
      console.log("ENTRADA", value);

      localStorage.setItem(key, JSON.stringify(value))
   }
   
   const res = JSON.parse(localStorage.getItem(key)) || {}; 
   
   console.log("SAIDA", res);
   
   return res
}

module.exports = {
   config
}