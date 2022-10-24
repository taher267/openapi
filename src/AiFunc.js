export default function AiFunc(prompt, max_tokens = 256) {
  //   console.log('parm', prompt);
  const { Configuration, OpenAIApi } = require('openai');

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPEN_API,
  });
  const openai = new OpenAIApi(configuration);
  //   console.log(prompt, max_tokens);
  //   return true;
  return openai.createCompletion({
    model: 'text-davinci-001',
    prompt,
    // `Write a detailed, smart, information and professional product description from ` +
    //   prompt ||
    // 'generate blog topic ideas on challenges facing entrepreneurs',
    temperature: 0.7,
    max_tokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  //   .then((res) => {
  //     console.log(res?.data?.choices?.[0].text);
  //   });
}
