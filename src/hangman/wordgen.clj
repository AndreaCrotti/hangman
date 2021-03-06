(ns hangman.wordgen
  (:require [clojure.string :as str]
            [hangman.utils :as utils]
            [com.stuartsierra.component :as component]
            [pl.danieljanus.tagsoup :as tagsoup]))

;; Paths to the wordreference content for the given word
;; #source-luna > div:nth-child(1) > section > div > div.def-list > section:nth-child(1) > div:nth-child(2) > di
;; //*[@id="source-luna"]/div[1]/section/div/div[1]/section[1]/div[1]/div



(defn search-word
  "Return the definition for the given word"
  [word]
  (let [url (format "http://dictionary.reference.com/browse/%s" word)
        response (tagsoup/parse url)]
    ))

;TODO: this could be more configurable

(def dictionary-file "src/hangman/british")
(def all-words (str/split-lines (slurp dictionary-file)))

(defn gen-string
  "Generate a random string"
  [dictionary n]
  (utils/pick-random-element (filter #(= (count %) n) dictionary)))


(defn suggest
  "Suggest a possible definition for the given word"
  [word]
  
  )

(defrecord Wordgen []
  component/Lifecycle

  (start [component]
    (println "Start wordgeneration component")
    (assoc component :gen-string gen-string))

  (stop [component]
    (println "Stopping word generation component")))

(defn new-wordgen [length]
  (map->Wordgen {:length length}))
