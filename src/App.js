import "./App.css"
import React, { useEffect, useState } from "react"
import alanBtn from "@alan-ai/alan-sdk-web"
import NewsCards from "./components/NewsCards/NewsCards"

import wordsToNumbers from "words-to-numbers"

import useStyles from "./styles"

const alanKey =
  "2b15d7cd1f3070b4e4dbf973eb40c7f62e956eca572e1d8b807a3e2338fdd0dc/stage"
function App() {
  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)

  const classes = useStyles()

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadLines") {
          setNewsArticles(articles)
          setActiveArticle(-1)
        } else if (command === "highlight") {
          setActiveArticle((preActiveArticle) => preActiveArticle + 1)
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number

          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again.")
          } else {
            window.open(articles[parsedNumber - 1].url, "_blank")
            alanBtn().playText("Opening ......")
          }
        }
      },
    })
  }, [])
  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          alt="Alan"
          className={classes.alanLogo}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  )
}

export default App
