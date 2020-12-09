<template>
  <Layout>
    <div class="el-col el-col-18" style="padding-left: 10px;">
      <section>
        <div>
          <div class="el-card is-never-shadow" style="min-height: 400px; margin-bottom: 20px; padding: 0px 0px 20px;"><!---->
            <div class="el-card__body">
              <div class="el-tabs el-tabs--card el-tabs--top">
                <div class="el-tabs__header is-top">
                  <div class="el-tabs__nav-wrap is-top">
                    <div class="el-tabs__nav-scroll">
                      <div role="tablist" class="el-tabs__nav" style="transform: translateX(0px);">
                        <div @click="showFollowers" id="tab-followers" aria-controls="pane-followers" role="tab" aria-selected="true" tabindex="0" class="el-tabs__item is-top" :class="{ 'is-active': showFollowersOrNot }">
                          粉丝 {{ $page.followers.totalCount }}
                        </div>
                        <div @click="showFollowing" id="tab-following" aria-controls="pane-following" role="tab" tabindex="-1" class="el-tabs__item is-top" :class="{ 'is-active': !showFollowersOrNot }">
                          关注 18
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="el-tabs__content">
                  <div v-if="showFollowersOrNot" role="tabpanel" id="pane-followers" aria-labelledby="tab-followers" class="el-tab-pane" style="padding: 5px;">
                    <div class="">
                      <div>
                        <div class="el-row" style="min-height: 200px;">
                          <div class="el-col el-col-8" style="padding: 10px;" v-for="edge in $page.followers.edges" :key="edge.id">
                            <div class="el-card is-hover-shadow" style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"><!---->
                              <div class="el-card__body">
                                <i class="el-icon-star-off"></i> 
                                <g-link style="text-decoration: none; cursor: pointer; margin-left: 20px;">{{ edge.node.login }}</g-link>
                                <br>
                                <i class="el-icon-message"></i> 
                                <g-link :to="edge.node.html_url" target="_blank" style="text-decoration: none; cursor: pointer; margin-left: 20px;">TA的主页</g-link>
                                <br>
                                <g-image :src="edge.node.avatar_url" style="width: 100%; border-radius: 5px; margin-top: 5px;" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style="text-align: center; margin-top: 10px;">
                          <div class="el-pagination is-background">
                            <!-- <button type="button" disabled="disabled" class="btn-prev">
                              <i class="el-icon el-icon-arrow-left"></i>
                            </button> -->
                            <!-- <ul class="el-pager">
                              <li class="number active" v-for="">1</li>
                              <li class="number">2</li>
                              <li class="number">3</li>
                              <li class="number">4</li>
                              <li class="number">5</li>
                              <li class="number">6</li>
                              <li class="el-icon more btn-quicknext el-icon-more"></li>
                              <li class="number">16</li>
                            </ul> -->
                            <Pager :info="$page.followers.pageInfo" />
                            <!-- <button type="button" class="btn-next">
                              <i class="el-icon el-icon-arrow-right"></i>
                            </button> -->
                          </div>
                        </div>
                      </div>
                      <div class="el-loading-mask" style="display: none;">
                        <div class="el-loading-spinner">
                          <svg viewBox="25 25 50 50" class="circular">
                            <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                          </svg><!---->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else role="tabpanel" id="pane-following" aria-labelledby="tab-following" class="el-tab-pane" style="padding: 5px;">
                    <div class="">
                      <div>
                        <div class="el-row" style="min-height: 200px;">
                          <div class="el-col el-col-8" style="padding: 10px;" v-for="edge in $page.following.edges" :key="edge.id">
                            <div class="el-card is-hover-shadow" style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"><!---->
                              <div class="el-card__body">
                                <i class="el-icon-star-off"></i> 
                                <g-link style="text-decoration: none; cursor: pointer; margin-left: 20px;">{{ edge.node.login }}</g-link>
                                <br>
                                <i class="el-icon-message"></i> 
                                <g-link :to="edge.node.html_url" target="_blank" style="text-decoration: none; cursor: pointer; margin-left: 20px;">TA的主页</g-link>
                                <br>
                                <g-image :src="edge.node.avatar_url" style="width: 100%; border-radius: 5px; margin-top: 5px;" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style="text-align: center; margin-top: 10px;">
                          <div class="el-pagination is-background">
                            <!-- <button type="button" disabled="disabled" class="btn-prev">
                              <i class="el-icon el-icon-arrow-left"></i>
                            </button> -->
                            <!-- <ul class="el-pager">
                              <li class="number active" v-for="">1</li>
                              <li class="number">2</li>
                              <li class="number">3</li>
                              <li class="number">4</li>
                              <li class="number">5</li>
                              <li class="number">6</li>
                              <li class="el-icon more btn-quicknext el-icon-more"></li>
                              <li class="number">16</li>
                            </ul> -->
                            <Pager :info="$page.followers.pageInfo" />
                            <!-- <button type="button" class="btn-next">
                              <i class="el-icon el-icon-arrow-right"></i>
                            </button> -->
                          </div>
                        </div>
                      </div>
                      <div class="el-loading-mask" style="display: none;">
                        <div class="el-loading-spinner">
                          <svg viewBox="25 25 50 50" class="circular">
                            <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                          </svg><!---->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div role="tabpanel" aria-hidden="true" id="pane-following" aria-labelledby="tab-following" class="el-tab-pane" style="display: none; padding: 5px;">
                    <div>
                      <div style="min-height: 300px; margin-bottom: 20px; padding: 20px 0px; text-align: center;">
                        <font style="font-size: 30px; color: rgb(221, 221, 221);">
                          <b>(￢_￢) 还没有关注一个人</b>
                        </font>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int) {
	followers: allFollower (perPage: 9, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id,
        login
        html_url,
        avatar_url
      }
    }
  }
  following: allFollowing (perPage: 9, page: $page) @paginate{
    totalCount
    pageInfo {
      totalPages
      currentPage
      perPage
    }
    edges {
      node {
        id,
        login
        html_url,
        avatar_url
      }
    }
  }
}
</page-query>
<script>
import { Pager } from 'gridsome'
export default {
  name: 'SocialPage',
  components: {
    Pager
  },
  metaInfo: {
    title: '社交圈'
  },
  data () {
    return {
      showFollowersOrNot: true
    }
  },
  methods: {
    showFollowers () {
      this.showFollowersOrNot = true
    },
    showFollowing () {
      this.showFollowersOrNot = false
    }
  }
}
</script>
<style scoped>
</style>