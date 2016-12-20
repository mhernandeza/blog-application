import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as PersistedDocument from "carbonldp/PersistedDocument";

import { Post } from "./post";
import { User } from "../users/user";
import { UserService } from "../users/user.service";
import template from "./post-edit.template.html!text";


@Component({
	selector: "app-post-edit",
	template: template

})

export class PostEditComponent{
	
	constructor( private userService:UserService ){}

	@Input() private post:Post;
	@Output() private editFinished = new EventEmitter<Post>();
	@Output() private editCancelled = new EventEmitter<any>();

	private submitEdit( postTitle:string, postText:string ):void {
		
		if( postTitle != undefined && postTitle.valueOf() != "" ){
			this.post.title = postTitle;
		} 
		if( postText != undefined  && postText.valueOf() != "" ){
			this.post.content = postText;
		}
		this.editFinished.emit( this.post );
	}

	private isAuthor( user:User&PersistedDocument.Class ):boolean | any {
		return this.post.authors.find( ( element => element === user ) );
	}

	private addAuthor( user:User & PersistedDocument.Class ):void {
		this.post.authors.push( user );
	} 

	private removeAuthor( user:User & PersistedDocument.Class ):void {
		let index:number = this.post.authors.findIndex( element => element === user );
		this.post.authors.splice( index, 1 );
	}

	private cancelEdit():void {
		this.editCancelled.emit();
	}



}

export default PostEditComponent;