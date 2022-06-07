import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAuth from "hooks/useAuth";


export function useArticle(slug) {

    const { authToken, isLoggedIn } = useAuth();
    const queryClient = useQueryClient();

    
    const header = isLoggedIn ? {
        authorization: `Token ${authToken}`, // so we only pass the authorization header when we are logged in
    } : {};

    /**
    * fetches the article.
    */
    const articleQuery = useQuery(["article", slug], async () => {
        if (slug == null) {
            return null;
        }

        return axios(`/api/articles/${slug}`, {
            method: "get",
            headers: header,
        }).then((res) => {
            return res.data.article;
        });
    });

    /**
    * fetches the article's comments.
    */
    const commentsQuery = useQuery(["comments", slug], async () => {
        if (slug == null) {
            return null;
        }

        return axios(`/api/articles/${slug}/comments`, {
            method: "get",
            headers: header,
        }).then((res) => {
            return res.data.comments;
        });
    });

    /**
    * favorites the article.
    */
    const favoriteArticleMutation = useMutation(
        async () => {
            return axios(`/api/articles/${slug}/favorite`, {
                method: "post",
                headers: {
                    authorization: `Token ${authToken}`,
                },
            }).then((res) => {
                return res.data.article;
            });
        },
        {
            onSuccess: (data) => {
                // Replace the data with the updated response after mutating.
                queryClient.setQueryData(["article", slug], data);
            },
        }
    );


    /**
     * unfavorites the article.
     */
    const unfavoriteArticleMutation = useMutation(
        async () => {
            return axios(`/api/articles/${slug}/favorite`, {
                method: "delete",
                headers: {
                    authorization: `Token ${authToken}`,
                },
            }).then((res) => {
                return res.data.article;
            });
        },
        {
            onSuccess: (data) => {
                // Replace the data with the updated response after mutating.
                queryClient.setQueryData(["article", slug], data);
            },
        }
    );



    /**
     * comments on the article.
     */
    const commentArticleMutation = useMutation(
        async (data) => {
            return axios(`/api/articles/${slug}/comments`, {
                method: "post",
                headers: {
                    authorization: `Token ${authToken}`,
                },
                data: {
                    comment: {
                        body: data
                    }
                },
            }).then((res) => {


                //console.log(JSON.stringify(res.data.comment));

                return res.data.comment;
            });
        }
    );

    /**
     * deletes a comment
     */
    const deleteCommentMutation = useMutation(
        async (id) => {
            return axios(`/api/articles/${slug}/comments/${id}`, {
                method: "delete",
                headers: {
                    authorization: `Token ${authToken}`,
                },
            }).then((res) => {
                return res.data;
            });
        },
        {
            onSuccess: () => {
                //queryClient.invalidateQueries(["comments", ""]);
            },
        }
    );



    /**
     * creates an article.
     */
    const createArticleMutation = useMutation(
        async (data) => {
            return axios(`/api/articles`, {
                method: "post",
                headers: {
                    authorization: `Token ${authToken}`,
                },
                data: {
                    article: {
                        title: data.title,
                        description: data.description,
                        body: data.body,
                        tagList: data.tagList,
                    }
                },
            }).then((res) => {
                return res.data.article;
            });
        }
    );

    /**
    * updates an article.
    */
    const editArticleMutation = useMutation(
        async (data) => {
            return axios(`/api/articles/${slug}`, {
                method: "put",
                headers: {
                    authorization: `Token ${authToken}`,
                },
                data: {
                    article: {
                        title: data.title,
                        description: data.description,
                        body: data.body,
                    }
                }
            }).then((res) => {
                return res.data.article;
            });
        },
        {
            onSuccess: (data) => {
                // Replace the data with the updated response after mutating.
                //queryClient.setQueryData(["article", slug], data);
            },
        }
    );

    /**
    * updates an article.
    */
    const deleteArticleMutation = useMutation(
        async () => {
            return axios(`/api/articles/${slug}`, {
                method: "delete",
                headers: {
                    authorization: `Token ${authToken}`,
                },

            }).then((res) => {
                return res.data;
            });
        },
        {
            onSuccess: (data) => {
                // Replace the data with the updated response after mutating.
                //queryClient.setQueryData(["article", slug], data);
            },
        }
    );


    return {
        articleQuery,
        commentsQuery,
        favoriteArticleMutation,
        unfavoriteArticleMutation,
        commentArticleMutation,
        deleteCommentMutation,
        createArticleMutation,
        editArticleMutation,
        deleteArticleMutation,
    };


}