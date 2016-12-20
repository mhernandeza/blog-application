import { Component, Input } from "@angular/core";

import * as PersistedDocument from "carbonldp/PersistedDocument";

import { UserService } from "./user.service";
import { User } from "./user";
import template from "./user.template.html!text";

@Component({
	selector:'app-user',
	template: template
})

export class UserComponent{

	constructor( private userService:UserService ){}
	
	@Input() private user:User & PersistedDocument.Class;

	private editingUser:boolean = false;
	private showingPosts:boolean = false;

	private editUser():void {
		this.editingUser = true;
	}

	private cancelEdit():void {
		this.editingUser = false;
	}

	private submitEdit( modifiedUser: User ):void {
		this.userService.editUser( this.user, modifiedUser );
		this.editingUser = false;
	}

	private deleteUser():void {
		this.userService.deleteUser( this.user );

	}

	private showPosts():void {
		this.showingPosts = true;
	}

	private hidePosts():void {
		this.showingPosts = false;
	}
}

export default UserComponent;