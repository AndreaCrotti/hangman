;TODO: which things should be made private and which functions?

(ns hangman.hangman
  (:require [clojure.string :as str]
            [hangman.secret :as secret]))

;TODO: is it possible to avoid all these atoms?
;TODO: when this is concurrent need a data structure per each session
;see how to use promises and such things
(def secret-word (ref ""))
(def masked-word (ref []))
(def dictionary-file "/usr/share/dict/british")
(def all-words (str/split-lines (slurp dictionary-file)))
;; Generate a random string which has to be guessed by different users

(def seen-letters (ref #{}))
 
(def all-chars
  "Simple list of all the chars"
  (map char (range (int \a) (inc (int \z)))))

(defn valid-char
  [char]
  (contains? (set all-chars) char))

;TODO: order matters so be careful to leave things as they should be
(defn pick-random-element
  "Pick a random element from a collection"
  [coll]
  (let [size (count coll)
        index (Math/round (* (Math/random) (dec size)))]
    (nth coll index)))

(defn random-char
  []
  (pick-random-element all-chars))

(defn gen-string
  "Generate a random string"
  [dictionary n]
  (pick-random-element (filter #(= (count %) n) dictionary)))

(defn guess-word
  [word]
  (= word @secret-word))

(defn initialize-struct
  [word]
  ;TODO: is using a vec really necesary?
  (vec
   (for [i word]
     {:char i :visible (not (valid-char i))})))

(defn set-secret
  [size]
  (let [word (gen-string all-words size)
        secret-struct (initialize-struct word)]
;TODO: the two operations together are not atomic anymore, need to use
                                        ;refs for this purpose now, or maybe some other structure
    (dosync
     (ref-set secret-word word)
     (ref-set masked-word secret-struct))))

(defn secret-string
  "Join the secret string structure marking hidden chars as _"
  [secret]
  (str/join (map #(if (:visible %) (:char %) \_) secret)))


(defn reveal-letter
  "Return another secret structure where the revealed chars are marked now as visible"
  [secret letter]
  (map (partial secret/filter-char letter) secret))

(defn found?
  [letter struct]
  (let [founds (filter #(and (= letter (:char %)) (false? (:visible %))) struct)]
    (not (empty? founds))))

;TODO: need to unify all the side effects inside one containe
(defn move
  "Do one move and, return True if the letter was found or False otherwise"
  [letter]
  (dosync (alter seen-letters conj letter))
  ;; (swap! seen-letters conj letter)
  (let [changed (found? letter @masked-word)]
    (when changed
      (dosync
       (ref-set masked-word (reveal-letter @masked-word letter))))
    changed))


(defn game-over
  [secret-struct]
  (every? :visible secret-struct))
