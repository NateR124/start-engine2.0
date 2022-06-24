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

const DEFAULT_SEARCH_TEXT = "Search...";

export function StudentSearch() { 
  const dispatch = useAppDispatch();
  useEffect(() => {dispatch(studentDataAsync())}, []); //Initialize data with Async call

  const students = useAppSelector(selectStudentData); //Student data
  const studentIds = useAppSelector(selectFilteredStudentIds); //List of student Ids being filtered to
  const search_string = useAppSelector(selectSearchString); //Current string entered in the search bar
  const selected_class = useAppSelector(selectSelectedClass); //Current class selected in the drop down
  const valid_classes =  useAppSelector(selectFilteredClasses); //List of possible classes to be shown in the drop down

  return (
    <div className={styles.gridcontainer}>
      <div className={styles.header}>
        <div className={styles.header_flex}>
          <div className={styles.searchBar}>
           <SvgSearchIcon/>
           <input
              className={styles.searchBarInput} 
              placeholder={DEFAULT_SEARCH_TEXT}
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
                <option value={sclass}> {sclass} <span>({valid_classes[sclass]})</span> </option>
              ))}
            </select>       
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.studentList} >
          <div>
              {students.ids.map((id) => (
                <StudentTileSimple student={students.byId[id]} hidden={(!studentIds.includes(id))}/>
              ))}
          </div>
        </div>   
      </div>
      <div className={styles.right}>           
      </div>  
    </div>
  );
}

const StudentTileSimple = ({student, hidden}: {student: Student, hidden: boolean}) => {
  return (
    <div className={(hidden ? styles.studentTileHidden : styles.studentTile)}>
      <div className={styles.studentName}>{student.firstName} {student.lastName}</div>
      <div className={styles.studentClassList}>{student.classes.map((sclass,index,array) => index<array.length-1 ? sclass+", ": sclass)}</div>
    </div>
  );
}

const SvgSearchIcon = () => {
  return(
    <svg className={styles.searchIcon} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
      <path fill="#9b9b9b" d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
    </svg>
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