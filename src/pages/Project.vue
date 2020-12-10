<template>
  <Layout>
    <div class="el-col el-col-18" style="padding-left: 10px;">
      <section>
        <div style="min-height: 600px;" class="">
          <div class="el-card is-never-shadow" style="margin-bottom: 20px;"><!---->
            <div class="el-card__body">
              <div class="el-input" style="width: 300px;"><!---->
                <input type="text" autocomplete="off" placeholder="请输入关键字" class="el-input__inner"><!----><!----><!---->
              </div>
              <button type="button" class="el-button el-button--default is-plain is-circle" style="margin-left: 10px;"><!---->
                <i class="el-icon-search"></i><!---->
              </button>
              <button type="button" class="el-button el-button--warning is-plain is-circle" style="margin-left: 10px;"><!---->
                <i class="el-icon-share"></i><!---->
              </button>
            </div>
          </div>
          <div>
            <div v-for="edge in $page.repos.edges" :key="edge.node.id" class="el-card is-hover-shadow" style="margin-bottom: 20px;">
              <div class="el-card__header">
                <div>
                  <div class="el-row">
                    <div class="el-col el-col-16">
                      <span>
                        <g-link :to="'/project/details/'+ edge.node.name" style="text-decoration: none; cursor: pointer;">
                          <i class="el-icon-service"></i>&nbsp;&nbsp; {{ edge.node.name }}
                        </g-link>
                      </span>
                    </div>
                  <div class="el-col el-col-8">
                    <div style="text-align: right;">
                      <button type="button" class="el-button el-button--text" style="padding: 3px 0px;"><!---->
                        <i class="el-icon-back"></i>
                        <g-link :to="edge.node.html_url">前往GitHub</g-link>
                      </button>
                      <button type="button" class="el-button el-button--text" style="padding: 3px 0px;"><!---->
                        <i class="el-icon-share"></i><!---->
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="el-card__body">
              <div style="font-size: 0.9rem; line-height: 1.5; color: rgb(96, 108, 113);">
                最近更新 {{ edge.node.updated_at | timeStampFilter }}
              </div>
              <div style="font-size: 1.1rem; line-height: 1.5; color: rgb(48, 49, 51); padding: 10px 0px 0px;">
                {{ edge.node.name }}
              </div>
              <div style="font-size: 1.1rem; color: rgb(48, 49, 51); padding: 10px 0px 0px;">
                <div class="el-row">
                  <div class="el-col el-col-16" style="padding-top: 5px;">
                    <i class="el-icon-star-off el-tooltip" aria-describedby="el-tooltip-8783" tabindex="0" style="margin: 0px 5px 0px 0px;"></i>
                      {{ edge.node.stargazers_count }}
                    <i class="el-icon-view el-tooltip" aria-describedby="el-tooltip-4658" tabindex="0" style="margin: 0px 5px 0px 15px;"></i>
                      {{ edge.node.watchers_count }}
                    <i class="el-icon-bell el-tooltip" aria-describedby="el-tooltip-599" tabindex="0" style="margin: 0px 5px 0px 15px;"></i>
                      {{ edge.node.forks_count }}
                  </div>
                  <div class="el-col el-col-8" style="text-align: right;">
                    <span class="el-tag el-tag--danger el-tag--small">{{ edge.node.license? (edge.node.license.spdx_id || ''): '' }}</span>
                    <span class="el-tag el-tag--success el-tag--small">{{ edge.node.language }}</span>
                  </div>
                </div>
              </div>
            </div>
            </div>  
            <div style="text-align: center;">
              <div class="el-pagination is-background">
                <!-- <button type="button" disabled="disabled" class="btn-prev">
                  <i class="el-icon el-icon-arrow-left"></i>
                </button> -->
                <!-- <ul class="el-pager">
                  <li class="number active">1</li>
                  <li class="number">2</li>
                  <li class="number">3</li>
                  <li class="number">4</li>
                  <li class="number">5</li>
                  <li class="number">6</li>
                </ul> -->
                <!-- <button type="button" class="btn-next">
                  <i class="el-icon el-icon-arrow-right"></i>
                </button> -->
                <Pager :info="$page.repos.pageInfo" />
              </div>
            </div>
          </div>
          <div class="el-loading-mask" style="display: none;">
          <div class="el-loading-spinner">
            <svg viewBox="25 25 50 50" class="circular">
              <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
            </svg>
          </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  repos: allRepo (perPage: 5, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
      perPage
    }
    edges {
      node {
        id
        name
        html_url
        updated_at
        stargazers_count
        forks_count
        watchers_count
        language
        license {
          name
          spdx_id
        }
      }
    }
  }
}
</page-query>

<script>
import { Pager } from 'gridsome'
import axios from 'axios'
export default {
  metaInfo: {
    title: '开源项目'
  },
  components: {
    Pager
  },
  methods: {
    async showRepo (repo_name) {
      const { data } = axios.get('https://api.github.com/repos/GitHub-Laziji/' + repo_name)

    }
  }
}
</script>
