<template>
  <Layout>
    <div class="el-col el-col-18" style="padding-left: 10px;">
      <section>
        <div class="" style="min-height: 600px;">
          <div class="el-card is-never-shadow" style="min-height: 400px;">
            <div class="el-card__header">
              <div>
                <span>{{ gist.files.filename }}</span>
              </div>
            </div>
            <div class="el-card__body">
              <div style="font-size: 0.9rem; line-height: 1.5; color: rgb(96, 108, 113);">
                发布 {{ gist.created_at | timeStampFilter }}
                <br> 更新 {{ gist.updated_at | timeStampFilter }}
              </div>
              <div style="font-size: 1.1rem; line-height: 1.5; color: rgb(48, 49, 51); border-bottom: 1px solid rgb(228, 231, 237); padding: 5px 0px;">
                <pre style="font-family: 微软雅黑;">{{ gist.description }}</pre>
              </div>
              <div class="markdown-body" style="padding-top: 20px;">
                <p>
                  <img :src="imgSrc">
                </p>
              </div>
            </div>
          </div>
          <!---->
          <div class="el-loading-mask" style="display: none;">
            <div class="el-loading-spinner">
              <svg viewBox="25 25 50 50" class="circular">
                <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
              </svg><!---->
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<page-query>
query {
  gists: allGist {
      edges {
        node {
          id,
          files {
            filename,
            content
          }
          created_at
          description
          updated_at
        }
      }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: '最新动态'
  },
  computed: {
    gist () {
      return this.$page.gists.edges[0].node
    },
    imgSrc() {
      let img_src = this.$page.gists.edges[0].node.files.content
      const from = img_src.indexOf('(')
      const end = img_src.indexOf(')')
      img_src = img_src.slice(from + 1, end)
      return img_src
    }
  },
  filters: {
      timeStampFilter(value) {
        if(!value) return ''
        return value.toString().replace('T', ' ').replace('Z', ' ')
      }
    }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
