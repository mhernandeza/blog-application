import { User } from '../users/user';
import * as PersistedDocument from "carbonldp/PersistedDocument";

export class Post{
	
	title: string;
	content: string;
	authors: ( User & PersistedDocument.Class )[];
	types: string[];
	
	constructor( title:string, content:string, authors:(User & PersistedDocument.Class) [] ){
		this.title = title;
		this.content = content;
		this.authors = authors;	
		this.types= [ "Post" ];
	}
}
