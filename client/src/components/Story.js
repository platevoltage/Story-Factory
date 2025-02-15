import Snippet from './Snippet';
import { getAllStories, getSingleStory } from '../utils/API';
import { useState, useEffect } from 'react';


const textColors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6"
];

const storyStyle = {
    boxShadow: "3px 3px 5px black",
    width: '80%',
    marginLeft: '10%',
    marginTop: '3%',
    background: "linear-gradient(159deg, rgba(255,255,255,1) 0%, rgba(187,187,187,1) 100%)",
    color: '#000000',
    textShadow: "none",
    display: 'flex',
    zIndex: 2,
}
const pStyle = {
    textAlign: "center",
    overflowWrap: "normal",
}
const holeStyle = {
    boxShadow: "inset 1px 1px 5px black",
    border: "1px solid black",
    backgroundColor: "#0020af",
    height: "10px",
    minHeight: "10px",
    width: "10px",
    borderRadius: "10px",
    marginLeft: "35%",
    marginTop: "14px"
}
const marginStyle = {
    width: "40px", 
    display: "flex",
    flexDirection: "column", 
    border: "1px solid #00000033",
    overflow: "hidden"
}

export default function Story({storyName}) {
    const [currentStory, setCurrentStory] = useState(0);
    const getStory = async () => {
        
        try {
            
            if (!storyName) {
                const response = await getAllStories();
                const result = await response.json();

                const randomNumber = Math.floor(Math.random() * result.length);
    
                // setCurrentStory(result[randomNumber]);
                setCurrentStory(result[4]);  // set current story to Tech by default instead of random story

            } else {
                const response = await getSingleStory(storyName);
                const result = await response.json();

                setCurrentStory(result);
            }
    
        } catch (error){
            console.error(error);
        }
    }

    useEffect(()=>{
        getStory();
    }, []);

    return (
        <section style={storyStyle}>
            <div style={marginStyle}>
                {[...Array(80)].map(() => {
                    return <div style={holeStyle}></div>
                })}
            </div>


            <div style={{width: "100%", margin: "10px"}}>
                <h2>{currentStory.storyname}</h2>
                <p style={pStyle}>{currentStory.prompt}</p>
                {currentStory.snippets?.map((snippet, index) => (
                    <Snippet text={snippet.snippetText} color={textColors[index]} key={index} author={snippet.username}/>


                ))}
            </div>
            <div style={marginStyle}>
                {[...Array(80)].map(() => {
                    return <div style={holeStyle}></div>
                })}
            </div>

        </section>
    );
  }