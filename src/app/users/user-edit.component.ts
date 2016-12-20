import { Component, EventEmitter, Output, Input } from "@angular/core";
import * as PersistedDocument from "carbonldp/PersistedDocument";

import { User } from "./user";
import { UserService } from "./user.service";
import template from "./user-edit.template.html!text";

@Component({
	selector: "app-user-edit",
	template: template
})

export class UserEditComponent{

	constructor ( private userService:UserService ){}
	
	@Input() private user:User;
	@Output() private editFinished = new EventEmitter<User>();
	@Output() private editCancelled = new EventEmitter<any>();

	private cancelEdit():void {
		this.editCancelled.emit();
	}

	private submitEdit( name:string ):void {
		this.user.name = name;
		this.editFinished.emit( this.user );
	}


}

export default UserEditComponent;