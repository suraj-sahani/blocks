"use server";

import { authClient } from "../auth/client";
import { logger } from "../pino/server";
import { ServerActionResponse, SignUpSchema } from "../types";

export const signUpDb = async (
  data: SignUpSchema
): Promise<
  | {
      success: true;
      message: string;
      data: any;
    }
  | { success: false; error: string }
> => {
  try {
    const { email, password, fullName } = data;
    const user = await authClient.signUp.email({
      email,
      password,
      name: fullName,
    });

    if (user.error) {
      logger.error(user);
      return {
        success: false,
        error:
          user.error.message ||
          `Sign up failed with status code: ${user.error.status}`,
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
