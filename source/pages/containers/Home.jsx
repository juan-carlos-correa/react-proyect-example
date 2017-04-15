import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Loading from '../../shared/components/Loading.jsx'
import Header from '../../shared/components/Header.jsx'
import styles from './Page.css'

// Componente para posts
import Post from '../../posts/containers/Post.jsx'

// Rutas de la api
import api from '../../api.js'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      posts: [],
      loading: true,
    }
    this.handleScroll = this.handleScroll.bind(this)
  }
  async componentDidMount() {
    const posts = await api.posts.getList(this.state.page)

    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    })

    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
    if (this.state.loading) return null

    const scrolled = window.scrollY
    const viewportHeight = window.innerHeight
    const fullHeight = document.documentElement.clientHeight

    if (!(scrolled + viewportHeight + 300 >= fullHeight )) {
      return null
    }

    this.setState({ loading:true }, async () => {
      try {
        const post = await api.posts.getList(this.state.page)

        this.setState({
          posts: this.state.posts.concat(post),
          page: this.state.page + 1,
          loading: false
        })
      } catch (e) {
        console.log(e)
        this.setState({ loading: false })
      } finally {

      }
    })
  }

  render() {
    return (
      <section name="Home" className={styles.section}>
      <Header />
        <h1>Home</h1>
        <section className={styles.list}>
          {this.state.loading && (
            <Loading />
          )}
          {this.state.posts
            .map(post => <Post key={post.id} {...post} />)
          }
        </section>
      </section>
    )
  }
}

export default Home
