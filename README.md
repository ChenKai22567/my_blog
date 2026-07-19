# Kaiyi Chen · Personal Website

陈恺义的中英文个人主页，用于展示个人简介、网页项目、学术论文、奖项与简历。网站基于 Next.js、TypeScript 和 Tailwind CSS 构建，采用静态导出，可部署到普通 Web 服务器。

Kaiyi Chen's bilingual personal website for presenting a profile, web projects, academic publications, awards, and CV. It is built with Next.js, TypeScript, and Tailwind CSS and exports as a static site.

## 内容维护 / Content maintenance

- `content/`：英文内容，包括全局配置、项目、论文、奖项和简历。
- `content_zh/`：对应的中文内容。
- `public/`：头像、站点图标和项目截图。
- `src/`：页面、组件、内容解析和交互逻辑。

English content lives in `content/`; matching Chinese content lives in `content_zh/`. Static images are stored in `public/`.

## 本地运行 / Local development

需要 Node.js 22 或更高版本。

```bash
npm ci
npm run dev
```

浏览器访问 <http://localhost:3000>。

## 构建与宝塔部署 / Build and Baota deployment

```bash
npm run lint
npm run build
```

构建结果位于 `out/`。在宝塔面板中创建纯静态站点后，将 `out/` 内的全部文件和目录上传至网站根目录；必须保留 `_next/` 目录及其内部结构。更新网站时重新构建并整体替换服务器上的旧静态文件。

The production files are generated in `out/`. Upload the contents of `out/`, including the complete `_next/` directory, to the web root of a static site.

## License

This project is released under the MIT License. It is derived from the PRISM website template; the original PRISM copyright notice is retained in [LICENSE](LICENSE).
