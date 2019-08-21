import { myActionCreator } from "./action";

const myData = { hello: "there" };

const myActionData = {
  greeting: myData.hello
};

dispatch(myActionCreator(myActionData));
