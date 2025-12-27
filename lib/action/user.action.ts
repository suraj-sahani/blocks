"use server";

import { signUp } from "../auth-client";
import { logger } from "../pino/server";
import { SignUpSchema } from "../types";

const log = logger.child({ module: "totoro" });

export const signUpDb = async (data: SignUpSchema) => {
  try {
    const { email, password, firstName, lastName } = data;
    const user = await signUp.email({
      email,
      password,
      name: firstName + lastName,
    });

    if (user.error) {
      logger.error(user);
      return {
        success: false,
        error: user.error.message,
      };
    }

    return {
      success: true,
      message: "User signed up successfully.",
      data: user,
    };
  } catch (error) {
    logger.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not sign up user.",
    };
  }
};
