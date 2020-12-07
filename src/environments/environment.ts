// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendless: {
    url: `https://api.backendless.com/69D30B99-D983-F37F-FF81-22671C5F2B00/9BB6B40C-50C8-47F3-BF2D-2B653DA13F2A/`,
    endpoints: {
      register: 'users/register',
      login: 'users/login',
      logout: 'users/logout',
      userRoles: 'users/userroles',
      user: 'data/Users',
      updateUser: 'users',
      tvshow: 'data/tvshow',
      comment: 'data/comment',
      relatedComments: '?loadRelations=comments',
      countComments: 'data/comment/count',
      countTVShows: 'data/tvshow/count',
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
