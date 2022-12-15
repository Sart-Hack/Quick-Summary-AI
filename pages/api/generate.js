import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
                        `Summarise the prompt below.Make small bullet points.
                        prompt: `;
const generateAction = async (req, res) => {
    console.log(`Api: ${basePromptPrefix}${req.body.userInput}`)
    
    const baseCompletion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${basePromptPrefix}${req.body.userInput}\n Summary:`,
        temperature: 0.7,
        max_tokens: 200,
    })

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput});    
};

export default generateAction;