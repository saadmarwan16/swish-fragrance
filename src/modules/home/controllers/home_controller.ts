import { makeAutoObservable } from "mobx";
import { HOME_TAB_WEEKLY } from "../../../shared/constants/strings";

export class HomeController {
  tab = HOME_TAB_WEEKLY;

  constructor() {
    makeAutoObservable(this);
  }

  updateTab = (value: string) => (this.tab = value);
}

const homeController = new HomeController();
export default homeController;
