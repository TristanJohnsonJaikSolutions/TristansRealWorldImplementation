import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAuth from "hooks/useAuth";


export function useUser() {

    const { authToken, isLoggedIn } = useAuth();
    const queryClient = useQueryClient();

    /**
     * fetches user
     */
    const userQuery = useQuery(["user"], () => {
        return axios("/api/user", {
            method: "get",
            headers: {
                authorization: `Token ${authToken}`,
            },
        }).then((res) => {
            return res.data.user;
        });
    });

    /**
     * updates settings
     */
    const updateUserMutation = useMutation(
        async (data) => {
            return axios(`/api/user`, {
                method: "put",
                headers: {
                    authorization: `Token ${authToken}`,
                },
                data: {
                    user: data,
                }
            }).then((res) => {
                return res.data.user;
            });
        },
        {
            onSuccess: (data) => {
                // Replace the data with the updated response after mutating.
                queryClient.setQueryData(["user"], data);
            },
        }
    );


    return {
        userQuery,
        updateUserMutation,
    };


}