'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick}) => {
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

  const handleSearchChange = () => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const respone = await fetch('api/prompt')
      const data = await respone.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])
  

  return (
    <section>
      <form action="" className='relative w-full flext'>
        <input type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed