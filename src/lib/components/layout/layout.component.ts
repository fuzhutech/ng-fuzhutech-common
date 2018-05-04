import {Component, ElementRef, Injectable, Input, OnInit, Optional, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MenuData, MenuService} from '../../core/layout/menu.service';
import {LayoutConfig} from './layout.config';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {TitleService} from '../../core/layout/title.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'fz-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    @ViewChild('sidebarContainerElement') sidebarContainerElement: ElementRef;
    @ViewChild('tabContainerElement') tabContainerElement: ElementRef;

    @Input() showHeader = true;
    @Input() showFooter = true;

    _sidebarOpen = true;
    @Input() set sidebarOpen(value) {
        this._sidebarOpen = coerceBooleanProperty(value);
    }

    private _modulesInfo = [];  // 模块定义信息

    @Input()
    set modulesInfo(value) {
        this._modulesInfo = value;
        this.moduleList = [];
        this.selectModule = null;
    }

    get modulesInfo() {
        return this._modulesInfo;
    }

    @Input() loadMenuData: (path: string) => MenuData[];  // 加载菜单数据

    // screen,layout: full,default/undefined
    private _layout = 'default';
    // sidebar: none, left, right
    private _sidebar = 'left';

    get showSidebar(): boolean {
        if (this._layout === 'full') {
            return false;
        }
        return this._sidebar !== 'none';  // coerceBooleanProperty
    }

    // tab: none, top, right,left,bottom
    private _tab = 'top';

    get showReuseTab(): boolean {
        if (this._layout === 'full') {
            return false;
        }

        return this._tab !== 'none';
    }

    get contentContainerStyle() {
        return {};
    }

    get tabContainerStyle() {

        let sidebarWidth = 0;
        if (this.sidebarContainerElement && (this.sidebarContainerElement.nativeElement.offsetWidth > 0)) {
            sidebarWidth = this.sidebarContainerElement.nativeElement.offsetWidth;
        }

        const width = this._sidebarOpen ? sidebarWidth + 8 : 8;
        return {'max-width': `calc(100vw - ${width}px)`};
    }

    private moduleList: Array<{ path: string, title: string, isSelect: boolean, menuData: MenuData[] }> = [];
    private selectModule: { path: string, title: string, isSelect: boolean, menuData: MenuData[] };

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                public menuService: MenuService,
                private menuConfig: LayoutConfig,
                private titleService: TitleService) {
        // this.menuService.add(appMenuData.menu as MenuData[]);
    }

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .do((event: NavigationEnd) => {
                this.setModule(event.urlAfterRedirects);
            })
            .map(() => this.activatedRoute)
            .map(route => {
                console.log(route);
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            /*.do((route: ActivatedRoute) => {
                // 获取url
                let next = route.snapshot;
                const segments = [];
                while (next) {
                    segments.push(next.url.join('/'));
                    next = next.parent;
                }
                const url = '/' + segments.filter(i => i).reverse().join('/');
                console.log(url,route);
            })*/
            // .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((routeData) => {
                console.log(routeData);
                // screen,layout: full,default/undefined
                const layout = routeData['layout'];
                this._layout = layout ? layout : 'default';
                // sidebar: none, left, right
                const sidebar = routeData['sidebar'];
                this._sidebar = sidebar ? sidebar : 'left';
                // tab: none, top, right,left,bottom
                const tab = routeData['tab'];
                this._tab = tab ? tab : 'top';
            });
    }

    private setModule(url: string): void {
        // 根据path获取module信息
        const path = url + '/';


        let temp = this.modulesInfo.find(defin => path.startsWith(defin.path));
        if (!temp) {
            // 默认module
            temp = this.modulesInfo[this.modulesInfo.length - 1];
        }
        // console.log('模块信息:', temp);

        // 是否为当前选择模块
        if (this.selectModule && this.selectModule.path === temp.path) {

            if (temp.path === '/') {
                this.titleService.setTitle(temp.title);
            }

            return;
        }

        // 是否已经展示过该module
        const exitModule = this.moduleList.find(module => module.path === temp.path);
        if (exitModule) {
            // console.log('存在模块缓存:', exitModule.module);
            this.moduleList.forEach(module => module.isSelect = url.startsWith(module.path));
            if (exitModule.menuData) {
                this.menuService.add(exitModule.path, temp.path, exitModule.menuData);
            } else {
                // 加载模块菜单信息
                const menuData = this.getMenuData(temp.path);
                exitModule.menuData = menuData;
                this.menuService.add(exitModule.path, temp.path, menuData);
            }
            this.selectModule = exitModule;
        } else {
            // console.log('不存在模块缓存:', temp.path);
            // 加载模块相关信息
            const module = this.loadModuleData(temp.path, temp.title);

            // 刷新菜单
            const menuData = module.menuData;
            this.menuService.add(module.path, temp.path, menuData);

            // console.log(module);
            this.moduleList.push(module);
            this.selectModule = module;
        }
        this.titleService.setTitle(temp.title);
    }

    private getMenuData(path: string): MenuData[] {
        if (this.loadMenuData) {
            return this.loadMenuData(path);
        } else {
            return [];
        }
    }


    private loadModuleData(path: string, title: string): { path: string, title: string, isSelect: boolean, menuData: MenuData[] } {
        return {path: path, title: title, isSelect: true, menuData: this.getMenuData(path)};
    }
}
