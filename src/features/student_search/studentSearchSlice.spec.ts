import studentSearchReducer, {
  StudentSearchState,
  searchUpdated,
  classUpdated,
} from './studentSearchSlice';

describe('reducer', () => {
  const initialState: StudentSearchState = {
    searchString: 'Howdy',
    selectedClass: 'calculus',
    students:{
      byId: { 
        "1": {
              "createdAt": "2021-11-02T02:19:26.694Z",
              "firstName":"Winston",
               "avatar":"https://cdn.fakercloud.com/avatars/catarino_128.jpg",
               "email":"Nellie55@yahoo.com",
               "lastName":"Carter",
               "test":"http://placeimg.com/640/480",
               "city":"Fushë-Muhurr",
               "company":"Yadel",
               "grades":["78","100","92","86","89","88","91","87"],
               "classes":["calculus","geogrpahy"],
               "id":"1",
               "pic":"http://placeimg.com/640/480",
               "skill":"Oracle"
              },
          "2": {
              "createdAt": "2021-11-02T18:52:06.148Z",
              "firstName":"Ellen",
              "avatar":"https://cdn.fakercloud.com/avatars/dannol_128.jpg",
              "email":"Stephany44@gmail.com",
              "lastName":"Morissette",
              "test":"http://placeimg.com/640/480",
              "city":"Fushë-Muhurr",
              "company":"Yadel",
              "grades":["78","100","92","86","89","88","91","87"],
              "classes":["calculus","geogrpahy"],
              "id":"2",
              "pic":"http://placeimg.com/640/480",
              "skill":"Oracle"
          },
          "3": {
            "createdAt": "2021-11-02T18:52:06.148Z",
            "firstName":"Ellen",
            "avatar":"https://cdn.fakercloud.com/avatars/dannol_128.jpg",
            "email":"Stephany44@gmail.com",
            "lastName":"Morissette",
            "test":"http://placeimg.com/640/480",
            "city":"Fushë-Muhurr",
            "company":"Yadel",
            "grades":["78","100","92","86","89","88","91","87"],
            "classes":["calculus","english","underwater basket weaving"],
            "id":"3",
            "pic":"http://placeimg.com/640/480",
            "skill":"Oracle"
        }
      },
      ids: ["1","2","3"]},
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(studentSearchReducer(undefined, { type: 'unknown' })).toEqual({     
        searchString: '',
        selectedClasses: 'All',
        students: {} as any,
        status: 'idle',
    });
  });
  it('should handle setting search string', () => {
    //const actual = studentSearchReducer(initialState, searchUpdated('Test'));
    //expect(actual.searchString).toEqual('Test');
  });
  it('should handle setting classes', () => {
    //const actual = studentSearchReducer(initialState, classUpdated('calculus'));
    //expect(actual.selectedClass).toEqual(['calculus']);
  });
  it('should filter students by search correctly', () => {
    //const actual = studentSearchReducer(initialState, searchUpdated('El'));
    //expect(actual).toEqual(5);
  });
  it('should filter classes by students correctly', () => {
    //const actual = studentSearchReducer(initialState, classUpdated('calculus'));
    //expect(actual.value).toEqual(5);
  });
  it('should filter students by selected classes correctly', () => {
    //const actual = studentSearchReducer(initialState, classUpdated('calculus'));
    //expect(actual.value).toEqual(5);
  });
});
