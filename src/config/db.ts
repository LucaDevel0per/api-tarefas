import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("✅ Conectado ao MongoDB com sucesso!");
    } catch(err) {
        console.error("❌ Erro ao conectar ao MongoDB:", err);
        process.exit(1); // Encerra o app se der erro
    }
};

export default connectToDatabase;