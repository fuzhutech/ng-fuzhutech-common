import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {MenuData} from '../lib/core/layout/menu.service';

@Component({
    selector: 'fz-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    darkTheme = false;
    _sidebarOpen = true;

    _modulesInfo = [
        {path: '/showcase/', name: 'showcase', title: '示例', desc: '示例'},
        {path: '/pages/', name: 'pages', title: '页面', desc: '页面'},
        {path: '/', name: 'home', title: '', desc: '默认主页面'}
    ];

    constructor(private overlayContainer: OverlayContainer,
                private activatedRoute: ActivatedRoute,
                @Inject(DOCUMENT) private doc: any,
                private router: Router) {
        this.switchTheme(false);
    }

    ngAfterViewInit(): void {
        const _element: HTMLElement = document.getElementById('preLoader');
        setTimeout(() => {
            if (_element) {
                _element.style['display'] = 'none';
            }
        }, 0);
    }

    switchTheme(dark: boolean) {
        this.darkTheme = dark;


        const bodyEl = this.doc.querySelector('body');
        const removeArr = [];
        for (let i = 0; i < bodyEl.classList.length; i++) {
            if (bodyEl.classList[i].startsWith('theme-')) {
                removeArr.push(bodyEl.classList[i]);
            }
        }


        if (dark) {
            this.doc.body.classList.remove('myapp-light-theme');
            this.doc.body.classList.add('myapp-dark-theme');

            /**
             * 由于某些组件（如菜单、选择、对话框等）在一个全局覆盖容器中，这些组件需要受主题CSS类选择器的影响,
             * 需要额外的步骤将全局样式类添加到全局覆盖容器中。
             */
            this.overlayContainer.getContainerElement().classList.remove('myapp-light-theme');
            this.overlayContainer.getContainerElement().classList.add('myapp-dark-theme');
        } else {
            this.doc.body.classList.remove('myapp-dark-theme');
            this.doc.body.classList.add('myapp-light-theme');

            this.overlayContainer.getContainerElement().classList.remove('myapp-dark-theme');
            this.overlayContainer.getContainerElement().classList.add('myapp-light-theme');
        }
    }

    toggleSidebar() {
        this._sidebarOpen = !this._sidebarOpen;
    }

    private loadMenuData(path: string): MenuData[] {
        console.log('loadMenuData');
        switch (path) {
            case '/showcase/':
                return appMenuData.menu;
            case '/pages/':
                return pagesMenuData.menu;
            case '/':
                return [];
            default:
                return [];
        }
    }

}


const appMenuData = {
    'app': {
        'name': 'ngx-fuzhutech-common',
        'description': 'ngx-fuzhutech-common admin panel front-end framework'
    },
    'user': {
        'name': 'Admin',
        'avatar': './assets/img/zorro.svg',
        'email': 'fuzhutech@163.com'
    },
    'menu': [
        {
            'text': '主导航',
            'translate': 'main_navigation',
            'group': true,
            'children': [
                {
                    'text': '仪表盘',
                    'translate': 'dashboard',
                    'link': '/showcase/dashboard',
                    'icon': 'icon-speedometer',
                    'children': [
                        {
                            'text': '仪表盘V1',
                            'link': '/showcase/dashboard/v1',
                            'translate': 'dashboard_v1'
                        },
                        {
                            'text': '分析页',
                            'link': '/showcase/dashboard/analysis',
                            'translate': 'dashboard_analysis'
                        },
                        {
                            'text': 'Monitor',
                            'link': '/showcase/dashboard/monitor',
                            'translate': 'dashboard_monitor'
                        },
                        {
                            'text': 'Workplace',
                            'link': '/showcase/dashboard/workplace',
                            'translate': 'dashboard_workplace'
                        },
                        {
                            'text': '测试',
                            'translate': 'pages',
                            'link': '/showcase/',
                            'icon': 'icon-doc',
                            'acl': 'admin',
                            'children': [
                                {
                                    'text': '测试1',
                                    'link': '/showcase/login',
                                    'translate': 'm-login',
                                    'reuse': true
                                },
                                {
                                    'text': '测试2',
                                    'link': '/showcase/login/register',
                                    'translate': 'm-register',
                                    'reuse': true
                                },
                                {
                                    'text': '测试3',
                                    'translate': 'pages',
                                    'link': '/showcase/',
                                    'icon': 'icon-doc',
                                    'acl': 'admin',
                                    'children': [
                                        {
                                            'text': '测试3-1',
                                            'link': '/showcase/login',
                                            'translate': 'm-login',
                                            'reuse': true
                                        },
                                        {
                                            'text': '测试3-2',
                                            'link': '/showcase/login/register',
                                            'translate': 'm-register',
                                            'reuse': true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    'text': '快捷菜单',
                    'translate': 'shortcut',
                    'icon': 'icon-rocket',
                    'shortcut_root': true,
                    'children': []
                },
                /*{
                    'text': '小部件',
                    'translate': 'widgets',
                    'link': '/showcase/widgets',
                    'icon': 'icon-grid',
                    'badge': 2
                }*/
            ]
        },
        {
            'text': '测试',
            'translate': 'test',
            'group': true,
            'children': [
                {
                    'text': '首页',
                    'translate': 'home1',
                    'link': '/showcase/home1',
                    'icon': 'icon-compass'
                },
                {
                    'text': '登录页面',
                    'translate': 'pages',
                    'link': '/showcase/',
                    'icon': 'icon-doc',
                    'acl': 'admin',
                    'children': [
                        {
                            'text': '登陆',
                            'link': '/showcase/login',
                            'translate': 'm-login',
                            'reuse': true
                        },
                        {
                            'text': '注册',
                            'link': '/showcase/login/register',
                            'translate': 'm-register',
                            'reuse': true
                        },
                        {
                            'text': '测试',
                            'translate': 'pages',
                            'link': '/showcase/',
                            'icon': 'icon-doc',
                            'acl': 'admin',
                            'children': [
                                {
                                    'text': '测试1',
                                    'link': '/showcase/login',
                                    'translate': 'm-login',
                                    'reuse': true
                                },
                                {
                                    'text': '测试2',
                                    'link': '/showcase/login/register',
                                    'translate': 'm-register',
                                    'reuse': true
                                },
                                {
                                    'text': '测试3',
                                    'translate': 'pages',
                                    'link': '/showcase/',
                                    'icon': 'icon-doc',
                                    'acl': 'admin',
                                    'children': [
                                        {
                                            'text': '测试3-1',
                                            'link': '/showcase/login',
                                            'translate': 'm-login',
                                            'reuse': true
                                        },
                                        {
                                            'text': '测试3-2',
                                            'link': '/showcase/login/register',
                                            'translate': 'm-register',
                                            'reuse': true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            'text': '组件',
            'translate': 'component',
            'group': true,
            'children': [
                {
                    'text': 'Navigation',
                    'translate': 'Navigation',
                    'link': '/showcase/Navigation',
                    'icon': 'icon-magic-wand',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Affix 固钉',
                            'link': '/showcase/affix',
                            'translate': 'affix'
                        },
                        {
                            'text': 'highlight',
                            'link': '/showcase/highlight',
                            'translate': 'highlight'
                        }
                    ]
                },
                {
                    'text': 'Data Entry',
                    'translate': 'forms',
                    'link': '/showcase/forms',
                    'icon': 'icon-note',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Cascader 级联选择',
                            'link': '/showcase/cascader',
                            'translate': 'cascader'
                        },
                        {
                            'text': 'Rate 评分',
                            'link': '/showcase/rate',
                            'translate': 'rate'
                        },
                        {
                            'text': 'Transfer 穿梭框',
                            'link': '/showcase/transfer',
                            'translate': 'transfer'
                        }
                    ]
                },
                {
                    'text': 'Data Display',
                    'translate': 'editor',
                    'link': '/showcase/editor',
                    'icon': 'icon-pencil',
                    'children': [
                        {
                            'text': 'Avatar 头像',
                            'link': '/showcase/avatar'
                        },
                        {
                            'text': 'Badge 徽标数',
                            'link': '/showcase/badge'
                        },
                        {
                            'text': 'Carousel 走马灯',
                            'link': '/showcase/carousel'
                        },
                        {
                            'text': 'overplay-panel',
                            'link': '/showcase/overplay-panel'
                        },
                        {
                            'text': 'Popover 气泡卡片',
                            'link': '/showcase/popover'
                        },
                        {
                            'text': 'Timeline 时间轴',
                            'link': '/showcase/timeline'
                        }
                    ]
                },
                {
                    'text': 'FeedBack',
                    'translate': 'charts',
                    'link': '/showcase/charts',
                    'icon': 'icon-graph',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Alert 警告提示',
                            'link': '/showcase/alert'
                        },
                        {
                            'text': 'Message 全局提示',
                            'link': '/showcase/message'
                        },
                        {
                            'text': 'Notification 通知提醒框',
                            'link': '/showcase/notification'
                        }
                    ]
                },
                {
                    'text': 'Other',
                    'translate': 'charts',
                    'link': '/showcase/charts',
                    'icon': 'icon-graph',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Anchor 锚点',
                            'link': '/showcase/anchor'
                        },
                        {
                            'text': 'BackTop 回到顶部',
                            'link': '/showcase/back-top'
                        }
                    ]
                }
            ]
        },
        {
            'text': 'Pro',
            'translate': 'pro',
            'group': true,
            'children': [
                {
                    'text': 'Form Page',
                    'translate': 'form',
                    'link': '/showcase/pro/form',
                    'icon': 'icon-note',
                    'children': [
                        {
                            'text': 'Step Form',
                            'link': '/showcase/pro/form/step-form',
                            'translate': 'step-form'
                        },
                        {
                            'text': 'Advanced Form',
                            'link': '/showcase/pro/form/advanced-form',
                            'translate': 'advanced-form'
                        }
                    ]
                },
                {
                    'text': 'List',
                    'translate': 'pro-list',
                    'link': '/showcase/pro/list',
                    'icon': 'icon-grid',
                    'children': [
                        {
                            'text': 'Table List',
                            'link': '/showcase/pro/list/table-list',
                            'translate': 'pro-table-list'
                        },
                        {
                            'text': 'Basic List',
                            'link': '/showcase/pro/list/basic-list',
                            'translate': 'pro-basic-list'
                        },
                        {
                            'text': 'Card List',
                            'link': '/showcase/pro/list/card-list',
                            'translate': 'pro-card-list'
                        },
                        {
                            'text': 'Cover Card List',
                            'link': '/showcase/pro/list/cover-card-list',
                            'translate': 'pro-cover-card-list'
                        },
                        {
                            'text': 'Filter Card List',
                            'link': '/showcase/pro/list/filter-card-list',
                            'translate': 'pro-filter-card-list'
                        },
                        {
                            'text': 'Search',
                            'link': '/showcase/pro/list/search',
                            'translate': 'pro-search'
                        }
                    ]
                },
                {
                    'text': 'Profile',
                    'translate': 'pro-profile',
                    'link': '/showcase/pro/profile',
                    'icon': 'icon-book-open',
                    'children': [
                        {
                            'text': 'Basic',
                            'link': '/showcase/pro/profile/basic',
                            'translate': 'pro-profile-basic'
                        },
                        {
                            'text': 'Advanced',
                            'link': '/showcase/pro/profile/advanced',
                            'translate': 'pro-profile-advanced'
                        }
                    ]
                },
                {
                    'text': 'Result',
                    'translate': 'pro-result',
                    'link': '/showcase/pro/result',
                    'icon': 'icon-check',
                    'children': [
                        {
                            'text': 'Success',
                            'link': '/showcase/pro/result/success',
                            'translate': 'pro-result-success'
                        },
                        {
                            'text': 'Fail',
                            'link': '/showcase/pro/result/fail',
                            'translate': 'pro-result-fail'
                        }
                    ]
                },
                {
                    'text': 'Exception',
                    'translate': 'pro-exception',
                    'link': '/showcase/',
                    'icon': 'icon-fire',
                    'children': [
                        {
                            'text': '403',
                            'link': '/showcase/403',
                            'reuse': false
                        },
                        {
                            'text': '404',
                            'link': '/showcase/404',
                            'reuse': false
                        },
                        {
                            'text': '500',
                            'link': '/showcase/500',
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': 'User',
                    'translate': 'pro-user',
                    'link': '/showcase/passport',
                    'icon': 'icon-user',
                    'children': [
                        {
                            'text': 'login',
                            'link': '/showcase/passport/login',
                            'translate': 'pro-login',
                            'reuse': false
                        },
                        {
                            'text': 'register',
                            'link': '/showcase/passport/register',
                            'translate': 'pro-register',
                            'reuse': false
                        },
                        {
                            'text': 'register result',
                            'link': '/showcase/passport/register-result',
                            'translate': 'pro-register-result',
                            'reuse': false
                        }
                    ]
                }
            ]
        },
        {
            'text': 'More',
            'translate': 'more',
            'group': true,
            'children': [
                {
                    'text': 'Common Logics',
                    'translate': 'logics',
                    'link': '/showcase/logics',
                    'icon': 'icon-compass',
                    'children': [
                        {
                            'text': 'ACL',
                            'link': '/showcase/logics/acl',
                            'translate': 'acl'
                        },
                        {
                            'text': 'Route Guard',
                            'link': '/showcase/logics/guard',
                            'translate': 'guard'
                        },
                        {
                            'text': 'Cache',
                            'link': '/showcase/logics/cache',
                            'translate': 'cache'
                        },
                        {
                            'text': 'Down File',
                            'link': '/showcase/logics/downfile',
                            'translate': 'downfile',
                            'shortcut': true,
                            'children': [
                                {
                                    'text': 'Relation1',
                                    'link': '/showcase/data-v/relation',
                                    'translate': 'relation',
                                    'reuse': false
                                },
                                {
                                    'text': 'Relation2',
                                    'link': '/showcase/data-v/relation',
                                    'translate': 'relation',
                                    'reuse': false
                                }
                            ]
                        },
                        {
                            'text': 'Xlsx',
                            'link': '/showcase/logics/xlsx'
                        },
                        {
                            'text': 'Zip',
                            'link': '/showcase/logics/zip'
                        }
                    ]
                },
                {
                    'text': 'Report',
                    'translate': 'report',
                    'icon': 'anticon anticon-cloud-o',
                    'children': [
                        {
                            'text': 'Relation',
                            'link': '/showcase/data-v/relation',
                            'translate': 'relation',
                            'shortcut': true,
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': 'Pages',
                    'translate': 'pages',
                    'link': '/showcase/pages',
                    'icon': 'icon-doc',
                    'acl': 'admin',
                    'children': [
                        {
                            'text': 'Login',
                            'link': '/showcase/pages/login',
                            'translate': 'm-login',
                            'reuse': false
                        },
                        {
                            'text': 'Register',
                            'link': '/showcase/pages/register',
                            'translate': 'm-register',
                            'reuse': false
                        },
                        {
                            'text': 'Forget',
                            'link': '/showcase/pages/forget',
                            'translate': 'm-forget',
                            'reuse': false
                        },
                        {
                            'text': 'Lock',
                            'link': '/showcase/pages/lock',
                            'translate': 'm-lock',
                            'reuse': false
                        },
                        {
                            'text': '404',
                            'link': '/showcase/pages/404',
                            'reuse': false
                        },
                        {
                            'text': '500',
                            'link': '/showcase/pages/500',
                            'reuse': false
                        },
                        {
                            'text': 'Maintenance',
                            'link': '/showcase/pages/maintenance',
                            'translate': 'maintenance',
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': 'Extras',
                    'translate': 'extras',
                    'link': '/showcase/extras',
                    'icon': 'icon-cup',
                    'children': [
                        {
                            'text': 'Blog',
                            'link': '/showcase/extras/blog',
                            'translate': 'blog',
                            'children': [
                                {
                                    'text': 'List',
                                    'link': '/showcase/extras/blog/list',
                                    'translate': 'list',
                                    'badge': 1,
                                    'badge_dot': true
                                },
                                {
                                    'text': 'Comment',
                                    'link': '/showcase/extras/blog/comment',
                                    'translate': 'comment'
                                },
                                {
                                    'text': 'Post',
                                    'link': '/showcase/extras/blog/post',
                                    'translate': 'post'
                                }, {
                                    'text': 'WebSite',
                                    'externalLink': '//github.com/cipchk/ng-alain',
                                    'target': '_blank',
                                    'translate': 'website'
                                }
                            ]
                        },
                        {
                            'text': 'Help Center',
                            'link': '/showcase/extras/helpcenter',
                            'translate': 'helpcenter'
                        },
                        {
                            'text': 'Settings',
                            'link': '/showcase/extras/settings',
                            'translate': 'settings'
                        },
                        {
                            'text': 'Poi',
                            'link': '/showcase/extras/poi',
                            'translate': 'poi'
                        }
                    ]
                }
            ]
        }
    ]
};


const pagesMenuData = {
    'app': {
        'name': 'ngx-fuzhutech-common',
        'description': 'ngx-fuzhutech-common admin panel front-end framework'
    },
    'user': {
        'name': 'Admin',
        'avatar': './assets/img/zorro.svg',
        'email': 'fuzhutech@163.com'
    },
    'menu': [
        {
            'text': '主导航',
            'translate': 'main_navigation',
            'group': true,
            'children': [
                {
                    'text': '仪表盘',
                    'translate': 'dashboard',
                    'link': '/showcase/dashboard',
                    'icon': 'icon-speedometer',
                    'children': [
                        {
                            'text': '仪表盘V1',
                            'link': '/showcase/dashboard/v1',
                            'translate': 'dashboard_v1'
                        },
                        {
                            'text': '分析页',
                            'link': '/showcase/dashboard/analysis',
                            'translate': 'dashboard_analysis'
                        },
                        {
                            'text': 'Monitor',
                            'link': '/showcase/dashboard/monitor',
                            'translate': 'dashboard_monitor'
                        },
                        {
                            'text': 'Workplace',
                            'link': '/showcase/dashboard/workplace',
                            'translate': 'dashboard_workplace'
                        },
                        {
                            'text': '测试',
                            'translate': 'pages',
                            'link': '/showcase/',
                            'icon': 'icon-doc',
                            'acl': 'admin',
                            'children': [
                                {
                                    'text': '测试1',
                                    'link': '/showcase/login',
                                    'translate': 'm-login',
                                    'reuse': true
                                },
                                {
                                    'text': '测试2',
                                    'link': '/showcase/login/register',
                                    'translate': 'm-register',
                                    'reuse': true
                                },
                                {
                                    'text': '测试3',
                                    'translate': 'pages',
                                    'link': '/showcase/',
                                    'icon': 'icon-doc',
                                    'acl': 'admin',
                                    'children': [
                                        {
                                            'text': '测试3-1',
                                            'link': '/showcase/login',
                                            'translate': 'm-login',
                                            'reuse': true
                                        },
                                        {
                                            'text': '测试3-2',
                                            'link': '/showcase/login/register',
                                            'translate': 'm-register',
                                            'reuse': true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    'text': '快捷菜单',
                    'translate': 'shortcut',
                    'icon': 'icon-rocket',
                    'shortcut_root': true,
                    'children': []
                },
                /*{
                    'text': '小部件',
                    'translate': 'widgets',
                    'link': '/showcase/widgets',
                    'icon': 'icon-grid',
                    'badge': 2
                }*/
            ]
        },
        {
            'text': '测试',
            'translate': 'test',
            'group': true,
            'children': [
                {
                    'text': '首页',
                    'translate': 'home1',
                    'link': '/showcase/home1',
                    'icon': 'icon-compass'
                },
                {
                    'text': '登录页面',
                    'translate': 'pages',
                    'link': '/showcase/',
                    'icon': 'icon-doc',
                    'acl': 'admin',
                    'children': [
                        {
                            'text': '登陆',
                            'link': '/showcase/login',
                            'translate': 'm-login',
                            'reuse': true
                        },
                        {
                            'text': '注册',
                            'link': '/showcase/login/register',
                            'translate': 'm-register',
                            'reuse': true
                        },
                        {
                            'text': '测试',
                            'translate': 'pages',
                            'link': '/showcase/',
                            'icon': 'icon-doc',
                            'acl': 'admin',
                            'children': [
                                {
                                    'text': '测试1',
                                    'link': '/showcase/login',
                                    'translate': 'm-login',
                                    'reuse': true
                                },
                                {
                                    'text': '测试2',
                                    'link': '/showcase/login/register',
                                    'translate': 'm-register',
                                    'reuse': true
                                },
                                {
                                    'text': '测试3',
                                    'translate': 'pages',
                                    'link': '/showcase/',
                                    'icon': 'icon-doc',
                                    'acl': 'admin',
                                    'children': [
                                        {
                                            'text': '测试3-1',
                                            'link': '/showcase/login',
                                            'translate': 'm-login',
                                            'reuse': true
                                        },
                                        {
                                            'text': '测试3-2',
                                            'link': '/showcase/login/register',
                                            'translate': 'm-register',
                                            'reuse': true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            'text': '组件',
            'translate': 'component',
            'group': true,
            'children': [
                {
                    'text': 'Navigation',
                    'translate': 'Navigation',
                    'link': '/showcase/Navigation',
                    'icon': 'icon-magic-wand',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Affix 固钉',
                            'link': '/showcase/affix',
                            'translate': 'affix'
                        },
                        {
                            'text': 'highlight',
                            'link': '/showcase/highlight',
                            'translate': 'highlight'
                        }
                    ]
                },
                {
                    'text': 'Data Entry',
                    'translate': 'forms',
                    'link': '/showcase/forms',
                    'icon': 'icon-note',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Cascader 级联选择',
                            'link': '/showcase/cascader',
                            'translate': 'cascader'
                        },
                        {
                            'text': 'Rate 评分',
                            'link': '/showcase/rate',
                            'translate': 'rate'
                        },
                        {
                            'text': 'Transfer 穿梭框',
                            'link': '/showcase/transfer',
                            'translate': 'transfer'
                        }
                    ]
                },
                {
                    'text': 'Data Display',
                    'translate': 'editor',
                    'link': '/showcase/editor',
                    'icon': 'icon-pencil',
                    'children': [
                        {
                            'text': 'Avatar 头像',
                            'link': '/showcase/avatar'
                        },
                        {
                            'text': 'Badge 徽标数',
                            'link': '/showcase/badge'
                        },
                        {
                            'text': 'Carousel 走马灯',
                            'link': '/showcase/carousel'
                        },
                        {
                            'text': 'overplay-panel',
                            'link': '/showcase/overplay-panel'
                        },
                        {
                            'text': 'Popover 气泡卡片',
                            'link': '/showcase/popover'
                        },
                        {
                            'text': 'Timeline 时间轴',
                            'link': '/showcase/timeline'
                        }
                    ]
                },
                {
                    'text': 'FeedBack',
                    'translate': 'charts',
                    'link': '/showcase/charts',
                    'icon': 'icon-graph',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Alert 警告提示',
                            'link': '/showcase/alert'
                        },
                        {
                            'text': 'Message 全局提示',
                            'link': '/showcase/message'
                        },
                        {
                            'text': 'Notification 通知提醒框',
                            'link': '/showcase/notification'
                        }
                    ]
                },
                {
                    'text': 'Other',
                    'translate': 'charts',
                    'link': '/showcase/charts',
                    'icon': 'icon-graph',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Anchor 锚点',
                            'link': '/showcase/anchor'
                        },
                        {
                            'text': 'BackTop 回到顶部',
                            'link': '/showcase/back-top'
                        }
                    ]
                }
            ]
        },
        {
            'text': 'Pro',
            'translate': 'pro',
            'group': true,
            'children': [
                {
                    'text': 'Form Page',
                    'translate': 'form',
                    'link': '/showcase/pro/form',
                    'icon': 'icon-note',
                    'children': [
                        {
                            'text': 'Step Form',
                            'link': '/showcase/pro/form/step-form',
                            'translate': 'step-form'
                        },
                        {
                            'text': 'Advanced Form',
                            'link': '/showcase/pro/form/advanced-form',
                            'translate': 'advanced-form'
                        }
                    ]
                },
                {
                    'text': 'List',
                    'translate': 'pro-list',
                    'link': '/showcase/pro/list',
                    'icon': 'icon-grid',
                    'children': [
                        {
                            'text': 'Table List',
                            'link': '/showcase/pro/list/table-list',
                            'translate': 'pro-table-list'
                        },
                        {
                            'text': 'Basic List',
                            'link': '/showcase/pro/list/basic-list',
                            'translate': 'pro-basic-list'
                        },
                        {
                            'text': 'Card List',
                            'link': '/showcase/pro/list/card-list',
                            'translate': 'pro-card-list'
                        },
                        {
                            'text': 'Cover Card List',
                            'link': '/showcase/pro/list/cover-card-list',
                            'translate': 'pro-cover-card-list'
                        },
                        {
                            'text': 'Filter Card List',
                            'link': '/showcase/pro/list/filter-card-list',
                            'translate': 'pro-filter-card-list'
                        },
                        {
                            'text': 'Search',
                            'link': '/showcase/pro/list/search',
                            'translate': 'pro-search'
                        }
                    ]
                },
                {
                    'text': 'Profile',
                    'translate': 'pro-profile',
                    'link': '/showcase/pro/profile',
                    'icon': 'icon-book-open',
                    'children': [
                        {
                            'text': 'Basic',
                            'link': '/showcase/pro/profile/basic',
                            'translate': 'pro-profile-basic'
                        },
                        {
                            'text': 'Advanced',
                            'link': '/showcase/pro/profile/advanced',
                            'translate': 'pro-profile-advanced'
                        }
                    ]
                },
                {
                    'text': 'Result',
                    'translate': 'pro-result',
                    'link': '/showcase/pro/result',
                    'icon': 'icon-check',
                    'children': [
                        {
                            'text': 'Success',
                            'link': '/showcase/pro/result/success',
                            'translate': 'pro-result-success'
                        },
                        {
                            'text': 'Fail',
                            'link': '/showcase/pro/result/fail',
                            'translate': 'pro-result-fail'
                        }
                    ]
                },
                {
                    'text': 'Exception',
                    'translate': 'pro-exception',
                    'link': '/showcase/',
                    'icon': 'icon-fire',
                    'children': [
                        {
                            'text': '403',
                            'link': '/showcase/403',
                            'reuse': false
                        },
                        {
                            'text': '404',
                            'link': '/showcase/404',
                            'reuse': false
                        },
                        {
                            'text': '500',
                            'link': '/showcase/500',
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': 'User',
                    'translate': 'pro-user',
                    'link': '/showcase/passport',
                    'icon': 'icon-user',
                    'children': [
                        {
                            'text': 'login',
                            'link': '/showcase/passport/login',
                            'translate': 'pro-login',
                            'reuse': false
                        },
                        {
                            'text': 'register',
                            'link': '/showcase/passport/register',
                            'translate': 'pro-register',
                            'reuse': false
                        },
                        {
                            'text': 'register result',
                            'link': '/showcase/passport/register-result',
                            'translate': 'pro-register-result',
                            'reuse': false
                        }
                    ]
                }
            ]
        }
    ]
};
