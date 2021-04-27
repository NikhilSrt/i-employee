export const  SET_PROFILEDATA  = 'SET_PROFILEDATA'


export const fetchProfileData = () => {
    return async dispatch => {
    try {
        const responses = await fetch(`https://i-employee-default-rtdb.firebaseio.com/employee.json`);

            const resData = await responses.json();
            const loadedProfiles = [];
            for ( const key in resData ) {
                loadedProfiles.push(
                    {
                        id : key,
                        Name: resData[key].Name,   
                        Post: resData[key].Post,  
                        Joined: resData[key].Joined,  
                        Hometown: resData[key].Hometown, 
                        Email: resData[key].Email,  
                        Dp: resData[key].Dp,
                        College: resData[key].College, 
                        Bio: resData[key].Bio, 
                    }
               )
            }
        dispatch({ type: SET_PROFILEDATA, LoadedProfiles: loadedProfiles })
        } catch (err) {
        console.log(error);
           throw err;
        }
    }
}