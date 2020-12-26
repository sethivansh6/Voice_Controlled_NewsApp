import "./App.css"
import React, { useEffect, useState } from "react"
import alanBtn from "@alan-ai/alan-sdk-web"
import NewsCards from "./components/NewsCards/NewsCards"

const alanKey =
  "2b15d7cd1f3070b4e4dbf973eb40c7f62e956eca572e1d8b807a3e2338fdd0dc/stage"
function App() {
  const [newsArticles, setNewsArticles] = useState([])

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === "newHeadLines") {
          console.log(articles)
          setNewsArticles(articles)
        }
      },
    })
  }, [])
  return (
    <div className="App">
      <h1> Alan AI News Application </h1>
      <NewsCards articles={newsArticles} />
    </div>
  )
}

export default App
