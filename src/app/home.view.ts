import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";

import { AuthService } from "angular2-carbonldp/services";

import { UserService } from "./users/user.service";
import { User } from "./users/user";
import template from "./home.view.html!text"

@Component( {
	selector: "home",
	template: template,
	styles: [],
} )

export class HomeView {
	constructor( private router:Router, @Inject( AuthService.Token ) private authService:AuthService.Class, private userService:UserService ) {}

	private signUp:boolean = false;

	private login( username:string, password:string ):void {
		this.authService.login( username, password, false ).then( ( credentials ) => {
			console.log( credentials.agent.id );
			this.userService.loggedUser = new User( credentials.agent.name );
			this.router.navigate( [ "/secured" ] );
		} );
	}

	private logout():void {
		this.authService.logout();
	}

	private signup(name:string, email:string, password:string, contributor:boolean){
		if( !contributor ){
			contributor = false;
		}
		this.userService.signup( name, email, password, contributor );
		this.signUp = false;
	}

	private toggleSignUp(){
		this.signUp = !this.signUp;
	}
}

export default HomeView;
