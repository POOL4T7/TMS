import IndustryService from "./services/Industry.service";
import Data from "./utils/Data";

async function addIndustryListToDB() {
  try {
    await IndustryService.createManyIndustry(Data.IndustryList);
  } catch (e: any) {
    console.log(e);
  }
}

addIndustryListToDB();
