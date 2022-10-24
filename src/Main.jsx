import { useEffect, useState } from 'react';
// import useOpenapi from './useOpenai';
// import { Configuration, OpenAIApi } from 'openai';
import AiFunc from './AiFunc';
import Blog from './Pages/Blog';

export default function Main() {
  const [input, setInput] = useState();
  useEffect(() => {
    // (async () => {
    //   try {
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     const res = await AiFunc(
    //       'composition of ecommarce product panzabidotcom Brand'
    //     );
    //     console.log(res);
    //   } catch (e) {
    //     console.log(e, 'res');
    //   }
    // })();
  }, []);
  return (
    <>
      <h3>Blog</h3>
      <Blog setInput={setInput} />
    </>
  );
}

const DEFAULT_PARAMS = {
  model: 'text-davinci-002',
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

export async function query(params = {}) {
  const params_ = { ...DEFAULT_PARAMS, ...params };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.REACT_APP_OPEN_API,
    },
    body: JSON.stringify(params_),
  };
  const response = await fetch(
    'https://api.openai.com/v1/completions',
    requestOptions
  );
  const data = await response.json();
  return data.choices[0].text;
}
