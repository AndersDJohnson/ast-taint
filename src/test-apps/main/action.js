const myActionCreator = payload => ({
  type: "MY_ACTION",
  payload
});

const doMyAction = action => dispatch(action);

export { myActionCreator, doMyAction };
