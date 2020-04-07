class UserService {

  constructor() {}

  // Make Singleton myself
  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * 
   */
  getAllUsers(db,callback) {
    if(db){
     db.collection('User').find().toArray((err, result) => {
        if (err) return callback(err)
        callback(result);
      })
    }
    
  }
  addNewUser(db,body,callback) {
    if(db){
      db.collection('User').insertOne(body, (err, result) => {
        if (err) return callback(err)
        callback(result);
      })
     
    }
  }
  updateUser(db,ObjectId,id,body,callback) {
    if(db){
        db.collection('User')
        .update({_id: ObjectId(id)},body, {upsert:true, w: 1}, (err, result) => {
          if (err) return callback(err)
          callback(result);
        })
     
    }
  }
  deleteUser(db,ObjectId,id,callback) {
    if(db){
      db.collection('User').findOneAndDelete({_id: ObjectId(id)}, (err, result) => {
        if (err) return callback(err)
        console.log(result);
        callback(result)
      })
    }
  }
}

module.exports = UserService.getInstance();