import { Student } from "./studentSearchSlice";
import { api_data } from "./assets/testApiData";

const STUDENT_API_URL= "https://6181949532c9e2001780488b.mockapi.io/students";
const test_data = true;

export function fetchStudentData() {
    if(test_data)
    {
      return new Promise<Student[]>((resolve) =>
      setTimeout(() => resolve(api_data), 500));
    }
    else
    {
      return new Promise<Student[]>((resolve) => {
        fetch(STUDENT_API_URL)
          .then((res) => res.json())
          .then((res) => resolve(res));
      });
  }
};

export function fetchTestData() {
  return new Promise<Student[]>((resolve) =>
  setTimeout(() => resolve(api_data), 500));
}