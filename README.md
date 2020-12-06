# TvShowsFan

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Roles

* Visitor
* Administrator
* User

## Getting Started

Site guest (**visitor**)
* can only visit Info pages (*Home*, *About*, *Register*, *Login*)

Every user has to register and log in with username and password.


**Administrator** - created from site owner
* See all tv-shows
* See tv-show details
* Add tv-show
* Edit tv-show
* Delete tv-show
* Can not vote for tv-show or comment
* Can not delete comment
* Can see some of user details
* Can allow or ban user to comment tv-shows


**User** - register
* See all tv-shows
* See tv-show details
* Can vote only once for tv-show
* Can join or leave tv-show fan group
* Can comment tv-show - if is member of tv-show fan group and is not banned to comment
* Can vote only once for comment
* Can delete own comments
* Can see own profile and make corrections(to password too), but only with correct password


## Used techniques and libraries
* Angular Material
* Ngx-pagination
* Reactive forms
* Template forms
* CanActivate guards
* CanLoad guards
* Lazy loading
* Interceptors
* Error handling
* Custom form validators
* Custom 404 page
* Backendless as BaaS
* RxJS

## Error page
***404 Page*** by Arne Turpyn - https://codepen.io/turpoint

## Pictures

* ***Unregistered user***

Home

![Unregistered user Home](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Home_not_logged.png)


About

![Unregistered user About](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/About_not_logged.png)


Login

![Unregistered user Login](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Login.png)


Register

![Unregistered user Register](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Register.png)


* ***Administrator***

![Administrator](https://github.com/astanchev/...png)


* ***Registered user***

![User Home](https://github.com/astanchev/...png)

* ***Error page***

![User Home](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/404.png)

## License

This project is licensed under the MIT License - see the [LICENSE.MD](LICENSE.MD) file for details

## Author

- [Atanas Stanchev](https://github.com/astanchev)
