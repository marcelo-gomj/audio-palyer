const query = (className) => {
   const elem = [...document.querySelectorAll(className)];
   return elem.length === 1 ? elem[0] : elem;
}

module.exports = {
   query
}