import { myActionCreator } from "./action";

const myData = { hello: "there" };

const myActionData = {
  greeting: myData.hello
};

const doAction = arg => {
  const a = myActionCreator(myActionData);
  dispatch(a);
};

fetch("what").then(() => {
  doAction(arg);
});
