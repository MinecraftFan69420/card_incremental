# Orientation
This document is supposed to help new developers understand the code that they soon will be working
on at the Card Incremental Dev Team. Now, we shall proceed.

# The HTML files
This section focuses on the HTML files in the code.
## index.html
WIP

## The Lore folder
The story found in the Lore tab of the game, separated by chapters.

# The CSS files
Separate CSS files exist for the game window and the lore. 
## The style.css file at the main folder.
This file styles the content of the game.

# The JS file.
## The *default_player* and *player* objects
From lines 1 to 36, there exists an object called *default_player*. This object shows what *player*
will be when the game starts. Also, when we want to reset the game, this object will aid in setting
all the values of *player* back into their defaults using *resetplayer*. Proceeding will be an overview of
*player*'s properties. 
### *points*
The player's points.
### *ppc*
The points per click, consisting of *base* and *mult*, which involve a ton of multipliers. Those multipliers
will be discussed below.
#### *mult*
A list of multipliers to point gain.
*C3* is the multiplier from buying card 3. *C5* is the one of card 5. *pre6total* is the total of all
the multipliers before card 6, those being the ones from cards 3 & 5. *C6A* is for the multiplier to manual gain
from card 6A, while *C6B* is the multiplier to autoclicker gain from card 6B. There exists multipliers
for cards 7 and 8. *post6constantstotal* is the total of all constant multipliers after card 6, those being cards 7 & 8. *C9A* is the manual click multiplier from card 9A, using the formula from lines 152 & 153.
*C9B* is the effect of the extra two levels from the autoclicker. Finally, *totalmanual* and *totalauto* are the
total of all the multipliers for manual clicking and autoclicking respectively.
### *cards*
Card information. This includes how much they cost and if the player has that card.
### *buyables*
Buyable information, including cost, how many the player has, and max amount.
### *autoclicker*
Autoclicker information, including strength level, cooldown and clicks per second.
### *defaultcooldowns*
WIP

## Switching tabs with the *swaptab* function.
This function is found in lines 41 to 45. It's the function used to switch tabs in the game. First off, it
makes an array of all the *id* attributes of each tab's *div*. Then it picks the tab to swap to based on the
given parameter *tab*. Thirdly, it hides all the elements by going through each element's *div* and hiding it.
Lastly, it shows the element the parameter *tab* wants to show. Then, makes a devlog call.
## Getting points using the *getpoints* and *autoclick* functions
WIP

# The DEV ONLY folder
WIP