import { myActionCreator, doMyAction } from "./action";

const myData = { hello: "there" };

const myActionData = {
  greeting: myData.hello
};

doMyAction(myActionCreator(myActionData));
