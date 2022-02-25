import { useMutation } from "react-query";

import { updateUserSettings } from "@src/api";
import { TpUserSettings } from "@src/types";

export const useUpdateUserSettings = () => {
  return useMutation(
    ({ user_id, params }: { user_id: number; params: TpUserSettings }) =>
      updateUserSettings(user_id, params)
  );
};

export default useUpdateUserSettings;
