### git常用命令
#### 1. 创建一个新的仓库
```
# 在当前目录新建一个 Git 仓库 
$ git init 

# 新建一个目录，并将其初始化为 Git 仓库 
$ git init [project-name] 

# 从远程下载一个仓库 
$ git clone [url]
```
#### 2. 配置
Git 的配置文件是 .gitconfig，可以放在用户的主目录（全局配置）下或项目目录下（项目配置）。
```
# 显示当前的 Git 配置 
$ git config --list 

# 编辑 Git 配置 
$ git config -e [--global] 

# 设置用来提交代码的用户信息 
$ git config [--global] user.name "[name]" 
$ git config [--global] user.email "[email address]"
```
#### 3. 添加/删除文件
```

# 将指定文件添加到暂存区中 
$ git add [file1] [file2] ... 

# 将指定目录添加到暂存区中，包括子目录 
$ git add [dir] 

# 将当前目录中的所有文件添加到暂存区中 
$ git add . 

# 在添加每个更改之前都进行确认 
# 对于同一个文件的多个更改，建议分开提交 
$ git add -p 

# 将指定文件从工作区删除，并将本次删除添加到暂存区 
$ git rm [file1] [file2] ... 

# 停止追踪指定的文件，不会删除文件 
$ git rm --cached [file] 

# 对指定文件进行重命名，并添加到暂存区中 
$ git mv [file-original] [file-renamed]
```
#### 4. 代码提交相关
```
# 将暂存区中的文件提交到代码仓库 
$ git commit -m [message] 

# 将指定的文件从暂存区中提交到仓库 
$ git commit [file1] [file2] ... -m [message] 

# 将工作区的更改直接提交到仓库 
$ git commit -a 

# 提交前展示所有的变动 
$ git commit -v 

# 使用新提交代替上次提交 
# 如果代码没有任何变动，将会用于重写上次提交的提交信息 
$ git commit --amend -m [message] 

# 重做上次的提交，并将指定的文件包含其中 
$ git commit --amend [file1] [file2] ...
```

#### 5. 分支相关
```
# 列出本地分支 
$ git branch 

# 列出所有远程分支 
$ git branch -r 

# 列出本地和远程的所有分支 
$ git branch -a 

# 新建分支，并留在当前分支
$ git branch [branch-name] 

# 新建分支，并切换到新分支 
$ git checkout -b [branch] 

# 指向某次提交新建分支 $ git branch [branch] [commit] 

# 创建一个新分支，并与指定的远程分支建立跟踪关系 
$ git branch --track [branch] [remote-branch] 

# 切换到指定分支，并更新工作区 
$ git checkout [branch-name] 

# 切换到上一个分支 
$ git checkout - 

# 将本地分支与指定的远程分支建立跟踪关系 
$ git branch --set-upstream [branch] [remote-branch] 

# 合并指定分支与当前分支 
$ git merge [branch] 

# 将指定的提交合并到本地分支 
$ git cherry-pick [commit] 

# 删除分支 
$ git branch -d [branch-name] 

# 删除远程分支 
$ git push origin --delete [branch-name] 
$ git branch -dr [remote/branch]
```
#### 6. 标签操作
```
# 列出所有标签 
$ git tag 

# 在当前提交上创建一个新标签 
$ git tag [tag] 

# 在指定提交上创建一个新标签 
$ git tag [tag] [commit] 

# 删除本地标签 
$ git tag -d [tag] 

# 删除远程标签 
$ git push origin :refs/tags/[tagName] 

# 查看标签信息 
$ git show [tag]

# 提交指定标签
$ git push [remote] [tag] 

# 提交所有标签 
$ git push [remote] --tags 

# 创建一个新分支，指向特定的标签 
$ git checkout -b [branch] [tag]
```
#### 7. 查看信息
```
# 显示有变动的文件 
$ git status 

# 显示当前分支的提交历史 
$ git log 

# 显示提交历史和每次提交的文件 
$ git log --stat 

# 指定关键字搜索提交历史 
$ git log -S [keyword]

# 显示自某次提交以来的所有更改，一次提交显示一行。 
$ git log [tag] HEAD --pretty=format:%s 

# 显示自某次提交以来的所有更改，其提交描述必须符合搜索条件。 
$ git log [tag] HEAD --grep feature 

# 显示指定文件的提交历史 
$ git log --follow [file] $ git whatchanged [file] 

# 显示与指定文件相关的每个差异 
$ git log -p [file] 

# 显示最近 5 次提交 
$ git log -5 --pretty --oneline 

# 显示所有的提交用户，已提交数目多少排名 
$ git shortlog -sn 

# 显示指定文件何时被何人修改过 
$ git blame [file] 

# 显示暂存区和工作区的文件差别 
$ git diff 


# 显示暂存区和上一次提交的差别 
$ git diff --cached [file] 

# 显示工作区和当前分支的最近一次提交的差别 
$ git diff HEAD 

# 显示指定两次提交的差别 
$ git diff [first-branch]...[second-branch] 

# 显示今天提交了多少代码 
$ git diff --shortstat "@{0 day ago}" 

# 显示特定提交的提交信息和更改的内容 
$ git show [commit] 

# 新手某次提交改动了哪些文件 
$ git show --name-only [commit] 

# 显示某个提交的特定文件的内容 
$ git show [commit]:[filename] 

# 显示当前分支的最新提交 
$ git reflog
```
#### 8. 远程同步
```
# 从远程分支下载所有变动 
$ git fetch [remote] 

# 显示所有远程仓库 
$ git remote -v 

# 显示某个远程参考的信息 
$ git remote show [remote] 

# 新建一个远程仓库，并命名 
$ git remote add [shortname] [url] 

# 检索远程存储库的更改，并与本地分支合并 
$ git pull [remote] [branch] 

# 将本地分支提交到远程仓库 
$ git push [remote] [branch] 

# 将当前分支强制提交到远程仓库，即使有冲突存在 
$ git push [remote] --force 

# 将所有分支提交到远程仓库 
$ git push [remote] --all
```
#### 9. 撤销操作
```
# 将暂存区中的指定文件还原到工作区，保留文件变动 
$ git checkout [file] 

# 将指定文件从某个提交还原到暂存区和工作区 
$ git checkout [commit] [file] 

# 将暂存区中的所有文件还原到工作区 
$ git checkout . 

# 重置暂存区中的指定文件，与先前的提交保持一致，但保持工作空间的变动不变 
$ git reset [file] 

# 重置暂存区和工作区中的指定文件，并与最近一次提交保持一致，工作空间文件变动不会保留 
$ git reset --hard 

# 重置暂存区，指向指定的某次提交，工作区的内容不会被覆盖 
$ git reset [commit] 

# 重置暂存区和工作区中的指定文件，并与指定的某次提交保持一致，工作区的内容会被覆盖 
$ git reset --hard [commit] 

# 将 HEAD 重置为指定的某次提交，保持暂存区和工作区的内容不变 $ git reset --keep [commit] 

# 新建新提交以撤消指定的提交 
# All changes of the latter will be offset by the former and applied to the current branch. $ git revert [commit] 

# 暂存为提交的变动，并在稍后移动它们 
$ git stash $ git stash pop
```
