import './styles.css';
import { useState, useEffect, useCallback } from 'react';


import {loadPosts} from '../../utils/load-posts'
import { Posts } from '../../Components/Posts';
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';


export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  
  const filteredPosts = !!searchValue ? 
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  })
  : posts;

  const noMorePosts = page + postsPerPage >= allPosts.length;

  
  const handleChange = (e) => {
    const {value} = e.target;
    setSearchValue(value);
  }

  const handleLoadPosts = useCallback (async (page, postsPerPage) => {

    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage)
  }

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);



  return (
    <section className='container'>
      {!!searchValue && (
        <>
            <h1>Search value: {searchValue}</h1> <br/> <br/>
        </>
      )}
      
      <TextInput searchValue={searchValue} handleChange={handleChange}/>
      <br/> <br/> <br/> <hr/> <br />
      
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts}/>
      )}

      {filteredPosts.length === 0 && (
        <p style={{color: "red"}}>Não existem posts com essa(s) palavra(s)</p>
      )}
      

      {!searchValue && (
        <>
            <Button disabled={noMorePosts} text="Load more posts" onClick={loadMorePosts}/>
        </>
      )}
      
    </section>
  );
}




/*


export class Home2 extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4
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

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({ searchValue: value});
  }

  /*
  componentDidUpdate() {
    
  }

  componentWillUnmount() {
    
  }

  
  render () {
  const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? 
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  })
  : posts;

  return (
    <section className='container'>
      {!!searchValue && (
        <>
            <h1>Search value: {searchValue}</h1> <br/> <br/>
        </>
      )}
      
      <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
      <br/> <br/> <br/> <hr/> <br />
      
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts}/>
      )}

      {filteredPosts.length === 0 && (
        <p style={{color: "red"}}>Não existem posts com essa(s) palavra(s)</p>
      )}
      

      {!searchValue && (
        <>
            <Button disabled={noMorePosts} text="Load more posts" onClick={this.loadMorePosts}/>
        </>
      )}
      
    </section>
  );
  }
}
*/

