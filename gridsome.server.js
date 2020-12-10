// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
  // api.loadSource(({ addCollection }) => {
  //   // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  // })
 
  api.loadSource(async actions => {

    // 首页
    const { data: gists } = await axios.get('https://api.github.com/users/GitHub-Laziji/gists?page=1&per_page=5')
    const { data: gist } = await axios.get(gists[0].url)
    const Gists = actions.addCollection({
      typeName: 'Gist'
    })
    Gists.addNode({
      id: gist.id,
      url: gist.url,
      files: {
        filename: Object.values(gist.files)[0].filename,
        content: Object.values(gist.files)[0].content
      },
      created_at: gist.created_at,
      updated_at: gist.updated_at,
      description: gist.description
    })

    // 博客列表
    const { data: gistsList } = await axios.get('https://api.github.com/users/GitHub-Laziji/gists')
    const GistsList = actions.addCollection({
      typeName: 'GistList'
    })
    for (let item of gistsList) {
      GistsList.addNode({
        id: item.id,
        url: item.url,
        filename: Object.values(item.files)[0].filename,
        updated_at: item.updated_at,
        description: item.description
      })
    }
    

    // followers列表
    const { data: followers } = await axios.get('https://api.github.com/users/GitHub-Laziji/followers')
    const Followers = actions.addCollection({
      typeName: 'Follower'
    })

    for (let item of followers) {
      Followers.addNode({
        id: item.id,
        login: item.login,
        avatar_url: item.avatar_url,
        html_url: item.html_url
      })
    }
    // following列表
    const { data: following } = await axios.get('https://api.github.com/users/GitHub-Laziji/following')
    const Following = actions.addCollection({
      typeName: 'Following'
    })

    for (let item of following) {
      Following.addNode({
        id: item.id,
        login: item.login,
        avatar_url: item.avatar_url,
        html_url: item.html_url
      })
    }
    // projects列表
    const { data: repos } = await axios.get('https://api.github.com/users/GitHub-Laziji/repos')
    const Repos = actions.addCollection({
      typeName: 'Repo'
    })

    for (let item of repos) {
      Repos.addNode({
        id: item.id,
        name: item.name,
        html_url: item.html_url,
        description: item.description,
        updated_at: item.updated_at,
        license: item.license,
        language: item.language,
        stargazers_count: item.stargazers_count,
        watchers_count: item.watchers_count,
        forks_count: item.forks_count
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
