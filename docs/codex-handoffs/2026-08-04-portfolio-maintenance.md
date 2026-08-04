# 谢敬淳作品集项目交接

## 重新激活提示词

```text
We are continuing from this handoff. Read this document first, inspect the current repo state, verify what still applies, and continue from the next steps without assuming the old chat context is available.
```

## 项目状态

- 仓库：`/home/cockpitadmin/projects/xie-jingchun-portfolio`
- 分支：`main`
- 远端：`origin/main`
- 技术栈：React 18、TypeScript、Vite、Tailwind CSS、Motion、Lucide React、pnpm
- 当前目标：保留暗色、克制、电影感的视觉语言，持续完善作品展示、项目展示和个人简介之间的滚动动效，并保证桌面端约 1700px 内容宽度下的视觉连续性。

## 已完成工作

- 将网页标题改为“谢敬淳 | 视觉设计师”。
- 将“数字体验”类别改为“技术创新”。
- 为各作品类别加入对应的全屏过渡视觉图。
- 删除项目管理屏之后的冗余屏幕，仅保留最终屏。
- 重新设计作品展示屏的折叠消失与项目展示入场动画：向上折叠、中后段上移、辅以模糊渐隐，并兼顾 `prefers-reduced-motion`。
- 清理已删除功能的残留代码、无用依赖、旧资源和冲突样式，启用更严格的 TypeScript 检查。
- 修正作品展示屏与项目展示屏左右宽度不一致的问题。
- 移除过渡过程中出现的异常刀片/几何形状。
- 修复个人简介屏在动画完成后提前上移的问题：将 `.profile` 的 `overflow: hidden` 改为 `overflow: clip`，避免破坏桌面端 sticky 定位。

## 关键提交

- `cc83c9e` — Keep profile reveal centered
- `3d8ed7f` — Optimize portfolio codebase and assets
- `6267a9d` — Reverse works fold direction
- `6dfa918` — Refine works fold transition
- `348759e` — Align showcase screens and fold works exit
- `0f7a5c1` — Remove transition blade artifacts

## 关键文件

- `src/main.tsx`：页面结构、滚动进度、作品展示与项目展示动画逻辑。
- `src/styles.css`：主要视觉系统、响应式布局、sticky 与折叠/模糊过渡样式。
- `index.html`：页面标题与基础元信息。
- `public/assets/category-transitions/`：各类别全屏过渡图。
- `public/assets/project-showcase-*.webp`：项目展示屏视觉资源。
- `AGENTS.md`：项目工作流、设计与 Git 同步约束。

## 已执行检查

- `pnpm build`：通过。
- `git diff --check`：通过。
- 桌面端 1382×900 滚动关键帧截图检查：通过。
- 移动端 390×844 检查：无脚本错误、无图片缺失、无页面横向溢出。
- `prefers-reduced-motion` 桌面模式检查：个人简介完整居中且无错误。
- 最近一次个人简介修复已推送至 `origin/main`。

## 已知提示与本地状态

- Vite 构建时 Motion 依赖可能出现无害的 `"use client"` ignored 提示，不影响构建产物。
- 仓库根目录现有未跟踪的 `.codex/` 与 `work/` 属于本地检查配置和截图，不应提交或覆盖。
- 本地预览通常使用 `http://127.0.0.1:4173/`；重新启动前先确认端口状态。

## 约束与偏好

- 保留主要内容区块与谢敬淳个人信息。
- 保持暗色、克制、电影感和设计导向，避免模板感、过多玻璃卡片、大段空白与重复文案块。
- 动效必须有明确的空间逻辑，不能仅靠简单透明度变化；同时尊重减少动态效果设置。
- 使用 pnpm，不混用 Windows 与 WSL 的 `node_modules`。
- 不修改生成产物，不触碰与任务无关的用户文件。
- 每次项目修改完成后必须通过生产构建、视觉检查、提交并推送当前分支。

## 后续步骤

1. 新会话开始时先运行 `git status --short --branch`，确认远端和本地状态。
2. 按具体新需求定位 `src/main.tsx` 与 `src/styles.css`，避免重新引入已删除的旧结构或动效残留。
3. 修改后运行 `pnpm build` 与 `git diff --check`。
4. 对桌面端、移动端和减少动态效果模式做视觉回归。
5. 只提交任务相关文件并推送 `origin/main`。

## 注意事项

- 不要提交 `.codex/`、`work/`、`node_modules/`、`dist/` 或临时预览文件。
- 不要恢复已删除的项目管理后续屏幕。
- 不要把作品展示退场退化为单纯透明度渐隐。
- 个人简介桌面端依赖 `.profile-shell` 的 sticky 行为；修改父级 overflow 时必须重新验证居中状态。
