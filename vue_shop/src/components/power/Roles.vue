<template>
    <div>
        <!-- 面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
            
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <!-- 添加角色区 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
                </el-col>
            </el-row>

            <!-- 角色列表区 -->
            <el-table :data="rolelist" border stripe>
                <!-- 展开列，显示角色下的所有权限 -->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <!-- i1 代表的是index -->
                        <!-- 为element组件绑定自定义样式通过：class -->
                        <el-row :class="['bdbottom',i1 === 0 ? 'bdtop' : '','vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
                            <!-- 一级权限列 -->
                            <el-col :span="5">
                                <el-tag>{{item1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 二，三级权限列 -->
                            <el-col :span="19" >
                                <el-row :class="[i2 === 0 ? '' : 'bdtop','vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                                    <el-col :span="6">
                                        <el-tag type="success">{{item2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-row :class="[i3 === 0 ? '' : 'bdtop']" v-for="(item3, i3) in item2.children" :key="item3.id">
                                            <el-col>
                                                <el-tag type="warning">{{item3.authName}}</el-tag>
                                                
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeRoleById(scope.row.id)">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>

        <!-- 添加用户的对话框 -->
        <el-dialog
            title="添加角色"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed">
            <!-- 内容主体区 -->
            <el-form :model="addRoleForm" :rules="addRoleFormRules" ref="addRoleFormRef" label-width="90px" >
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addRoleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addRoleForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 编辑用户的对话框 -->
        <el-dialog
            title="编辑角色"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed">
            <!-- 内容主体区 -->
            <el-form :model="editRoleForm" :rules="editRoleFormRules" ref="editRoleFormRef" label-width="90px" >
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="editRoleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="editRoleForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRoleInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>



<script>
export default {
    data() {
        return {
            // 所有角色列表数据
            rolelist:[],
            //控制添加对话框的显示
            addDialogVisible: false,
            //添加表单的数据
            addRoleForm:{
                roleName: '',
                roleDesc: '',
                
            },
            //添加表单的验证
            addRoleFormRules:{

                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                roleDesc:[
                    { required: true, message: '请输入角色描述', trigger: 'blur' },
                    { min: 6, max: 15, message: '用户描述长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                
            },
            //控制修改角色表单显示
            editDialogVisible:false,
            //修改角色表单数据
            editRoleForm:{

            },
            //添加表单的验证
            editRoleFormRules:{

                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                roleDesc:[
                    { required: true, message: '请输入角色描述', trigger: 'blur' },
                    { min: 6, max: 15, message: '用户描述长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                
            },


        }
    },

    created() {
        this.getRolesList()
    },

    methods: {
        //获取所有角色列表
        async getRolesList() {
            const {data : res} = await this.$http.get('roles')
            if(res.meta.status !== 200) {
                return this.$message.err('获取角色列表失败！')
            }

            this.rolelist = res.data
        },

        
        //监听添加角色对话框的关闭事件
        addDialogClosed() {
            this.$refs.editRoleFormRef.resetFields()
        },

        addRole() {
            this.$refs.editRoleFormRef.validate(async valid => {
                if (!valid) return
                //可以发起添加用户的网络请求
                const {data: res} = await this.$http.post('roles',this.addRoleForm)
                if(res.meta.status !== 201) {
                    this.$message.error('添加角色失败！')

                }

                this.$message.success('添加角色成功！')
                //隐藏添加用户对话框
                this.addDialogVisible = false
                //重新获取用户列表数据
                this.getRolesList()
            })
        },

        // 展示修改用户的对话框
        async showEditDialog(id) {
            console.log(id)
            // 根据id查询用户信息
            const {data : res} = await this.$http.get('roles/'+ id)
            if (res.meta.status !== 200) {
                this.$message.error("角色不存在")
            }
            
            this.editRoleForm = res.data
            this.editDialogVisible = true
            console.log(this.editRoleForm)
            

        },

        // 监听修改用户对话框的关闭事件
        editDialogClosed() { 
            // 拿到引用对象
            this.$refs.editRoleFormRef.resetFields()
        },

        editRoleInfo() {
            console.log(this.editRoleForm.roleId)
            this.$refs.editRoleFormRef.validate( async valid => {
                if (!valid) return
                //可以发起添加用户的网络请求
                const {data: res} = await this.$http.put('roles/'+this.editRoleForm.roleId,{
                    roleName: this.editRoleForm.roleName,
                    roleDesc: this.editRoleForm.roleDesc
                    })
                if(res.meta.status !== 200) {
                    this.$message.error('修改角色信息失败！')

                }

                this.$message.success('修改角色信息成功！')
                //隐藏修改用户对话框
                this.editDialogVisible = false
                //重新获取用户列表数据
                this.getRolesList()
            })
        },

        // 根据用户id删除角色信息
        async removeRoleById(id) {
            //弹框询问用户是否删除数据
            const confirmResult = await this.$confirm('此操作将永久角色信息, 是否继续?', '提示', 
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(err => {
                    return err
                }
            )
            //如果用户确认删除，则返回值为字符串 comfirm
            //如果用户取消删除，则返回值为字符串 cancel
            if(confirmResult !== 'confirm' ){
                return this.$message.info('已经取消删除')
            }

            const {data : res} = await this.$http.delete('roles/'+ id )
            if(res.meta.status !== 200) {
                return this.$message.error('删除角色失败')
            }

            return this.$message.success('删除角色成功')
            this.getRolesList()
            
            
        }


    }
}
</script>>


<style lang="less" scoped>

.el-tag {

    margin: 7px;
}

.bdtop {
    border-top:1px solid #eee
}
.bdbottom {
    border-bottom: 1px solid #eee;
}

.vcenter {
    display: flex;
    align-items: center;
}
</style>