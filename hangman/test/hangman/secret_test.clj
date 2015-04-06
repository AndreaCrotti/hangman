(ns hangman.secret-test
  (:require [hangman.secret :refer :all]
            [clojure.test :refer :all]))


(defn- length-current-games
  [] (count (current-games)))

(deftest uuid-test
  (testing "create new game"
    (reset-games)
    (new-game)
    (is (= 1 (length-current-games))))

  (testing "uuid-generation-is-string"
    (is (pos? (count (uuid))))))

(deftest initialize-test
  (testing "new structure shape"
    (let [my-struct (initialize-struct "abc")]
      (is (= my-struct {:seen #{} :struct [{:char \a :visible false} {:char \b :visible false} {:char \c :visible false}]}))))

  (testing "Non chars are visible straight away"
    (let [with-hyphen (initialize-struct "abc'")
          string (secret-string with-hyphen)]
      (is (= string "___'")))))

(deftest game-setter-and-getter-test
  (testing "create game with given string"
    (reset-games)
    (let [game-id (new-game :secret "secret")
          desired (clojure.string/join "" (repeat (count "secret") \_))]
      (is (= 1 (length-current-games)))
      (is (= desired (get-secret game-id))))))

(deftest secret-strings-test
  (let [sample-secret [{:char \x :visible false}
                       {:char \y :visible true}
                       {:char \z :visible false}]]

        (testing "mask and unmask"
          (is (= (secret-string sample-secret) "_y_")))))

(deftest secret-reveal-test
  (testing "reveal letter returns new string"
    (let [game-id (new-game :secret "secret")
          new-string (reveal-letter game-id \s)]
      (is (= "s_____" new-string))))
  
  (testing "reveal simple"
    (let [game-id (new-game :secret "xyz")]
      (is (= (reveal-letter game-id \x) "x__"))))

  (testing "found letter"
    (let [game-id (new-game :secret "secret")]
      (is (false? (found? game-id \y)))
      (is (true? (found? game-id \s)))))

  (testing "revealing add to seen letters"
    (let [game-id (new-game :secret "secret")]
      (reveal-letter game-id \s)
      (is (= "s_____" (secret-string game-id))
      (is (true? (seen? game-id \s))))))
  
  (testing "reveal is case insensitive"
    (let [game-id (new-game :secret "Hello")
          secret-lower (reveal-letter game-id \h)]
      (is (= "H____" secret-lower)))))

(deftest game-status-test
  (testing "game over is over"
    (let [secret-struct [{:char \x :visible true}]]
      (is (true? (game-over secret-struct))))))
