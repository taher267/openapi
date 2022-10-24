const DEFAULT_PARAMS = {
  model: 'text-davinci-002',
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

export default async function AiFunc(prompt, max_tokens = 256) {
  const apiKey = process.env.REACT_APP_OPEN_API;
  const params_ = { ...DEFAULT_PARAMS, prompt, max_tokens };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(apiKey),
    },
    body: JSON.stringify(params_),
  };
  const response = fetch(
    'https://api.openai.com/v1/completions',
    requestOptions
  );
  return response;
  // const data = await response.json();
  // return data.choices[0].text;
}

// export async function query(params = {}) {
//   const params_ = { ...DEFAULT_PARAMS, ...params };
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + String(openai_api_key),
//     },
//     body: JSON.stringify(params_),
//   };
//   const response = await fetch(
//     'https://api.openai.com/v1/completions',
//     requestOptions
//   );
//   const data = await response.json();
//   return data.choices[0].text;
// }
// export default function AiFunc(prompt, max_tokens = 256) {
//   //   console.log('parm', prompt);
//   const { Configuration, OpenAIApi } = require('openai');

//   const configuration = new Configuration({
//     apiKey: process.env.REACT_APP_OPEN_API,
//   });
//   const openai = new OpenAIApi(configuration);
//   //   console.log(prompt, max_tokens);
//   //   return true;
//   return openai.createCompletion({
//     model: 'text-davinci-001',
//     prompt,
//     // `Write a detailed, smart, information and professional product description from ` +
//     //   prompt ||
//     // 'generate blog topic ideas on challenges facing entrepreneurs',
//     temperature: 0.7,
//     max_tokens,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//   });
//   //   .then((res) => {
//   //     console.log(res?.data?.choices?.[0].text);
//   //   });
// }
