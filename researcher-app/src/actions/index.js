import axios from "axios";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const FETCH_CARDS_START = "FETCH_CARDS_START";
export const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS";
export const FETCH_CARDS_FAILURE = "FETCH_CARDS_FAILURE";

export const ADD_CARD_START = "ADD_CARD_START";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";
export const ADD_CARD_FAILURE = "ADD_CARD_FAILURE";

export const UPDATE_CARDS_START = "UPDATE_CARDS_START";
export const UPDATE_CARDS_SUCCESS = "UPDATE_CARDS_SUCCESS";
export const UPDATE_CARDS_FAILURE = "UPDATE_CARDS_FAILURE";

export const DELETE_CARD_START = "DELETE_CARD_START";
export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export const DELETE_CARD_FAILURE = "DELETE_CARD_FAILURE";

export const FETCH_CATEGORY_START = "FETCH_CATEGORY_START";
export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS";
export const FETCH_CATEGORY_FAILURE = "FETCH_CATEGORY_FAILURE";

export const ADD_CATEGORY_START = "ADD_CATEGORY_START";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_FAILURE = "ADD_CATEGORY_FAILURE";

export const UPDATE_CARD_START = "UPDATE_CARD_START";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";

export const RESET_ERROR_MESSAGES = 'RESET_ERROR_MESSAGES';
export const LOGOUT = "LOGOUT";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const TOGGLE_CATS = "TOGGLE_CATS";


export const resetErrors = () => dispatch => {
  dispatch({ type: RESET_ERROR_MESSAGES});
}


export const toggleCats = () => dispatch => {
  dispatch({ type: TOGGLE_CATS});
}


export const updateCategory = (new_cat) => dispatch => {
  dispatch({ type: UPDATE_CATEGORY, payload: new_cat });
}


export const login = (creds, history) => dispatch => {
  dispatch({ type: LOGIN_START });

  return axios
    .post("https://moderndayresearcher.herokuapp.com/users/login", creds)
    .then(res => {
      console.log('results from axios login post:');
      console.log(res);
      localStorage.setItem("token", res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.user[0] });
      history.push('/');
    })
    .catch(err => {
      console.log("login err: ", err);
      /*
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        dispatch({ type: LOGOUT });
      }
      */
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data.message });
    });
};


export const logout = (history) => dispatch => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
  history.push('/');
};


export const register = (creds, history) => dispatch => {
  dispatch({ type: REGISTER_START });

  return axios
    .post("https://moderndayresearcher.herokuapp.com/users/register", creds)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch({ type: REGISTER_SUCCESS });
      history.push("/login")
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAILURE, payload: err.response.data.message });
    });
};



export const getCards = (user_id) => dispatch => {
  dispatch({ type: FETCH_CARDS_START });
  axios
    .get(`https://moderndayresearcher.herokuapp.com/cards/users/${user_id}`, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      console.log('action getCards res:', res);
      dispatch({
        type: FETCH_CARDS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('action getCards err.response:', err);
      /*
      if (err.response.status === 401) {
        localStorage.removeItem("token");
        dispatch({ type: LOGOUT });
      }
      */
      dispatch({ type: FETCH_CARDS_FAILURE, payload: err });
    });
};


export const addCard = (card, history) => dispatch => {
  console.log('entering addCard');
  dispatch({ type: ADD_CARD_START });
  axios
    .post('https://moderndayresearcher.herokuapp.com/cards/users/', card, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      console.log('action addCard res:', res);
      dispatch({
        type: ADD_CARD_SUCCESS,
        payload: res.data
      });
      history.push('/');
    })
    .catch(err => {
      console.log('action addCard err:', err);
      /*
      if (err.response.status === 401) {
        localStorage.removeItem("token");
        dispatch({ type: LOGOUT });
      }
      */
      dispatch({ type: ADD_CARD_FAILURE, payload: err });
    });
};


export const deleteCard = card_id => dispatch => {
  dispatch({
    type: DELETE_CARD_START
  });
  axios
     .delete(`https://moderndayresearcher.herokuapp.com/cards/${card_id}`, {
        headers: { Authorization: localStorage.getItem("token") }
    })
     .then(res => {
      console.log("Card deleted");
      console.log(res);
      dispatch({
        type: DELETE_CARD_SUCCESS,
        payload: card_id
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_CARD_FAILURE,
        payload: err
      })
    });
};

export const updateCard = (card, history) => dispatch => {
  dispatch({
    type: UPDATE_CARD_START
  });
  axios
     .put(`https://moderndayresearcher.herokuapp.com/cards/${card.id}`, card, {
        headers: { Authorization: localStorage.getItem("token") }
    })
     .then(res => {
      console.log("Card updated");
      console.log(res);
      dispatch({
        type: UPDATE_CARD_SUCCESS,
        payload: card
      });
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: UPDATE_CARD_FAILURE,
        payload: err
      })
    });
};
