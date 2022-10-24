import { Configuration, OpenAIApi } from 'openai';
//
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPEN_API,
});
const openai = new OpenAIApi(configuration);
const useOpenapi = async () => {
  const response = await openai.createCompletion({
    model: 'text-davinci-001',
    prompt: 'generate blog topic ideas on challenges facing entrepreneurs',
    temperature: 0.8,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response;
};

export default useOpenapi;
