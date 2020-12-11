# TvShowsFan

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Roles

* Visitor
* Administrator
* User

## Getting Started

Demo of the project can be seen [HERE](https://tv-shows-fan.stackblitz.io). My account doesn't allow me to upload *.ico and *.png files, so favicon is not presented and home image is from web source. Also some of my css is not working correctly on that server.

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
* Angular animations
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

TV Shows

![Administrator TV Shows](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Admin_TV_Shows.png)


Add Show

![Administrator Add Show](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Admin_add_show.png)


TV Show details

![Administrator TV Show details](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Admin_details.png)


Edit TV Show

![Administrator Edit TV Show](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Admin_edit_show.png)


Users

![Administrator Users](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Admin_users.png)



* ***Registered user***

 Home

![User Home](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Home_logged.png)


 TV Shows

![User TV Shows](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/TV_Shows_user.png)


 Profile

![User Profile](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Profile.png)


 Details fan

![User Details fan](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Details_fan.png)


 Details not fan

![User Details not fan](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/Details_not_fan.png)



* ***Error page***

![User Home](https://github.com/astanchev/TV-Shows-Fan/blob/master/images/404.png)

## License

This project is licensed under the MIT License - see the [LICENSE.MD](LICENSE.MD) file for details

## Author

- [Atanas Stanchev](https://github.com/astanchev)
