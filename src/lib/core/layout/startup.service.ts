import {Router} from '@angular/router';
import {Injectable, Injector, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {zip} from 'rxjs/observable/zip';
import {catchError} from 'rxjs/operators';
import {Menu, MenuData, MenuService} from './menu.service';
import {SettingsService} from './settings.service';
import {TitleService} from './title.service';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(private menuService: MenuService,
                private settingService: SettingsService,
                // private aclService: ACLService,
                private titleService: TitleService,
                // @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
                private httpClient: HttpClient,
                private injector: Injector) {
        console.log('StartupService is created');
    }

    private viaHttp(resolve: any, reject: any) {
        zip(
            this.httpClient.get('assets/app-data.json')
        ).pipe(
            // 接收其他拦截器后产生的异常消息
            catchError(([appData]) => {
                resolve(null);
                return [appData];
            })
        ).subscribe(([appData]) => {
                // application data
                const res: any = appData;
                // 应用信息：包括站点名、描述、年份
                this.settingService.setApp(res.app);
                // 用户信息：包括姓名、头像、邮箱地址
                this.settingService.setUser(res.user);
                // ACL：设置权限为全量
                // this.aclService.setFull(true);
                // 初始化菜单
                // this.menuService.add(res.menu);
                // 设置页面标题的后缀
                this.titleService.suffix = res.app.name;
            },
            () => {
            },
            () => {
                resolve(null);
            });
    }

    private viaMock(resolve: any, reject: any) {
        // const tokenData = this.tokenService.get();
        // if (!tokenData.token) {
        //     this.injector.get(Router).navigateByUrl('/passport/login');
        //     resolve({});
        //     return;
        // }
        // mock
        const app: any = {
            name: `Fuzhutech-Common`,
            description: `Ng-zorro admin panel front-end framework`
        };
        const user: any = {
            name: 'Admin',
            avatar: './assets/img/zorro.svg',
            email: 'cipchk@qq.com',
            token: '123456789'
        };
        // 应用信息：包括站点名、描述、年份
        this.settingService.setApp(app);
        // 用户信息：包括姓名、头像、邮箱地址
        this.settingService.setUser(user);
        // ACL：设置权限为全量
        // this.aclService.setFull(true);
        // 初始化菜单
        /*this.menuService.add([
            {
                text: '主导航',
                group: true,
                children: [
                    {
                        text: '仪表盘',
                        link: '/dashboard',
                        icon: 'icon-speedometer'
                    },
                    {
                        text: '快捷菜单',
                        icon: 'icon-rocket',
                        shortcut_root: true
                    }
                ]
            }
        ]);*/
        // this.menuService.add(appMenuData.menu as MenuData[]);

        // 设置页面标题的后缀
        this.titleService.suffix = app.name;

        resolve({});
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            // http
            // this.viaHttp(resolve, reject);
            // mock
            this.viaMock(resolve, reject);
        });
    }
}


export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}
