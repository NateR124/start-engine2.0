import { Student } from "./studentSearchSlice";

const STUDENT_API_URL= "https://6181949532c9e2001780488b.mockapi.io/students";

export function fetchStudentData() {
    return new Promise<Student[]>((resolve) => {
      fetch(STUDENT_API_URL)
        .then((res) => res.json())
        .then((res) => resolve(res));
    });
};