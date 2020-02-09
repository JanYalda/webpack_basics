function CustomPlugin(){

}

CustomPlugin.prototype.apply = function(compiler){
  console.log("custom plugin test");
}

module.exports = CustomPlugin;
