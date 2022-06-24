import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchStudentData } from './studentSearchAPI';
import { createSelector } from 'reselect'

/* ---Constants--- */
const DEFAULT_NONE_CLASS = 'All';
const NULL_STUDENTS ={
  byId: { 
    "0": {
      "createdAt": "2021-11-02T02:19:26.694Z",
      "firstName": "N/A",
      "avatar": "N/A",
      "email": "N/A",
      "lastName":"N/A",
      "test":"N/A",
      "city":"N/A",
      "company":"N/A",
      "grades":["0","0","0","0","0","0","0","0"],
      "classes":["N/A","N/A"],
      "id":"0",
      "pic":"N/A",
      "skill":"N/A"
      }
  },
  ids: ["0"]
};

/* ---Data Interfaces--- */
export interface Student {
  createdAt: string;
  firstName: string;
  avatar: string;
  email: string;
  lastName: string;
  test: string;
  city: string;
  company: string;
  grades: string[];
  classes: string[];
  id: string;
  pic: string;
  skill: string;
}

export interface StudentClasses { 
  [className: string]: number; 
}

export interface NormalizedObjects<O> {
  byId: {[id: string]: O };
  ids: string[];
}

export interface StudentSearchState {
  searchString: string;
  selectedClass: string;
  students: NormalizedObjects<Student>;
  status: 'idle' | 'loading' | 'failed' ;
}

/* ---Initial State--- */
const initialState: StudentSearchState = {
  searchString: '',
  selectedClass: DEFAULT_NONE_CLASS,
  students: NULL_STUDENTS,
  status: 'idle',
};

/* ---Async Thunk--- */
export const studentDataAsync = createAsyncThunk(
  'studentSearch/fetchStudentData',
  async () => {
    const response = await fetchStudentData();
    return response;
  }
);

/* ---Slice/Reducers--- */
export const studentSearchSlice = createSlice({
  name: 'studentSearch',
  initialState,
  reducers: {
    searchUpdated: (state, action: PayloadAction<string>) => { state.searchString = action.payload; },
    classUpdated: (state, action: PayloadAction<string>) => { state.selectedClass = action.payload; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(studentDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(studentDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //Normalize the incoming data
        const byId = action.payload.reduce((byId:{[id: string]: Student }, student) => {
          byId[student.id] = student;
          return byId;
        }, {});
        state.students.byId = byId;
        state.students.ids = Object.keys(byId);
      })
      .addCase(studentDataAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

/* ---Actions--- */
export const { searchUpdated, classUpdated } = studentSearchSlice.actions;

/* ---State selectors--- */
export const selectSearchString = (state: RootState) => state.studentSearch.searchString;
export const selectSelectedClass = (state: RootState) => state.studentSearch.selectedClass;
export const selectStudentData = (state: RootState) => state.studentSearch.students;
export const selectAsyncStatus = (state: RootState) => state.studentSearch.status;

/* ---Derived Selectors--- */
export const selectSearchFilteredStudentIds = createSelector(
  [selectSearchString,selectSelectedClass,selectStudentData,selectAsyncStatus], 
  (search,selectedClass,students,status) => {
    let filteredIds: string[] = [];
    if(search === "" && selectedClass === DEFAULT_NONE_CLASS || status!=='idle')
      return students.ids;
    students.ids.forEach(id => {
      const student = students.byId[id];
      if(student) {
        if((search===""||student.firstName.toLowerCase().startsWith(search.toLowerCase()))) { 
          filteredIds.push(student.id);
        }
      }
    });
    return filteredIds;
});
export const selectFilteredStudentIds = createSelector(
  [selectSearchFilteredStudentIds,selectSelectedClass,selectStudentData,selectAsyncStatus], 
  (studentIds,selectedClass,students,status) => {
    let filteredIds: string[] = [];
    if(selectedClass === DEFAULT_NONE_CLASS || status!=='idle')
      return studentIds;
    studentIds.forEach(id => {
      const student = students.byId[id];
      if(student) {
        if(selectedClass===DEFAULT_NONE_CLASS||student.classes.includes(selectedClass))
          filteredIds.push(student.id);
      }
    });
    return filteredIds;
});

export const selectFilteredClasses = createSelector(
  [selectSelectedClass,selectStudentData,selectSearchFilteredStudentIds,selectAsyncStatus],
  (selectedClass,students,studentIds,status) => {
    const valid_classes: StudentClasses = {};
    valid_classes[DEFAULT_NONE_CLASS] = studentIds.length;
    if(status==='idle')
    {
      for(const id in students.byId) {
        if(studentIds.includes(id)) {
          students.byId[id].classes.forEach(student_class => {
            if(student_class in valid_classes=== false)
              valid_classes[student_class]=1;
            else
              valid_classes[student_class]++;
          });
        }
      }
      if(selectedClass in valid_classes === false)
        valid_classes[selectedClass]=0;
    }
    return valid_classes;
});

export default studentSearchSlice.reducer;
