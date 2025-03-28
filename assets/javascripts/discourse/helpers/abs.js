import { registerHelper } from "discourse/lib/helpers";

export default registerHelper("abs", function (number) {
  return Math.abs(Number(number));
});
