const express = require("express")
require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const { Configuration, OpenAIApi } = require("openai");


const app = express()
app.use(cors())
app.use(bodyParser.json())



const config = new Configuration({
  apiKey: process.env.OpenAI_API_KEY
})

const openai = new OpenAIApi(config)


  app.post("/ask", async (req, res) => {

  const prompt = req.body.prompt
  if (!prompt) {
    return res.status(400).send({ error: 'Prompt is required' })
  }
  try {
    await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2000,
      temperature: 0
    }).then((response) => {
      res.send({ data: response.data.choices[0].text })
    })
  } catch (error) {
    console.log(error);
    res.status(500).send((error))
  }
})

app.listen(5000, function () {
  console.log("server running at port 5000");
})