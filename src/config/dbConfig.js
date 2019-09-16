export default () => {
  console.log('db URl:', process.env.MONGODB_ADDON_URI || "mongodb://localhost:27017/LIB");
  return process.env.MONGODB_ADDON_URI || "mongodb://localhost:27017/LIB";
  // return 'mongodb+srv://lib-portal:learninblue@cluster0-jvnif.mongodb.net/test?retryWrites=true&w=majority';
  // if (process.env.NODE_ENV == 'production') {
  //   return 'mongodb+srv://lib-portal:learninblue@cluster0-jvnif.mongodb.net/test?retryWrites=true&w=majority'

  // } else {
  //   //dev
  //   return process.env.MONGODB_ADDON_URI || "mongodb://localhost:27017/LIB";
  // }

}