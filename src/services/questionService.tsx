import type { Question } from "../types/question";

export async function fetchAllQuestions(): Promise<Question[]> {
  const response = await fetch("http://127.0.0.1:8000/get-test");
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  const data = await response.json(); // this is { questions: [...] }
  return data.questions;              // this is the actual array you want
}
