// Imports
import bcrypt from "bcrypt";
import React from "react";

// App Imports
import { SECURITY_SALT_ROUNDS } from "../../setup/config/env";
import params from "../../setup/config/params";
import { authCheck } from "../../setup/helpers/utils";
import v from "../../setup/helpers/validation";
import User from "./model";
import { userAuthResponse } from "./query";

// Email
import { send as sendEmail } from "../email/send";
import Signup from "./email/Signup";

// Create
export async function userSignup({
  params: { name, email, password, passwordRepeat },
  translate,
}) {
  // Validation rules
  const rules = [
      data: { value:name, length}
  ];
}
