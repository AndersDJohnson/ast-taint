import { myActionCreator, doMyAction } from "./action";

const boot = (env, flag, short) => {
  const myData = { hello: env.args.hello, flag: flag, short };

  const myActionData = {
    greeting: myData.hello
  };

  const hello = myActionData.greeting;

  console.log(hello);

  const moreActionData = transform(myActionData);

  doMyAction(myActionCreator(moreActionData));
};
