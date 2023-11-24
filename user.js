const collection = new mongo.Collection("users");

collection.createIndex({
  nombre: '',
  premio:''
});
