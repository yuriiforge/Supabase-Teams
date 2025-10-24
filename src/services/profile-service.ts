import { axiosClient } from "../config/axios-client";
import { EDGE_FUNCTIONS_NAMES } from "../lib/constants/edge-functions-names";
import type { Profile } from "../lib/types/profile";
import { handleRequestError } from "../lib/utils/handleRequestError";

class ProfileService {
    constructor() {}

    async getProfile(): Promise<Profile> {
        try {
            const response = await axiosClient.get(
                EDGE_FUNCTIONS_NAMES.GET_PROFILE,
            );

            return response.data;
        } catch (err) {
            handleRequestError(err);
        }
    }
}

export const profileService = new ProfileService();
