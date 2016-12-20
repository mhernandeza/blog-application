import { Post } from "../posts/post";
import * as PersistedDocument from "carbonldp/PersistedDocument";

export class User{
	
	name: string;
	post: ( Post & PersistedDocument.Class )[];
	types: string[];

	constructor( name:string ){
		this.name = name;	
		this.post = [];
		this.types = [ "User" ];
	}
}

