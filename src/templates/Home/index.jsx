import './styles.css';
import { Component } from 'react';


import {loadPosts} from '../../utils/load-posts'
import { Posts } from '../../Components/Posts';
import { Button } from '../../Components/Button';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 12
    };
  
  timeoutUpdate = null;
 

  async componentDidMount() {
      await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;


    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page:nextPage})
  }


  componentDidUpdate() {
    
  }

  componentWillUnmount() {
    
  }

  
  render () {
  const { posts, page, postsPerPage, allPosts } = this.state;
  const noMorePosts = page + postsPerPage >= allPosts.length;
  return (
    <section className='container'>
      <Posts posts={posts}/>
      <Button disabled={noMorePosts} text="Load more posts" onClick={this.loadMorePosts}/>
    </section>
  );
  }
}


