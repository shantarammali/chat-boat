const express = require('express');
const cors = require('cors');
const path = require('path'); // Add this to handle paths
const { OpenAIEmbeddings } = require("@langchain/openai");
const { Chroma } = require("langchain/chains");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { ChatOpenAI } = require("@langchain/openai");
const { RetrievalQAChain } = require("langchain/chains");

const fs = require("fs");
const pdfParse = require("pdf-parse");
require('dotenv').config();

const { chatWithOpenAI } = require('./services/llmService');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// === ✅ Serve React build files ===
const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// === ✅ API route ===
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log(`User message: ${userMessage}`);
  try {
    const messages = [
      {
        role: "system",
        content: "You are an HR assistant chatbot for Testing Corporation. Answer employee queries in a helpful, friendly,and company-compliant ways.",
      },
      { role: "user", content: userMessage }
    ];
    const aiResponse = await chatWithOpenAI(messages);
    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ error: 'Error communicating with OpenAI' });
  }
});

// === ✅ Catch-all to support React Router ===
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// === ✅ Start server ===
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
