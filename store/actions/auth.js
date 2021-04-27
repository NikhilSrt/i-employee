import AsyncStorage from '@react-native-community/async-storage'


export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQF8-AXzuTo_hxQz2FW3biOfGNLDvT4N4',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_EXISTS') {
          message = 'This email exists already!';
        }
        throw new Error(message);
    }

    const resData = await response.json();
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.email });
  };
};

export const login = (email, password) => {
    return async (dispatch, getState) => {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQF8-AXzuTo_hxQz2FW3biOfGNLDvT4N4',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );
  
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_NOT_FOUND') {
          message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
          message = 'This password is not valid!';
        }
        throw new Error(message);
      }
  
      const resData = await response.json();
      dispatch({ type: LOGIN, token: resData.idToken, userId: resData.email  });

      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 10000
      );
      saveDataToStorage(resData.idToken, resData.email, expirationDate);
    };
  };

  export const logout = () => {
    return { type: LOGOUT }
  };

  const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
      })
    );
  };

  


 

