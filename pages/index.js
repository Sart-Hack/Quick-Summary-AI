import Head from 'next/head';
import Image from 'next/image';
import githubLogo from '../assets/github-mark-white.png'
import notesLogo from '../assets/icons8-notes-64.png'
import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (Event) => {
    setUserInput(Event.target.value)
  }
  return (
    <div className="root">
      <Head>
        <title>Quick Summary A.I</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Quick Summary <Image src={notesLogo} /> A.I</h1>
          </div>
          <div className="header-subtitle">
            <h2>copy paste an article or a blog post and the AI will magically give you bullet points summary</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="start typing here" className="prompt-box" value={userInput} onChange={onUserChangedText} maxLength="10000"/>
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="badge-container grow">
        <a
          href="https://github.com/Sart-Hack"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={githubLogo} alt="github logo" />
            <p>Source</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
