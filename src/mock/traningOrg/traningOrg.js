import  Mock  from 'mockjs';
import database from "../../utils/traningOrg/traningOrg.js";
Mock.mock(/\/apis\/api\/TIGZ\/GetTrainingInstitutionUsers/,"get",database.buildBankInfo);