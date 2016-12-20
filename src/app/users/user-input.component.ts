import { Component } from "@angular/core";

import { UserService } from "./user.service";
import { User } from "./user";
import template from "./user-input.template.html!text";

@Component({
	selector:'app-user-input',
	template: template
})

export class UserInputComponent{

	constructor( private userService:UserService ){}
	editingUser:boolean = false;

	private createUser( name:string ):void {
		if( name != null || name != "" ){
			this.userService.createUser( new User( name ) );
		} else{
			alert( "Invalid name to register a user." );
		}
	}
}

export default UserInputComponent;