import { Injectable, OnInit } from '@angular/core';

import { Post } from "./post";
import { User } from "../users/user";
import { UserService } from "../users/user.service";

import * as App from 'carbonldp/App';
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as Response from "carbonldp/HTTP/Response";
import * as AccessPoint from "carbonldp/AccessPoint";
import * as PersistedAccessPoint from "carbonldp/PersistedAccessPoint";


@Injectable()

export class PostService{

	constructor( private appContext:App.Context, private userService:UserService ){ }

	private persistedPosts:PersistedDocument.Class;
	protected posts:Post[] & PersistedDocument.Class[] = [];

	getPostContext():void {
		this.posts = [];

		this.appContext.extendObjectSchema("Post", {
			"title":{
				"@type": "string"
			},
			"content":{
				"@type": "string"
			},
			"authors":{
				"@type": "@id",
				"@container": "@set"
			}
		});

		this.appContext.documents.get<{}>("blog-posts/").then(
			( [ _persistedPosts, response ]:[ PersistedDocument.Class, Response.Class ] ) =>
			{
				this.persistedPosts = _persistedPosts;
				this.getPosts();
			}
		).catch( console.error );
	}

	createPost( post:Post ):void {
		let authors:(User & PersistedDocument.Class)[] = post.authors;
		post.authors = [];
		this.persistedPosts.createChild<Post>( post ).then(
			( [ _persistedPost, response ]:[ Post & PersistedDocument.Class, Response.Class ] ) =>
			{
				this.posts.push( _persistedPost );
				return _persistedPost.createAccessPoint({ 
					hasMemberRelation: "authors",
					isMemberOfRelation: "post"
				}, "authors" );
			}
		).then(
			( [ _persistedAccessPoint, response ]:[ PersistedAccessPoint.Class, Response.Class ] ) =>
			{
				return _persistedAccessPoint.addMembers( authors );
			}
		).then(
			( response:Response.Class ) =>
			{
				this.getPosts();
			} 
		).catch( console.error );
	}

	deletePost( post:Post & PersistedDocument.Class ):void {
		post.delete().then(
			( response:Response.Class )=>
			{
				this.getPosts();
			}
		).catch(console.error);
	}

	editPost( post: Post & PersistedDocument.Class, modifiedPost:Post ):void {
		post.refresh().then(
			( [ _persistedPost, response ]:[ Post & PersistedDocument.Class, Response.Class ] ) =>
			{
				if( post.title.valueOf() != modifiedPost.title.valueOf() ){
					post.title = modifiedPost.title;
				} 
				if( post.content.valueOf() != modifiedPost.content.valueOf() ){
					post.content = modifiedPost.content;
				}
				return post.save();
			}
		).then(
			( [ _persistedPost, response ]:[ Post & PersistedDocument.Class, Response.Class ] ) =>
			{
				return this.appContext.documents.removeAllMembers( post.id+"authors/" );
			}
		).then(
			( response:Response.Class ) =>
			{
				if( modifiedPost.authors.length > 0 ){
					return this.appContext.documents.addMembers( post.id+"authors/", modifiedPost.authors );
				}
			}
		).then(
			( response:Response.Class ) =>
			{
				this.getPosts();
			}
		).catch( console.error );
	}

	getPosts():void {
		this.posts = [];
		
		this.persistedPosts.getChildren<Post>().then(
			( [ _posts, response ]:[ Post[] & PersistedDocument.Class[], Response.Class ] ) =>
			{
				for( let post of _posts ){
					if(	post.authors === undefined ){
						post.authors = [];
					}
				}
				
				this.posts = _posts;
				this.posts.sort(
					( postA: Post & PersistedDocument.Class, postB:Post & PersistedDocument.Class) =>
					{
						return - ( postA.created.getMilliseconds() - postB.created.getMilliseconds() );
					}
				);
			}
		).catch( console.error );
	}
}
