<template>

    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img id="logo" src="../assets/steamgo.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type='info' @click="logout">退出</el-button>
        </el-header>
        
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区 -->
                <el-menu background-color="#333744" text-color="#fff"
                active-text-color="#409eff" :unique-opened="true" :collapse="isCollapse" 
                :collapse-transition="false" :router="true" :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id +''" v-for = "item in menulist" :key ="item.id">
                        <!-- 一级菜单的模板区 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class= "iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subitem.path" v-for="subitem in item.children"
                        :key="subitem.id" @click="saveNavState('/' + subitem.path)">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{subitem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    
                 </el-menu>
            </el-aside>
            
            <!-- 右侧内容主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    
</template>

<script>
export default {
    // 定义组件的数据
    data(){
        return {
            //左侧菜单数据
            menulist: [],
            iconsObj:{
                '125':'iconfont el-icon-s-custom',
                '103':'iconfont el-icon-s-check',
                '101':'iconfont el-icon-s-opportunity',
                '102':'iconfont el-icon-s-order',
                '145':'iconfont el-icon-s-data'
            },
            isCollapse: false,
            // 被激活的链接地址
            activePath: ''
        }
    },

    created() {
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods:{
        logout() {
            //清空token，返回到登录页
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        // 获取所有菜单
        async getMenuList() {
            // 解构赋值
           const {data:res} = await this.$http.get('menus')
           if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
           this.menulist = res.data
        },
        //点击按钮切换菜单的折叠与展开
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
            
        },
        // 保存链接的激活状态
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        }
    }
}
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }
    
    #logo{
        height: 60px;
        width: 120px;
        margin-left: 5px;
    }

    .el-header {
        background-color: #373D41;
        display: flex;
        justify-content: space-between;
        // 贴边对齐效果
        padding-left: 0;
        align-items: center;
        // 控制横向布局中的居中显示
        color: #ffffff;
        font-size: 20px;
        > div {
            // 嵌套愈发
            display: flex;
            align-items: center;
            span {
                margin-left: 15px;
            }
        }

        
    }

    
    .el-aside {
        background-color: #333744;
        .el-menu {
            border-right: none;
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

    .iconfont {
        margin-right: 10px;
        
    }

    .toggle-button {
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #ffffff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
        // 鼠标hover上去有一个鼠标变为聚焦的状态
    }
    
    
</style>