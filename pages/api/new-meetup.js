import {MongoClient} from "mongodb";
//dont need to create react component
//define function on the server side code(this code here will never expose in client side)
async function ApiData(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // Never run at the client side(will expose credentials)
    const client = await MongoClient.connect(
      "mongodb+srv://QueeKao:Aa6413432456@cluster0.lekdx.mongodb.net/QueeKao?retryWrites=true&w=majority"
      // need a 'username' and 'password' and 'myFirstDatabase' you can re-write it to the name you want
      // connect return 'promise'
    );
    const db = client.db(); //get the database
    const meetupCollection = db.collection("meetups");
    //collection would be kind of your tables in a SQL database
    // document will be your entry in those table
    // collection hold mutiple document
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    // insertOne 'document' in this 'collection'
    client.close(); //close database connection once we done
    res.status(201).json({message: "Meetup inserted!!"});
    //like 'node' writeHead
  }
}
export default ApiData;
