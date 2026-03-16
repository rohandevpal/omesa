import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

app.get("/api/airtable", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.airtable.com/v0/${process.env.VITE_AIRTABLE_BASEID}/${process.env.VITE_AIRTABLE_TABLE_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.VITE_AIRTABLE_ACCESS_TOKEN}`,
        },
      }
    );

    res.json(data);
  } catch (error) {
    console.error("Airtable Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
