// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "The Bangkok Vegan",
  siteDescription: "Exploring the vegan scene in Bangkok and beyond",
  plugins: [
    {
      use: "gridsome-plugin-tailwindcss",
      options: {
        tailwindConfig: "./tailwind.config.js",
        purgeConfig: {
          whitelist: [
            "svg-inline--fa",
            "table",
            "table-striped",
            "table-bordered",
            "table-hover",
            "table-sm",
          ],
          whitelistPatterns: [
            /fa-$/,
            /blockquote$/,
            /code$/,
            /pre$/,
            /table$/,
            /table-$/,
            /vueperslide$/,
            /vueperslide-$/,
          ],
        },
        presetEnvConfig: {},
        shouldPurge: false,
        shouldImport: false,
        shouldTimeTravel: false,
        shouldPurgeUnusedKeyframes: true,
      },
    },
    {
      use: "gridsome-source-static-meta",
      options: {
        path: "content/site/*.json",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Author",
        path: "./content/author/*.md",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Blog",
        path: "./content/blog/**/*.md",
        refs: {
          author: "Author",
          tags: {
            typeName: "Tag",
            create: true,
          },
          category: {
            typeName: "Category",
            create: true,
          },
        },
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "CustomPage",
        path: "./content/pages/*.md",
      },
    },
    {
      use: "gridsome-plugin-flexsearch",
      options: {
        searchFields: ["title", "content"],
        collections:
          // to enable hot-reload in dev mode due to bug, have to disable flexsearch

          process.env.NODE_ENV === "development"
            ? []
            : [
                {
                  typeName: "Blog",
                  indexName: "Blog",
                  fields: ["title", "category", "excerpt", "content"],
                },
              ],
      },
    },
  ],
  transformers: {
    remark: {
      plugins: [
        "remark-autolink-headings",
        "remark-attr",
        [
          "gridsome-plugin-remark-prismjs-all",
          {
            noInlineHighlight: false,
            showLineNumbers: false,
          },
        ],
        require("./packages/gridsome-plugin-remark-figure"),
      ],

      processImages: false,
    },
  },
  templates: {
    Blog: [
      {
        path: "/posts/:title",
      },
    ],
    CustomPage: [
      {
        path: "/:title",
        component: "~/templates/CustomPage.vue",
      },
    ],
    Category: [
      {
        path: "/category/:title",
        component: "~/templates/Category.vue",
      },
    ],
    Author: [
      {
        path: "/author/:name",
        component: "~/templates/Author.vue",
      },
    ],
    Tag: [
      {
        path: "/tags/:title",
        component: "~/templates/Tag.vue",
      },
    ],
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@pageImage", "@/assets/images");

    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    // svgRule
    //   .use('vue-svg-loader')
    //   .loader('vue-svg-loader')

    // config.module
    //   .rule("vue")
    //   .use("vue-svg-inline-loader")
    //   .loader("vue-svg-inline-loader")
    //   .options({ /* ... */ });
  },
};
