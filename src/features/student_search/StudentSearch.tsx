import * as React from 'react';
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  selectFilteredClasses,
  selectSelectedClass,
  selectSearchString,
  selectStudentData,
  selectFilteredStudentIds,
  studentDataAsync,
  studentDataToggled,
  searchUpdated,
  classUpdated
} from './studentSearchSlice';

/* ---MUI Imports ---*/
import { 
  AppBar,
  Avatar, 
  Box,
  FormControlLabel,
  InputBase, 
  MenuItem,
  Paper,    
  Select,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Switch,
  Toolbar,
  Typography 
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

const DEFAULT_SEARCH_TEXT = "Search...";
const BEARS = "https://i.imgur.com/8dI0T36.gif"; //None of the avatars were loading... so...

export function StudentSearch() { 

  /* ---Local state to handle toggling between test data and API data--- */
  const [localStudentData, toggleLocalStudentData] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleLocalStudentData(event.target.checked);
    dispatch(studentDataToggled(event.target.checked));
  };

  const dispatch = useAppDispatch();
  useEffect(() => {dispatch(studentDataAsync())}, []); //Initialize data with Async call

  const students = useAppSelector(selectStudentData); //Student data
  const studentIds = useAppSelector(selectFilteredStudentIds); //List of student Ids being filtered to
  const search_string = useAppSelector(selectSearchString); //Current string entered in the search bar
  const selected_class = useAppSelector(selectSelectedClass); //Current class selected in the drop down
  const valid_classes =  useAppSelector(selectFilteredClasses); //List of possible classes to be shown in the drop down 

  return (
    <>
        <AppBar position="fixed" sx={{p: '4px', alignItems:'center'}}>
          <Toolbar>
          <Box sx={{ display: 'flex'}}>
            <FormControlLabel
                sx={{minWidth: '24px'}}           
                control={
                  <Switch
                    sx={{ mr: 'auto', ml: -12 }}
                    edge="start"
                    checked={localStudentData}
                    onChange={handleChange}
                    aria-label="login switch"
                  />
                } 
                label={localStudentData ? 'Local' : 'API'}
              />
          </Box>
          <Box sx={{ display: 'flex'}}> 
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', flexgrow: 1, alignItems: 'center'}}
              >
                <SearchIcon />
                <InputBase
                  sx={{ml: 1, flex: 1, minWidth:'400px'}}
                  placeholder={DEFAULT_SEARCH_TEXT}
                  onChange={(e) => {dispatch(searchUpdated(e.target.value))}}
                  value={search_string}
                />
                <Select
                    sx={{ alignItems: 'center', minWidth: '200px', border: 'none' }}
                    onChange={(e) => {dispatch(classUpdated(e.target.value))}}
                    value={selected_class}
                >
                  {Object.keys(valid_classes).map((sclass) => (
                    <MenuItem value={sclass}> {sclass} ({valid_classes[sclass]})</MenuItem>
                  ))}
                </Select>    
              </Paper>
            </Box>          
          </Toolbar>
        </AppBar>
        <Box sx={{      
              display: "flex",
              mt: '70px',
              justifyContent: "center",
              // textAlign: "center"
            }}
        >
          <List sx={{p: '0px'}}>         
            {students.ids.map((id) => (
              <ListItem 
                sx={{ 
                  transition: 'ease height .3s', 
                  height: (studentIds.includes(id) ? '60px': '0px'),
                  p: (studentIds.includes(id) ? '2px': '0px'),
                  minWidth: '360px',
                  overflow: 'hidden',
                  bgcolor: 'background.paper' 
                }}
              >
                <ListItemAvatar>
                  <Avatar alt="" src={/* students.byId[id].avatar*/BEARS}/>
                </ListItemAvatar>
                <ListItemText
                  primary={students.byId[id].firstName+" "+students.byId[id].lastName}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                      >
                      </Typography>
                      {students.byId[id].classes.map((sclass,index,array) => index<array.length-1 ? sclass+", ": sclass)}
                    </>
                  }
                  />
                </ListItem>
              ))}
          </List >
        </Box>
    </>
  );
}