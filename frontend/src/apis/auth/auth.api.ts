//ler: https://kentcdodds.com/blog/using-fetch-with-type-script
// ler: https://medium.com/@zamin_mirzad/safe-data-fetching-and-improving-error-handling-with-fetch-api-in-modern-javascript-f0e1347d2099

import { IAuthRegister } from "../../interfaces/IAuthRegister";
import { requestConfig, baseURL } from "../../utils/config";
import { IAuthLogin } from "../../interfaces/IAuthLogin";
import { IAuthResponse } from "./models/IAuthResponse";
import { IAPIErrorResponse } from "../../interfaces/IAPIErrorResponse";

export interface IAuthApi {
  register(data: IAuthRegister): Promise<IAuthResponse>;
  login(data: IAuthLogin): Promise<IAuthResponse>;
}

export class AuthApiImpl implements IAuthApi {
  async login(data: IAuthLogin): Promise<IAuthResponse> {
    const config = requestConfig("POST", data);

    const res = await fetch(baseURL + "/auth/signin", config);

    const json: IAuthResponse | IAPIErrorResponse = await res.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

    return json;
  }

  async register(data: IAuthRegister): Promise<IAuthResponse> {
    const config = requestConfig("POST", data);

    const res = await fetch(baseURL + "/auth/signup", config);

    const json: IAuthResponse | IAPIErrorResponse = await res.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

    return json;
  }
}
