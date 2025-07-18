import React from "react"
import QuestionList from "./components/QuestionList"
import {QueryClient , QueryClientProvider} from "@tanstack/react-query";
import "./index.css"

const queryClient= new QueryClient();
const App: React.FC=()=> (
  <QueryClientProvider client = {queryClient}>
    <h1>all questions</h1>
    <QuestionList/>
  </QueryClientProvider>
);


export default App
