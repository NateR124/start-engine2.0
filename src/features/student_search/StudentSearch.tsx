import styles from './StudentSearch.module.css';

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectFilteredClasses,
  selectSelectedClass,
  selectSearchString,
  selectStudentData,
  selectFilteredStudentIds,
  studentDataAsync,
  searchUpdated,
  classUpdated,
  Student
} from './studentSearchSlice';


export function StudentSearch() { 
  const dispatch = useAppDispatch();
  useEffect(() => {dispatch(studentDataAsync())}, []); //Initialize data with Async call

  const students = useAppSelector(selectStudentData);
  const studentIds = useAppSelector(selectFilteredStudentIds);
  const search_string = useAppSelector(selectSearchString);
  const selected_class = useAppSelector(selectSelectedClass);
  const valid_classes =  useAppSelector(selectFilteredClasses);
  return (
    <div className={styles.gridcontainer}>
      <div className={styles.header}>
        <div className={styles.header_flex}>
          <div className={styles.searchBar_container}>
            <input
              className={styles.searchBar} 
              type="text"
              onChange={(e) => {dispatch(searchUpdated(e.target.value))}}
              value={search_string}
            />
          </div>
          <div className={styles.classSelector_container}>
            <select
                className={styles.classSelector}
                onChange={(e) => {dispatch(classUpdated(e.target.value))}}
                value={selected_class}
              >
                {Object.keys(valid_classes).map((sclass) => (
                  <option value={sclass}> {sclass} <span>( {valid_classes[sclass]} )</span> </option>
                ))}
            </select>       
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.studentList} >
            {studentIds.map((studentId) => (
              <StudentTileSimple student={students.byId[studentId]}/>
            ))}
        </div>   
      </div>
      <div className={styles.right}>
            
      </div>  
    </div>
  );
}

const StudentTileSimple = ({student}: {student: Student}) => {
  return (
    <div /*className={styles.studentTile}*/>
      <span>{student.firstName} {student.lastName}</span><span /*className={styles.studentTile.classList}*/>{student.classes.map((sclass,index,array) => index<array.length-1 ? sclass+", ": sclass)}</span>
    </div>
  );
}

// function StudentTile(student: Student){
//   return (
//     <div className={styles.studentTile}>
//       <div className={styles.studentTile.photoPanel}>
//         <img src={student.pic} className={styles.studentTile.pic}></img>
//       </div>
//       <div className={styles.studentTile.infoPanel}>
//         <div className={styles.studentTile.name}>

//         </div>
//       </div>
//     </div>
//   );
// }