import React, { useState } from 'react';
import AiFunc from '../AiFunc';
import Loader from '../Loader';
const topic = ['title', ' intro', 'blog'];
const searchs = [
  // 'Ad copy variants',
  // 'Ad Emoji to List',
  // 'Adjective Accelerator',
  // 'Analogy Generator',
  // 'Attention-Interest-Desire-Action',
  // 'Audience Refiner',
  // 'Before-After-Bridge',
  'Birthday Card',
  'Blog Conclusion',
  'Blog Ideas',
  'Blog Intro',
  'Blog Outline',
  'Blog Title',
  'Blog Title-Listicle',
  // 'Brand Mission',
  // 'Brand Voice',
  // 'Bullet Point To Blog Section',
  // 'Bullet Point To Pragraph',
  // 'Bullet Point',
  // 'Call to Action',
  // 'Cancellation Email',
  // 'Crousel Post',
  // 'Catchy Email Subject Lines',
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
const Blog = ({ setInput }) => {
  const [processing, setProcessing] = useState(false);
  const [value, setValue] = useState();
  const [result, setResult] = useState([]);
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
    setProcessing(true);
    for await (const item of [0, 1, 2]) {
      //3, 4, 5
      try {
        // ${topic[item]}
        const { data } = await AiFunc(
          `Write a ${select?.tone || ''} and smart about ${
            select?.search || ''
          } for ` + value.val,
          //   `Write a smart, professional ${topic[item]} for ` + value.val,
          500
        );
        const newData = data?.choices?.[0].text?.trim();
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
