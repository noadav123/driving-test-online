import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAllQuestions } from "../services/questionService";
import QuestionItem from "./QuestionItem";
import type { Question } from "../types/question";
import type { ClientQuestion } from "../types/ClientQuestion"; 



const QuestionList: React.FC = () => {
  const { data: questions, isLoading, isError, error } = useQuery({
    queryKey: ["questions"],
    queryFn: fetchAllQuestions
  });
  const [answers, setAnswers]= useState<ClientQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult]= useState<any>(null);
   const mutation = useMutation({ mutationFn: post , onSuccess: (data) =>  {
      setResult(data), console.log(result) }});
   async function post() {
  const respone = await fetch ("http://127.0.0.1:8000/check-test", 
    {method: "POST", 
      headers:{"Content-type" : "application/json"},
      body: JSON.stringify({answers})
    });
    return respone.json()
 }
 
  
   function passed(data: string){
      <h1> {data}</h1> 
   }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

   
  const submitTest = () => {
      
    mutation.mutate();
  };
   
    const handleAnswer = (answer: ClientQuestion) => {
  console.log("Got from child:", answer);
  setAnswers(prev => [...prev , answer]);
  if (currentIndex< 10){
  setCurrentIndex(currentIndex+1)}
  else {<>
    <h1>all done! </h1>
    <button onClick={submitTest}> </button>
    </>
  }
  
};
 const q: Question = {
  questionNumber: 1,
  question: "placeholder",
  answers: [ ],
  imageSrc: "-"
};
  
  //const r = new Array(JSON.stringify(result["wrong Answers"]))
 
 
  

  return (
      questions![currentIndex] ? (
      <>
    <h3 className="questionNumber">שאלה {currentIndex + 1}</h3>
    <QuestionItem
      question={questions![currentIndex]}
      onSubmit={handleAnswer}
    />
     </>
) : (
  <>
  <div className="endScreen">  
    <h1  className="end"> הגעת לסוף המבחן </h1> 
    {  }
    <button className="submitTest" onClick={submitTest}> הגש </button>
    {console.log(answers)}
     {result && (
        <div>
         
          <h1 className="passed"  style ={{color:result.passed === true ? "green" : "red"}}>{result.passed ? "עברת" : "נכשלת"}</h1>
          { !result.passed &&  <h3> מי לא עובר תיאוריה... מביך</h3>}
          <p>טעויות:   {JSON.stringify(result["wrong Answers"])}</p>
        </div>
      )}
     </div>
    </>
    
)
  );
};

export default QuestionList;