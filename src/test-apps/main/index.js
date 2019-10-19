import { myActionCreator, doMyAction } from "./action";

const boot = () => {
  const myData = { hello: "there" };

  const myActionData = {
    greeting: myData.hello
  };

  const moreActionData = transform(myActionData);

  doMyAction(myActionCreator(moreActionData));
};
