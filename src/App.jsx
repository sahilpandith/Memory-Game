/* eslint-disable no-undef */
import { useState ,useRef,useEffect} from 'react'
import './App.css';
import fetchData from './mockApi';

function App() {
  const [score, setScore] = useState(0);
  const bestScore = useRef(0);
  const [data,setData] = useState([]);
  const [hitUrls,setHitUrls] = useState([]);

  if(hitUrls.length===12){
    alert('won');
    setBestScore(score);
    clearStates();
  }
  
  function clearStates(){
    setScore(0);
    setHitUrls([]);
  }
  function setBestScore(score){
    if(score>bestScore.current){
      bestScore.current=score;
    }
  }
  function imgHandler(url){
    if(hitUrls.includes(url)){
      alert('game over');
      setBestScore(score);
      clearStates();
    }else{
      setHitUrls([...hitUrls,url]); 
      setScore(score+1);
    }
  }

  function shuffle (array){ 
    return array.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value); 
  }

  useEffect(() => {
    setData([...shuffle(data)]);
  },[score])

  useEffect(() => {
        async function getData(){
          const response = await fetchData();
          setData(response);
        }
        getData();
  },[])

  return (
    <div className='app'>
      <header>
        <div className='game-name'>Memory Game</div>
        <div className="scorecard">
            <div className="current-score"><span>Score : </span>{score}</div>
            <div className="best-score"><span>Best Score : </span>{bestScore.current}</div>
        </div>
      </header>
      <main>
        {data.map((url) => <div className='image' key={url}>
                            <img src={url} onClick={() => imgHandler(url)}></img>
                          </div>
          )}
      </main>
    </div>
  )
}

export default App
