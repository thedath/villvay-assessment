export const POST_SET_POST_LIST = 'post-list'
export const POST_SET_ERROR = 'post-error'
export const POST_SET_PROCESSING = 'post-processing'
export const POST_MOVE = 'post-moving'
export const POST_TRAVEL_THROUGH_TIME = 'post-time-travel'

export const saveClassified = (title, post) => async (dispatch) => {
  // dispatch({ type: POST_SET_PROCESSING })
  // try {
  //   await Axios.get('https://jsonplaceholder.typicode.com/posts')
  //   .then(response => {
  //     // check whether the response is an arra prior to do array slice
  //     let posts = [];
  //     if (response.data && Array.isArray(response.data)) {
  //       posts = response.data.slice(0, limit);
  //       dispatch({ type: POST_SET_POST_LIST, payload: posts })
  //     } else {
  //       dispatch({ type: POST_SET_ERROR, payload: "Invalid response from server xxx" })
  //     }
  //   })
  //   .catch(error => {
  //     dispatch({ type: POST_SET_ERROR, payload: "Request failed or invalid response" })
  //   })
  // } catch (error) {
  //   dispatch({ type: POST_SET_ERROR, payload: "Unable perform post fetch call" })
  // }
}
