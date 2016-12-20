import { Component, Input } from "@angular/core";

import * as PersistedDocument from "carbonldp/PersistedDocument";
import { Post } from "./post";
import { PostService } from "./post.service";
import template from "./post.template.html!text";

@Component({
	selector: "app-post",
	template: template

})

export class PostComponent{
	@Input() private post:Post & PersistedDocument.Class;
	private modifiedPost:Post = new Post( "", "", [] );

	constructor( private postService:PostService ){}

	private editingPost:boolean = false;

	private editPost():void {
		this.modifiedPost.title = this.post.title;
		this.modifiedPost.content = this.post.content;
		this.modifiedPost.authors = this.post.authors;
		this.editingPost = true;
	}

	private submitEdit( modifiedPost:Post ):void {
		this.postService.editPost( this.post, modifiedPost );
		this.editingPost = false;
	}

	private cancelEdit():void {
		this.editingPost = false;
	}

	private deletePost():void {
		this.postService.deletePost( this.post );
	}

}

export default PostComponent;