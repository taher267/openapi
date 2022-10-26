import React, { useState } from 'react';
import AiFunc from '../AiFunc';
import Loader from '../Loader';
// const topic = ['title', ' intro', 'blog'];
const searchs = [
  // 'Ad copy variants',
  // 'Ad Emoji to List',
  // 'Adjective Accelerator',
  // 'Analogy Generator',
  // 'Attention-Interest-Desire-Action',
  // 'Audience Refiner',
  // 'Before-After-Bridge',
  // 'Birthday Card',
  // 'Blog Conclusion',
  // 'Blog Ideas',
  // 'Blog Intro',
  // 'Blog Outline',
  // 'Blog Title',
  // 'Blog Title-Listicle',
  // 'Brand Mission',
  // 'Brand Voice',
  // 'Bullet Point To Blog Section',
  // 'Bullet Point To Pragraph',
  // 'Bullet Point',
  // 'Call to Action',
  // 'Cancellation Email',
  // 'Crousel Post',
  // 'Catchy Email Subject Lines',

  'Ad copy Varients',
  'Facebook Headlines',
  'Facebook Link Descriptions',
  'Facebook Listicle',
  'Facebook Primary Text',
  'General Ad Copy',
  'Google Descriptions',
  'Google Headlines',
  'LinkedIn Add Copy',
];
const tones = [
  'Friendly',
  'Luxury',
  'Relance',
  'Relaxed',
  'Professional',
  'Bold',
  'Adventurous',
  'witty',
  'Persuasive',
  'Empathetic',
];
const Blog = () => {
  const [processing, setProcessing] = useState(false);
  const [char, setChar] = useState(500);
  const [input, setInput] = useState('');
  const [value, setValue] = useState();
  const [value2, setValue2] = useState();
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);
  const [select, setSelect] = useState({ tone: 'friendly', search: '' });

  const selectHandler = ({ target: { name, value } }) => {
    setSelect((p) => ({ ...p, [name]: value }));
  };

  const submitHanlder = async (e) => {
    e.preventDefault();
    // setInput(value);
    if (!select?.search || !select?.tone || !value?.val)
      return window.alert(`All fields are mandatory!`);
    setResult([]);

    const result = [];
    // let clearInterv;
    let inp =
      `Write a ${select?.tone || ''} and smart about ${
        select?.search || ''
      } for ` + value.val;
    setInput(inp);
    setProcessing(true);
    for await (const item of [0, 1, 2]) {
      //3, 4, 5
      try {
        // ${topic[item]}
        const data = await AiFunc(
          inp,
          //   `Write a smart, professional ${topic[item]} for ` + value.val,
          500
        );
        const res = await data.json();
        // console.log(res);
        const newData = res?.choices?.[0].text?.trim();
        result.push(newData);
        // setResult([newData]);
      } catch (e) {
        console.log(e, 'for await');
      }
    }

    if (result.length === 3) {
      //   clearInterval(clearInterv);
      setResult(result);
      setProcessing(false);
    }
  };
  //   console.log(result);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
      <div>
        <h4>Result:</h4>
        {processing ? <Loader /> : ''}

        <hr />
        {result?.map((res, i) => (
          <p key={i} style={{ textAlign: 'left', padding: 20 }}>
            {i + 1}. {res}
          </p>
        ))}
      </div>
      <div>
        <h4>Blog title:</h4>
        <form onSubmit={submitHanlder}>
          <div style={{ marginBottom: '20px' }}>
            <select name="search" onChange={selectHandler}>
              <option value="">Select...</option>
              {searchs?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select name="tone" onChange={selectHandler}>
              {tones?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          Input: {input}
          <hr />
          <textarea
            style={{ width: '100%' }}
            onChange={({ target: { value } }) => {
              setValue((p) => ({ id: 'B1', val: value }));
            }}
            rows={5}
          >
            {value?.val}
          </textarea>
          <button type="submit">Submit</button>
        </form>
        <hr />

        <h4>Full user controll</h4>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!value2) return window.alert(`Please write your expectation`);
            try {
              // ${topic[item]}
              const data = await AiFunc(value2, parseInt(char) || 256);
              const res = await data.json();
              // console.log(res);
              const newData = res?.choices?.[0].text?.trim();
              setResult2([newData]);
            } catch (e) {
              console.log(e, 'for await');
            }
          }}
        >
          <textarea
            style={{ width: '100%' }}
            onChange={({ target: { value } }) => {
              setValue2(value);
            }}
            rows={5}
          >
            {value?.val}
          </textarea>
          {/* <input
            type="number"
            style={{ width: '100%' }}
            onChange={({ target: { value } }) => {
              setChar(parseInt(value));
            }}
            placeholder="Expected character, Number"
          /> */}
          <button type="submit">Submit</button>
        </form>
        <div>
          <h4>Result:</h4>
          {processing ? <Loader /> : ''}

          <hr />
          {result2?.map((res, i) => (
            <p key={i} style={{ textAlign: 'left', padding: 20 }}>
              {i + 1}. {res}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

// AiFunc(
//   'Write a smart, informational and professional title for ' +
//     value.val,
//   500
// )
//   .then((res) => {
//     const newData = res?.data?.choices?.[0].text;
//     console.log(newData.trim());
//     setResult([newData.trim()]);
//     // setInput(p=>({...p, val:p.val+'\n'+''}))
//   })
//   .catch((e) => console.log(e));
// clearInterv = setInterval(() => {
//   AiFunc(
//     'Write a smart, informational and professional title for ' +
//       value.val,
//     500
//   )
//     .then((res) => {
//       const newData = res?.data?.choices?.[0].text?.trim();
//       //   setResult((p) => [...p, newData]);
//       //   console.log(newData);
//       result.push(newData);
//       // setInput(p=>({...p, val:p.val+'\n'+''}))
//     })
//     .catch((e) => console.log(e));
// }, 2000);
