import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Dashboard} from './dashboard';
import {DashboardService} from './dashboard.service';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {Footer} from "../core/footer/footer";

import {rootTitle, adminBreadcrumb} from "../app.settings";
import {toDateTimeString} from "../utilities";

export const dashboardTitle: string = 'Dashboard';
export const dashboardUrl: string = '/dashboard';

@Component({
    selector: 'ad-dashboard',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div *ngIf="dashboard" id="content">
                <h1>Status <span style="font-size: small;">at {{dashboard.timeChecked}}</span></h1>
                <div style="width: 47%; float: left; padding-bottom: 1em; word-wrap: break-word;">
                    <p *ngIf="dashboard.hostname"><strong>Hostname:</strong> {{dashboard.hostname}}</p>
                    <h2>Settings Flags</h2>
                    <span *ngFor="let flag of dashboard.settingsFlags"
                        [class.highlight]="flag.actual != flag.expected">
                            {{flag.name}}: {{flag.actual}}&ensp;
                    </span>
                    <h2>Version Information</h2>
                    <p *ngIf="dashboard.gitVersion"><strong>Most Recent Commit:</strong> {{dashboard.gitVersion}}</p>
                    <p *ngIf="dashboard.pythonPackages"><strong>Python Packages:</strong> {{dashboard.pythonPackages}}</p>
                    <p *ngIf="dashboard.npmPackages"><strong>NPM Packages:</strong> {{dashboard.npmPackages}}</p>
                </div>
                <div style="width:47%; float:left; padding-left: 1em;">
                    <h2>Recent Log Entries</h2>
                    <p *ngFor="let entry of dashboard.logEntries">
                        <span [class.highlight]="entry.level == 'ERROR'">
                            {{entry.level}}: {{entry.msg}}<br>Logged {{entry.datetime}}
                        </span>
                    </p>
                </div>
            <div style="clear:both"></div>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer"></ad-footer>
        <ad-spinner *ngIf="showSpinner"></ad-spinner>
        `,
    providers: []
})
export class DashboardComponent implements OnInit {
    now: string;
    dashboard: Dashboard;
    breadcrumbs: Breadcrumb[];
    footer: Footer;
    showSpinner: Boolean = false;
    error: any;

    constructor(
        private dashboardService:DashboardService,
        private breadcrumbService:BreadcrumbService,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(dashboardTitle);
        this.now = toDateTimeString(new Date());
        this.populateHeader();
        this.populateFooter();
        this.getDashboard();
    }

    populateHeader() {
        var dashboardBreadcrumb = new Breadcrumb({
            title: dashboardTitle,
            url: dashboardUrl,
            updated: this.now,
            parentName: rootTitle});
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(dashboardBreadcrumb);
    }

    populateFooter() {
        this.footer = new Footer({
            updated: this.now,
            breadcrumbs: [adminBreadcrumb],
        });
    }

    getDashboard() {
        this.showSpinner = true;
        this.dashboardService
            .getDashboard()
            .then(dashboard => {
                this.dashboard = dashboard;
                this.showSpinner = false;

            })
            .catch(error => this.error = error);
    }
}
