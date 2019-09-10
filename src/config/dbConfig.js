export default () => {

  // return 'mongodb+srv://lib-portal:learninblue@cluster0-jvnif.mongodb.net/test?retryWrites=true&w=majority';
  if (process.env.NODE_ENV == 'production') {
    return 'mongodb+srv://lib-portal:learninblue@cluster0-jvnif.mongodb.net/test?retryWrites=true&w=majority'

  } else {
    //dev
    return "mongodb://localhost:27017/LIB";
  }

}