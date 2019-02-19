const fs = require("fs");

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('z:\\win32_operatingSystem.json');    
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var getAll = () => {
  var allNotes = fetchNotes();  
  console.log(allNotes.class.properties);
  var keys = Object.entries(allNotes.class.properties)
    .filter(pair => pair[1] === "number")
    .map(pair => pair[0]);
  console.log(keys);
};

getAll();