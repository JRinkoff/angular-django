import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {appRouting} from "./app.routing";

import {CoreModule} from "./core/core.module";
import {PagesModule} from "./pages/pages.module";
import {TimersModule} from "./timers/timers.module";
import {ToolsModule} from "./tools/tools.module";

import {BlogComponent} from "./blog/blog.component";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardService} from "./dashboard/dashboard.service";

import {SitemapComponent} from "./sitemap/sitemap.component";

import {FeedreaderComponent} from "./feedreader/feedreader.component";
import {FeedreaderService} from "./feedreader/feedreader.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        appRouting,
        CoreModule,
        PagesModule,
        TimersModule,
        ToolsModule,
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        FeedreaderComponent,
        SitemapComponent,
        BlogComponent,
    ],
    providers: [
        DashboardService,
        FeedreaderService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
