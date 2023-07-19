import Link from 'next/link'
import React from 'react'

function Form({ type, submitting, handleSubmit, post, setPost }) {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world,
        and let your imagination run wild with any AI-powered platform.
      </p>

      <form action="submit" onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label htmlFor="prompt-area"
          className='font-satoshi font-semibold text-base text-gray-700'>
          <span>Your AI Prompt</span>
        </label>
        <textarea name="prompt-area" id="prompt-area" cols="30" rows="10"
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder='Write your prompt here...'
          required
          className='form_textarea'
        />

        <label htmlFor="tag-area"
          className='font-satoshi font-semibold text-base text-gray-700'>
          <span>
            Tag{' '}
            <span className='font-normal'>(#product, #webdevelopment, #idea)</span>
          </span>
        </label>
        <input name="tag-area" id="tag-area"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder='#tag'
          required
          className='form_input'
        />

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href={'/profile'} className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button type='submit' disabled={submitting}
          className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form