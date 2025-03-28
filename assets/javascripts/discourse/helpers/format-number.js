import { registerHelper } from "discourse/lib/helpers";

export default registerHelper("format-number", function (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
