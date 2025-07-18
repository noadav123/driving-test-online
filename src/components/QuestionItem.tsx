import React, { useState } from "react";
import type { Question } from "../types/question";
import type { ClientQuestion } from "../types/ClientQuestion";

interface Props {
  question: Question;
  onSubmit: (value: ClientQuestion) => void;
}

const QuestionItem: React.FC<Props> = ({ question, onSubmit }) => {
  const [ans, setAns] = useState<ClientQuestion | null>(null);

  const handleClick = (idx: number, qNumber: number) => {
    const newAnswer: ClientQuestion = {
      questionNumber: qNumber,
      selectedAnswer: idx + 1, 
    };
    setAns(newAnswer);
  };

  function handleSubmit(){
    if (ans && selectedIdx!==-1) {
      onSubmit(ans); // send answer to parent
      
    } else {
      alert("נא לבחור תשובה לפני הגשת השאלה");
    }
  };

  
   const [selectedIdx , setsSlectedIdx]= useState<Number>()

  
  return (
    
    <div className="div1">
       
      <h3 className="question">{question.question}</h3>
      {question.imageSrc && (
        <img className="image" src={question.imageSrc} alt="question" />
      )}
      <ul>
        {question.answers.map((answer, idx) => (
          <li
            onClick=
            {  () => {
              handleClick(idx, question.questionNumber);
               setsSlectedIdx(idx)
                
                
            }   
            }
            style={ { color: idx === selectedIdx ? "grey" : "white" }}
              
             
            className="listItem"
            key={idx}
          >
            {answer}
          </li>
        ))}
      </ul>
      <button   className = "button1"onClick={() => {handleSubmit(); setsSlectedIdx(-1)} }>שאלה הבאה</button>
    </div>
  );
};

export default QuestionItem;
