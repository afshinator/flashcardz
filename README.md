# Flashcardz

## Simple flashcards in the browser


![alt text](./img/screenshot.jpg "screen shot")

- Live preview [here](http://htmlpreview.github.io/?https://github.com/afshinator/flashcardz/blob/master/index.html); which is slow to load and sometimes fails, better to clone down a copy.  Firefox especially has problems with the previewer.


#### MVP:

Flashcardz can have multiple users,
each user can have multiple sets of flashcards.
Flashcards have two sides, a front and a back,
You enter the contents of what you're trying to learn on the front,
either some text, or HTML for more rich content,
And you put the contents of what amounts to as the answer, in the back.
You can also give flashcards a value as a weight for quizzing.

User can toggle display of the answer (the back of the card).
User can add new cards, edit existing cards.
User can add new sets to categorize cards.
User can decide to quiz themself on a set, 
which means you get presented each front part of a card and a button to see answer,
and another button to go to next question.
Users are 'graded' based on value of the card (and how long it took to move forward?)

Flashcardz can load and save users and their sets of flashcards. 

---

#### Milestone 1:

	- It loads users and their list from localstorage, but since you can't save to localstorage yet,

	- It seeds the program with some rich dummy data

	- You can change users, switching the view of sets and cards

	- You can click to view a flashcard

	- You can select to only show the front side, to hide answer


---

**Somewhat prioritized TODO list:**

- Comment and outline the code so far

- ~~Move card options up to the navbar~~

- Implement quizzing.

- Implement editing of cards

- Implement adding new sets / new cards.

- Implement saving out to localstorage

- Put value of flashcard next to its name in the treeview (?)







