# Orientation
This document is supposed to help new developers understand the code that they soon will be working
on at the Card Incremental Dev Team. Now, we shall proceed.

## The HTML files
This section focuses on the HTML files in the code.
### index.html
WIP

### The Lore folder
The story found in the Lore tab of the game, separated by chapters.

## The CSS files
Separate CSS files exist for the game window and the lore. 
### The style.css file at the main folder.
This file styles the content of the game.

## The JS file.
### The *default_player* and *player* objects
From lines 1 to 36, there exists an object called *default_player*. This object shows what *player*
will be when the game starts. Also, when we want to reset the game, this object will aid in setting
all the values of *player* back into their defaults using *resetplayer*.
### Switching tabs with the *swaptab* function.
This function is found in lines 41 to 45. It's the function used to switch tabs in the game. First off, it
makes an array of all the *id* attributes of each tab's *div*. Then it picks the tab to swap to based on the
given parameter *tab*. Thirdly, it hides all the elements by going through each element's *div* and hiding it.
Lastly, it shows the element the parameter *tab* wants to show. Then, makes a devlog call.
### Getting points using the *getpoints* and *autoclick* functions
WIP

## The DEV ONLY folder
WIP