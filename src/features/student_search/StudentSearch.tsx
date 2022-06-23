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

//import styles from './StudentSearch.module.css';

export function StudentSearch() { 
  const dispatch = useAppDispatch();
  useEffect(() => {dispatch(studentDataAsync())}, []); //Initialize data with Async call

  const students = useAppSelector(selectStudentData);
  const studentIds = useAppSelector(selectFilteredStudentIds);
  const search_string = useAppSelector(selectSearchString);
  const selected_class = useAppSelector(selectSelectedClass);
  const valid_classes =  useAppSelector(selectFilteredClasses);
  return (
    <div>
      <div /*className={styles.header}*/>
        <div /*className={styles.searchBar}*/>
          <input 
            type="text"
            onChange={(e) => {dispatch(searchUpdated(e.target.value))}}
            value={search_string}
          />
        </div>
        <div /*className={styles.classSelection}*/>
          <select
            id="classes"
            onChange={(e) => {dispatch(classUpdated(e.target.value))}}
            value={selected_class}
          >
            {Object.keys(valid_classes).map((sclass) => (
              <option value={sclass}> {sclass} ( {valid_classes[sclass]} ) </option>
            ))}
          </select>          
          </div>
      </div>
      <div /*className={styles.body}*/>
        <div /*className={styles.studentList}*/ >
          {studentIds.map((studentId) => (
            <StudentTileSimple student={students.byId[studentId]}/>
          ))}
        </div>
      </div>    
    </div>
  );
}

//Hm what do we wanna include
//Pic
//LN, FN
//Classes
//City
//Skill
//Grades
//Email

const StudentTileSimple = ({student}: {student: Student}) => {
  return (
    <div /*className={styles.studentTile}*/>
      <div /*className={styles.studentTile.photoPanel}*/>
        <img src={student.pic} /*className={styles.studentTile.pic}*/></img>
      </div>
      <div /*className={styles.studentTile.infoPanel}*/>
        <div /*className={styles.studentTile.name}*/>
          <span>{student.lastName}, {student.firstName}</span>
        </div>
      </div>
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