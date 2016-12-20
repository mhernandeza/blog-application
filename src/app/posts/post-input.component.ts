import { Component } from "@angular/core";

import { PostService } from "./post.service";
import { Post } from "./post";
import { UserService } from "../users/user.service";
import { User } from "../users/user";  
import template from "./post-input.template.html!text";
import * as PersistedDocument from "carbonldp/PersistedDocument";

@Component({
	selector:'app-post-input',
	template: template
})

export class PostInputComponent{

	constructor( private postService:PostService, private userService:UserService ){}

	private post:Post = new Post( null, null, [] );

	private createPost( title:string, content:string ):void {
		this.post.title = title;
		this.post.content = content;
		this.postService.createPost( this.post );
		this.post = new Post( null, null, [] );
	}

	private addAuthor( user:User & PersistedDocument.Class ):void {
		// TODO - Check author duplicates.
		this.post.authors.push( user );
	}

	private isAuthor( user:User ):boolean | any {
		return this.post.authors.find ( element => element === user );
	}

	private removeAuthor( user:User ):void {
		let index = this.post.authors.findIndex( element => element === user );
		this.post.authors.splice(index, 1);
	}
	
}

export default PostInputComponent;