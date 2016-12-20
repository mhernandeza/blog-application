import { Injectable, OnInit } from '@angular/core';

import * as App from 'carbonldp/App';
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as Response from "carbonldp/HTTP/Response";
import * as AccessPoint from "carbonldp/AccessPoint";
import * as PersistedAccessPoint from "carbonldp/PersistedAccessPoint";
import * as Auth from "carbonldp/Auth";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import * as CS from "carbonldp/NS/CS";


import { User } from "./user";

@Injectable()

export class UserService {

	constructor( private appContext:App.Context ){ }

	private persistedUsers:PersistedDocument.Class;
	private contributorsRole:PersistedRole.Class;
	public loggedUser:User = new User ("");
	protected users:User[] & PersistedDocument.Class[] = [];

	getUserContext():void {
		this.appContext.extendObjectSchema("User", {
			"name": {
			"@type": "string"
			},
			"post":{
			"@container": "@set",
			"@type": "@id"
			}
		});


		this.appContext.documents.get<{}>( "blog-users/" )
		.then(
			( [ _persistedUsers, response ]:[ PersistedDocument.Class, Response.Class ] ) => 
			{
				this.persistedUsers = _persistedUsers;
				this.getUsers();
				return this.appContext.auth.roles.get( "contributors/" );
			}
			).then(
			( [ _contributorsRole, response ]:[ PersistedRole.Class, Response.Class ] ) =>
			{
				this.contributorsRole = _contributorsRole;
			}
		).catch( console.error );
	}

	createUser( user:User ):void {
		this.persistedUsers.createChild<User>( user ).then(
			( [ _persistedUser, response ]:[ User & PersistedDocument.Class, Response.Class ] ) =>
			{
				this.users.push( _persistedUser );
				console.log( _persistedUser );
				this.getUsers();
			}
		).catch( console.error ); 
	}

	editUser( user: User & PersistedDocument.Class, modifiedUser:User ):void {
		user.refresh().then(
			( [ _persistedUser, response ]:[ User & PersistedDocument.Class, Response.Class ] ) =>
			{
				user.name = modifiedUser.name;
				return user.save();
			}
		).then(
			( [ _persistedUser, response ]:[ User & PersistedDocument.Class, Response.Class ] ) =>
			{
				this.getUsers();
			}
		).catch( console.error );
	}

	deleteUser( user:User & PersistedDocument.Class ):void {
		user.delete().then(
		( response:Response.Class ) =>
		{
			this.getUsers();
		}
		).catch( console.error );
	}

	getUsers():void {
		this.persistedUsers.getChildren<User>().then(
			( [ _persistedUsers, response ]:[ User[] & PersistedDocument.Class[], Response.Class ] ) =>
			{
				this.users = _persistedUsers;
				for( let user of this.users ){
					if( user.post === undefined ){
						user.post = [];
					}
				}
				this.users.sort(( userA:User&PersistedDocument.Class, userB:User & PersistedDocument.Class ) =>
				{
					return - ( userA.created.getMilliseconds() - userB.created.getMilliseconds() );
				});
			}
		).catch( console.error );
	}

	signup(name:string, email:string, password:string, contributor:boolean):void {
		let agent:Auth.Agent.Class = Auth.Agent.Factory.create( name, email, password );
		this.appContext.auth.agents.register( agent ).then(
			( [ _persistedAgent, response ]:[ PersistedDocument.Class, Response.Class ] ) =>
			{
				if( contributor ){
					this.contributorsRole.addAgent( _persistedAgent );
				}
				this.appContext.auth.agents.delete( _persistedAgent.id );
			}
		).catch( console.error );
	}
}

export default UserService;