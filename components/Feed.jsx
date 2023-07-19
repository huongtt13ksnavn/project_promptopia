'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [filteredPosts, setFilteredPosts] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    clearTimeout(searchTimeout)

    setSearchTimeout(setTimeout(() => {
      const searchedResult = filterPosts(e.target.value)
      setFilteredPosts(searchedResult)
    }, 500))
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    const searchedResult = filterPosts(tagName)
    setFilteredPosts(searchedResult)
  }

  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, "i")
    return posts.filter(post =>
      regex.test(post.creator.username) ||
      regex.test(post.tag) ||
      regex.test(post.prompt)
    )
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt')
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])


  return (
    <section className="feed">
      <form action="" className='relative w-full flex'>
        <input type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList data={searchText ? filteredPosts : posts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed