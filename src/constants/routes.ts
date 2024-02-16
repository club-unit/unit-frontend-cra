export const API_ROUTES = {
  token: { root: () => "/token/", refresh: () => "/token/refresh/" },
  users: {
    my: () => "/users/my/",
    signUp: () => "/users/sign-up/",
    changePassword: () => "/users/my/change-password/",
    changeProfilePhoto: () => "/users/my/change-profile-photo/",
    byId: (id: number) => `/users/${id}/`,
  },
  boards: {
    root: () => "/boards/",
    summary: () => "/boards/summary/",
  },
  posts: {
    bySlug: (slug: string) => `/boards/${slug}/posts/`,
    bySlugAndId: (slug: string, id: number) => `/boards/${slug}/posts/${id}/`,
    uploadImage: (slug: string) => `/boards/${slug}/posts/upload-image/`,
  },
  comments: {
    bySlugAndPostId: (slug: string, postId: number) => `/boards/${slug}/posts/${postId}/comments/`,
    bySlugAndPostIdAndId: (slug: string, postId: number, id: number) =>
      `/boards/${slug}/posts/${postId}/comments/${id}/`,
  },
  categories: {
    bySlug: (slug: string) => `/boards/${slug}/categories/`,
  },
  forms: {
    byId: (id: number) => `/forms/${id}/`,
    answerById: (id: number) => `/forms/${id}/answer/`,
  },
  notices: {
    root: () => "/notices/",
  },
  applications: {
    root: () => "/applications/",
    byId: (id: number) => `/applications/${id}/`,
  },
};
