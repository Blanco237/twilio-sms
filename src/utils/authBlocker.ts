import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import appConstants from "./contants";

const authBlocker = (router: AppRouterInstance) => {
  const isAuthenticated = Boolean(
    localStorage.getItem(appConstants.STORAGE_KEYS.AUTH),
  );
  if (!isAuthenticated) {
    router?.push("/");
  }
};

export default authBlocker;
