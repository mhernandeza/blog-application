import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";  
import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { CARBON_PROVIDERS } from "angular2-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS } from "angular2-carbonldp/services";

import { URL_BASE } from "app/config";

import { routing, appRoutingProviders } from "app/app.routing";
import { AppComponent } from "app/app.component";
import { HomeView } from "app/home.view";
import { LoginView } from "app/login.view";
import { SecuredView } from "app/secured.view";
import { ErrorView } from "app/error.view";

import { BackgroundVideoComponent } from "app/background-video.component";
import { UserService } from "app/users/user.service";
import { PostService } from "app/posts/post.service";
import { UserComponent } from "app/users/user.component";
import { PostComponent } from "app/posts/post.component";
import { UserInputComponent } from "app/users/user-input.component";
import { PostInputComponent } from "app/posts/post-input.component";
import { UserEditComponent } from "app/users/user-edit.component";
import { PostEditComponent } from "app/posts/post-edit.component";

@NgModule( {
	imports: [
		BrowserModule,
		routing,
		FormsModule
	],
	declarations: [
		AppComponent,
		HomeView,
		LoginView,
		SecuredView,
		ErrorView,
		UserComponent,
		PostComponent,
		UserInputComponent,
		PostInputComponent,
		UserEditComponent,
		PostEditComponent,
		
		BackgroundVideoComponent,
	],
	providers: [
		appRoutingProviders,
		{
			provide: APP_BASE_HREF,
			useValue: URL_BASE
		},
		CARBON_PROVIDERS,
		CARBON_SERVICES_PROVIDERS,
		UserService,
		PostService
	],
	bootstrap: [ AppComponent ],
} )
export class AppModule {
}