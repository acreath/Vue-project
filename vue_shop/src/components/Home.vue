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
            <el-aside width="200px">Aside</el-aside>
            
            <!-- 右侧内容主体 -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
    
</template>

<script>
export default {
    methods:{
        logout() {
            //清空token，返回到登录页
            window.sessionStorage.clear()
            this.$router.push('/login')
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
    }

    .el-main {
        background-color: #eaedf1;
    }

    
</style>