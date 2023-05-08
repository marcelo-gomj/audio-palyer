const Store = require("electron-store");

const schema = {
   "volume": {
      type: "number",
      maximum: 1,
      minimum: 0,
      default: 0.05
   },
   "loop": {
      type: "boolean",
      default: false
   },

   "shuffle": {
      type: "boolean",
      default: false
   },
   "musicsSource": {
      type: 'array',
      minItems: 1,
      maxItems: 10,
      items: {
         type: 'string'
      }
   }
}

export const store = new Store({
   schema
})