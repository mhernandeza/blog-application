import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";

import * as App from "carbonldp/App";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as Response from "carbonldp/HTTP/Response";
import * as Pointer from "carbonldp/Pointer";
import * as AccessPoint from "carbonldp/AccessPoint";
import * as PersistedAccessPoint from "carbonldp/PersistedAccessPoint";
import { AuthService }from "angular2-carbonldp/services";
import { User } from "app/users/user";
import { UserService } from "app/users/user.service";
import { Post } from "app/posts/post";
import { PostService } from "app/posts/post.service";
import template from "./secured.view.html!text";


@Component( {
	selector: "secured",
	template: template,
	styles: []
} )

export class SecuredView implements OnInit {

	// The App Context (only if you initialized the active context with an app slug!)
	constructor( private router:Router, private userService:UserService, private postService:PostService, @Inject( AuthService.Token ) private authService:AuthService.Class  ){}
	
 	private user:User;

 	ngOnInit():void {
		this.userService.getUserContext();
		this.postService.getPostContext();

	}

	private refreshUsers():void {
		this.userService.getUsers();
	}

	private refreshPosts():void {
		this.postService.getPosts();
	}

	private logout():void {
		this.authService.logout();
		this.router.navigate( [ "/home" ] );
	}

}

export default SecuredView;
