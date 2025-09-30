export const API_ROUTES = {
  token: { root: () => "/token/", refresh: () => "/token/refresh/" },
  users: {
    my: () => "/v2/users/my/",
    signUp: () => "/v2/users/sign-up/",
    changePassword: () => "/v2/users/my/change-password/",
    updateProfilePhoto: () => "/v2/users/my/update-profile-photo/",
    byId: (id: number) => `/v2/users/${id}/`,
  },
  boards: {
    root: () => "/v2/boards/",
  },
  posts: {
    bySlug: (slug: string) => `/v2/boards/${slug}/posts/`,
    summary: (slug: string) => `/v2/boards/${slug}/posts/summary/`,
    bySlugAndId: (slug: string, id: number) => `/v2/boards/${slug}/posts/${id}/`,
    uploadImage: (slug: string) => `v2/boards/${slug}/posts/upload-image/`,
  },
  comments: {
    bySlugAndPostId: (slug: string, postId: number) =>
      `/v2/boards/${slug}/posts/${postId}/comments/`,
    bySlugAndPostIdAndId: (slug: string, postId: number, id: number) =>
      `/v2/boards/${slug}/posts/${postId}/comments/${id}/`,
  },
  categories: {
    bySlug: (slug: string) => `/v2/boards/${slug}/categories/`,
  },
  forms: {
    byId: (id: number) => `/v2/forms/${id}/`,
    answerById: (id: number) => `/v2/forms/${id}/answers/`,
  },
  notices: {
    root: () => "/v2/notices/",
  },
  applications: {
    root: () => "/v2/applications/",
    byId: (id: number) => `/v2/applications/${id}/`,
  },
  webNotifications: {
    root: () => "/v2/web-notifications/",
    numUnreads: () => "/v2/web-notifications/num-unreads/",
  },
  notifications: {
    readAll: () => "/v2/notifications/read/",
    readById: (id: number) => `/v2/notifications/${id}/read/`,
  },
  bowling: {
    records: () => "/v2/bowling/records/",
    record: () => "/v2/bowling/records/record",
  },
};
