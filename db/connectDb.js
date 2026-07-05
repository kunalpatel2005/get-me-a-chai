import mongoose from "mongoose";
import dns from "dns";

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

async function connectDB(){
    try{
        
        console.log(process.env.URI)
        await mongoose.connect(process.env.URI)
        console.log("connect successfully");

        //neche wala jo code he vo duplicate emails se bachane ke liye he
//         mongoose.connection.once("open", async () => {
//     const indexes = await userModel.collection.indexes();
//     console.log(indexes);
// })
    }catch(err){
        console.error("database connection err: ",err)
    }
}

export default connectDB;