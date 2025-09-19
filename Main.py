from operator import truediv

from fastapi import FastAPI
from contextlib import asynccontextmanager
import random
import json
from pathlib import Path
from typing import List   
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


BASE_DIR = Path(__file__).resolve().parent
file_path = BASE_DIR / "questions.json"

data = []

#
# הפעולה הבאה מתארת את משך החיים של השרת,
# בתחילת הקמת השרת (לפני yeild) אנחנו נקרא את הקובץ פעם אחת בלבד (כי למה שנקרא פעמיים מה אנחנו אוטיסטים),
# #הפעולה yield אומרת ״צא מהפונקציה תחזור אחר כך״

@asynccontextmanager
async def lifespan(app: FastAPI):
    with open(file_path, 'r', encoding='utf-8') as file:
        app.state.data = json.load(file)
    print(len(app.state.data))
    yield


app = FastAPI(lifespan=lifespan)
# לייפסן תטען רק אחרי שהשרת מופעל פעם ראשונה
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow your React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ClientQuestion(BaseModel):
    questionNumber: int
    selectedAnswer: int


class CheckTestRequest(BaseModel):
    answers:List[ClientQuestion]
@app.get("/")
def root():
    return {"message": "Server is running! Use /get-test or /check-test"}

# to run- uvicorn Main:app --reload in terminal
@app.post("/check-test")
def post(request: CheckTestRequest):
    wrongAnswers =[]
    count=0
    for q in request.answers: #q is an object (ClientQuestion); contains qNum and selected answer
        if app.state.data[q.questionNumber]["correctAnswer"] != q.selectedAnswer:
            count+=1
            wrongAnswers.append(q)
            wrongAnswers.append("correct answer =" )
            wrongAnswers.append( app.state.data[q.questionNumber]["correctAnswer"])
            

    passed = count <= 4

    response = {"passed": passed , "wrong Answers": wrongAnswers}
    return response

@app.get("/get-test")
def print_questions():
    selected =  random.sample(app.state.data, 10)
    return {"questions": selected}