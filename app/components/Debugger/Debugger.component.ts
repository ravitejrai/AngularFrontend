import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { Config, HttpServer, PathManager } from "../../shared/utils";
import { LazyLoadImageDirective } from "ng-lazyload-image";
import { NgxCarousel } from 'ngx-carousel';
import { DebuggerService } from './Debugger.service';
import { single } from './data';
import { ModalPopupFactory } from "../../shared/modals/factory.modal.component";

@Component({
  selector: 'Debugger',
	templateUrl: './Debugger.component.html',
  providers: [LazyLoadImageDirective, ModalPopupFactory],
})

export class Debugger implements OnInit {
  public carouselTile: NgxCarousel;

  characters: any;
  objectcharacters
  columns: string[];
  public searchText ;
  public args;
  public selectedUser;




	ngOnInit() {
		this.carouselTile = {
			grid: { xs: 2, sm: 3, md: 3, lg: 5, all: 0 },
			slide: 2,
			speed: 400,
			animation: 'lazy',
			point: {
				visible: true
			},
			load: 2,
			touch: true,
			easing: 'ease',
			loop: true
    }
    this.columns = this.atService.getColumns();
    this.characters = this.atService.getCharacters();
  }

	title = 'Bot Dashboard';
	graphUrl: any = {};
	topTenInterval: string = "1d";
	topTenUrl: string;
	topBots: any[] = [];
	topUsers: any[] = [];
	totalBots: number = 0;
	totalActiveBots: number = 0;
	totalInActiveBots: number = 0;
	single: any[] = [];
	multi: any[];

	view: any[] = [1050, 300];

	// options
	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = true;
	showXAxisLabel = true;
	showYAxisLabel = true;

	colorScheme = {
		domain: ['#0b5b90']
	};

	random(min,max) { return Math.floor(Math.random()*(max-min+1)+min); }

	createGraphUrl() {
		var usr = this.config.loggedInUser;
		var conf = this.config.getDashboardGrafana();
		if (conf) {
			var prefix = "http://" + (conf.host? conf.host: location.hostname) + ":" + conf.port;
			var postfix = usr && usr.customer? ("&var-customer=" + (usr.group==='system'? "All": usr.customer)) : "";
			this.topTenUrl = prefix + conf.topTenPath + postfix;
			this.showTopTenGraph();
			this.graphUrl.perDay = this.sanitizer.bypassSecurityTrustResourceUrl(prefix + conf.perDayPath + postfix);
			this.graphUrl.perWeek = this.sanitizer.bypassSecurityTrustResourceUrl(prefix + conf.perWkPath + postfix);
			this.graphUrl.perMth = this.sanitizer.bypassSecurityTrustResourceUrl(prefix + conf.perMthPath + postfix);
		}
	}

	showTopTenGraph() {
		this.graphUrl.topTen =  this.sanitizer.bypassSecurityTrustResourceUrl(this.topTenUrl + "&from=now-" + this.topTenInterval + "&to=now");
	}

	constructor(public server: HttpServer, private vcRef: ViewContainerRef, public config: Config,
     public pathMgr: PathManager, public sanitizer: DomSanitizer, private atService: DebuggerService,
     public modalFactory: ModalPopupFactory) {
		this.createGraphUrl();

		server.get(pathMgr.server.chatbot.admin.getAll()).subscribe(data => {
			this.totalBots = data.length;
			data.map(item => {
				this.topBots.push({ name: item.displayName, value: this.random(200, 1000) });
				(item.status == "registered")? this.totalActiveBots++ : this.totalInActiveBots++;
				var idx = this.topUsers.findIndex(x => x.username == item.user.username);
				if(idx < 0) {
					this.topUsers.push({username: item.user.username, fullname: item.user.fullname, usrBotCnt: 1});
				} else {
					this.topUsers[idx].usrBotCnt = this.topUsers[idx].usrBotCnt + 1;
				}
			});
			this.topBots.sort((a, b) => b.value-a.value);
			this.single = this.topBots.slice(0, 9);
			//this.applyDummyData();
			this.topUsers.sort((a, b) => b.usrBotCnt-a.usrBotCnt);
		}, this.onError);
  }


  click(char:any) {
    this.selectedUser = char ;
    this.modalFactory.open('Search', this.vcRef, this.selectedUser);
}


	applyDummyData() {
		Object.assign(this, { single });
		this.topUsers.push({ fullname: "Raj", username: "raj@gmail.com", usrBotCnt: 7 })
		this.topUsers.push({ fullname: "Ram", username: "ram@gmail.com", usrBotCnt: 8 })
		this.topUsers.push({ fullname: "Jes", username: "jes@gmail.com", usrBotCnt: 12 })
		this.topUsers.push({ fullname: "Sur", username: "sur@gmail.com", usrBotCnt: 13 })
		this.topUsers.push({ fullname: "Raj", username: "raj@gmail.com", usrBotCnt: 117 })
		this.topUsers.push({ fullname: "Ram", username: "ram@gmail.com", usrBotCnt: 228 })
		this.topUsers.push({ fullname: "Jes", username: "jes@gmail.com", usrBotCnt: 3312 })
		this.topUsers.push({ fullname: "Sur", username: "sur@gmail.com", usrBotCnt: 1443 })
	}

	public carouselTileLoad(evt: any) {

	}

	onSelect(event) {
		console.log(event);
	}

	onError(err) {
		console.log(err);
  }

}
